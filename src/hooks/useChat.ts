import { useCallback, useEffect, useRef, useState } from 'react'
import useWebSocket from './useWebSocket'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface UseChatReturn {
  messages: ChatMessage[]
  streaming: boolean
  ready: boolean
  fieldsToCollect: string[]
  error: string | null
  sendMessage: (content: string) => void
  identify: (data: { name?: string; email?: string; phone?: string }) => void
}

const useChat = (wsUrl: string | null): UseChatReturn => {
  const { connected, send, lastMessage, error: wsError } = useWebSocket(wsUrl)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [streaming, setStreaming] = useState(false)
  const [ready, setReady] = useState(false)
  const [fieldsToCollect, setFieldsToCollect] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const streamBufferRef = useRef('')

  useEffect(() => {
    if (!lastMessage) return

    switch (lastMessage.type) {
      case 'collect_data':
        setFieldsToCollect(lastMessage.fields as string[])
        break
      case 'ready':
        setReady(true)
        break
      case 'chunk':
        if (!streaming) setStreaming(true)
        streamBufferRef.current += lastMessage.content as string
        setMessages(prev => {
          const updated = [...prev]
          if (updated.length > 0 && updated[updated.length - 1].role === 'assistant') {
            updated[updated.length - 1] = { role: 'assistant', content: streamBufferRef.current }
          } else {
            updated.push({ role: 'assistant', content: streamBufferRef.current })
          }
          return updated
        })
        break
      case 'done':
        setStreaming(false)
        streamBufferRef.current = ''
        break
      case 'error':
        setError(lastMessage.message as string)
        setStreaming(false)
        streamBufferRef.current = ''
        break
    }
  }, [lastMessage])

  useEffect(() => {
    if (wsError) setError(wsError)
  }, [wsError])

  const sendMessage = useCallback((content: string) => {
    if (!ready || streaming) return
    setMessages(prev => [...prev, { role: 'user', content }])
    streamBufferRef.current = ''
    send({ type: 'message', content })
  }, [ready, streaming, send])

  const identify = useCallback((data: { name?: string; email?: string; phone?: string }) => {
    send({ type: 'identify', ...data })
  }, [send])

  return { messages, streaming, ready, fieldsToCollect, error, sendMessage, identify }
}

export default useChat
