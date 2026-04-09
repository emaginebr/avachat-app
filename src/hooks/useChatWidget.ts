import { useCallback, useEffect, useRef, useState } from 'react'
import type { AgentChatConfigInfo } from '../types/agent'
import type { ChatSessionStartInfo } from '../types/chatSession'
import { AgentService } from '../Services/AgentService'
import useChat from './useChat'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

type Phase = 'greeting' | 'collecting' | 'starting' | 'ready'

interface CollectState {
  phase: Phase
  pendingFields: string[]
  currentField: string | null
  collectedData: ChatSessionStartInfo
}

const FIELD_MAP: Record<string, keyof ChatSessionStartInfo> = {
  name: 'userName',
  email: 'userEmail',
  phone: 'userPhone',
}

const FIELD_VALIDATION_ERRORS: Record<string, string> = {
  email: 'Por favor, informe um email valido (ex: nome@email.com)',
  phone: 'Por favor, informe um telefone valido (somente numeros, com DDD)',
}

const validateField = (field: string, value: string): boolean => {
  const trimmed = value.trim()
  if (!trimmed) return false
  if (field === 'email') return trimmed.includes('@') && trimmed.includes('.')
  if (field === 'phone') return /^\+?[\d\s()-]{10,}$/.test(trimmed)
  return true
}

const getPrompt = (field: string, collectedData: ChatSessionStartInfo): string => {
  if (field === 'name') return 'Qual seu nome?'
  if (field === 'email') {
    const name = collectedData.userName
    return name ? `Bem vindo ${name}, qual seu email?` : 'Qual seu email?'
  }
  if (field === 'phone') return 'Qual seu numero de telefone? Com DDD'
  return `Qual seu ${field}?`
}

interface UseChatWidgetReturn {
  messages: ChatMessage[]
  streaming: boolean
  ready: boolean
  error: string | null
  isCollecting: boolean
  sendMessage: (content: string) => void
}

let _wsUrl: string | undefined
export function setWsUrl(url: string) { _wsUrl = url }
const WS_URL_FALLBACK = () => _wsUrl ?? import.meta.env.VITE_WS_URL

const useChatWidget = (
  slug: string,
  greeting: string,
  config: AgentChatConfigInfo | null,
): UseChatWidgetReturn => {
  const [collectState, setCollectState] = useState<CollectState>({
    phase: 'greeting',
    pendingFields: [],
    currentField: null,
    collectedData: {},
  })
  const [collectMessages, setCollectMessages] = useState<ChatMessage[]>([])
  const [wsUrl, setWsUrl] = useState<string | null>(null)
  const [startError, setStartError] = useState<string | null>(null)
  const initializedRef = useRef(false)

  const chat = useChat(wsUrl)

  // When config loads, determine fields to collect and start the flow
  useEffect(() => {
    if (!config || initializedRef.current) return
    initializedRef.current = true

    const fields: string[] = []
    if (config.collectName) fields.push('name')
    if (config.collectEmail) fields.push('email')
    if (config.collectPhone) fields.push('phone')

    if (fields.length === 0) {
      // No fields to collect — go straight to starting
      setCollectState({ phase: 'starting', pendingFields: [], currentField: null, collectedData: {} })
    } else {
      const firstField = fields[0]
      const remaining = fields.slice(1)
      const data: ChatSessionStartInfo = {}
      setCollectMessages([{ role: 'assistant', content: getPrompt(firstField, data) }])
      setCollectState({ phase: 'collecting', pendingFields: remaining, currentField: firstField, collectedData: data })
    }
  }, [config])

  // When phase becomes 'starting', call start-session
  useEffect(() => {
    if (collectState.phase !== 'starting') return

    console.log('[ChatWidget] Iniciando sessao para', slug, collectState.collectedData)
    AgentService.startSession(slug, collectState.collectedData).then(result => {
      if (result.sucesso && result.dados) {
        const sessionId = result.dados.chatSessionId
        const url = `${WS_URL_FALLBACK()}/ws/chat/${slug}?sessionId=${sessionId}`
        console.log('[ChatWidget] Sessao iniciada, conectando WebSocket:', url)
        setCollectMessages(prev => [
          ...prev,
          { role: 'assistant', content: 'Muito obrigado pelas informacoes, agora em que posso ajudar?' },
        ])
        setWsUrl(url)
        setCollectState(prev => ({ ...prev, phase: 'ready' }))
      } else {
        const errorMsg = result.mensagem || 'Erro ao iniciar sessao'
        console.error('[ChatWidget] Erro ao iniciar sessao:', errorMsg)
        setStartError(errorMsg)
        setCollectMessages(prev => [
          ...prev,
          { role: 'assistant', content: `Desculpe, ocorreu um erro: ${errorMsg}` },
        ])
      }
    }).catch((err) => {
      console.error('[ChatWidget] Falha na requisicao de sessao:', err)
      setStartError('Erro ao conectar com o servidor')
      setCollectMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Desculpe, nao foi possivel conectar ao servidor. Tente novamente mais tarde.' },
      ])
    })
  }, [collectState.phase, collectState.collectedData, slug])

  const handleCollectResponse = useCallback((content: string) => {
    const { currentField, pendingFields, collectedData } = collectState
    if (!currentField) return

    // Validate
    if (!validateField(currentField, content)) {
      const errorMsg = FIELD_VALIDATION_ERRORS[currentField] ?? 'Resposta invalida. Tente novamente.'
      setCollectMessages(prev => [
        ...prev,
        { role: 'user', content },
        { role: 'assistant', content: errorMsg },
      ])
      return
    }

    const dataKey = FIELD_MAP[currentField] ?? currentField
    const newData = { ...collectedData, [dataKey]: content.trim() }
    const remaining = [...pendingFields]
    const nextField = remaining.shift() ?? null

    const newMessages: ChatMessage[] = [{ role: 'user', content }]

    if (nextField) {
      newMessages.push({ role: 'assistant', content: getPrompt(nextField, newData) })
      setCollectState({
        phase: 'collecting',
        pendingFields: remaining,
        currentField: nextField,
        collectedData: newData,
      })
    } else {
      // All fields collected — transition to starting
      setCollectState({
        phase: 'starting',
        pendingFields: [],
        currentField: null,
        collectedData: newData,
      })
    }

    setCollectMessages(prev => [...prev, ...newMessages])
  }, [collectState])

  const sendMessage = useCallback((content: string) => {
    if (collectState.phase === 'collecting') {
      handleCollectResponse(content)
    } else if (collectState.phase === 'ready') {
      chat.sendMessage(content)
    }
  }, [collectState.phase, handleCollectResponse, chat])

  const greetingMsg: ChatMessage = { role: 'assistant', content: greeting }
  const messages = [...[greetingMsg], ...collectMessages, ...chat.messages]

  const isCollecting = collectState.phase === 'collecting' || collectState.phase === 'starting'

  return {
    messages,
    streaming: chat.streaming,
    ready: collectState.phase === 'ready' && chat.ready,
    error: startError || chat.error,
    isCollecting,
    sendMessage,
  }
}

export default useChatWidget
