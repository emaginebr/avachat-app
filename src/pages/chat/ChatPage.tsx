import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AgentService } from '../../Services/AgentService'
import { AgentChatConfigInfo } from '../../types/agent'
import useChat from '../../hooks/useChat'
import UserDataForm from '../../components/chat/UserDataForm'
import ChatWindow from '../../components/chat/ChatWindow'
import NotFoundPage from '../../components/common/NotFoundPage'
import UnavailablePage from '../../components/common/UnavailablePage'

const WS_URL = import.meta.env.VITE_WS_URL

const ChatPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const [config, setConfig] = useState<AgentChatConfigInfo | null>(null)
  const [status, setStatus] = useState<'loading' | 'ok' | 'not_found' | 'unavailable'>('loading')
  const [wsUrl, setWsUrl] = useState<string | null>(null)

  const { messages, streaming, ready, fieldsToCollect, error, sendMessage, identify } = useChat(wsUrl)

  useEffect(() => {
    if (!slug) return
    AgentService.getChatConfig(slug).then(result => {
      if (result.sucesso && result.dados) {
        setConfig(result.dados)
        setStatus('ok')
        setWsUrl(`${WS_URL}/ws/chat/${slug}`)
      } else if (result.mensagem?.includes('indisponivel')) {
        setStatus('unavailable')
      } else {
        setStatus('not_found')
      }
    }).catch(() => setStatus('not_found'))
  }, [slug])

  if (status === 'loading') return <div className="flex items-center justify-center min-h-screen"><p>Carregando...</p></div>
  if (status === 'not_found') return <NotFoundPage />
  if (status === 'unavailable') return <UnavailablePage />

  const needsData = fieldsToCollect.length > 0 && !ready

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="border-b px-4 py-3 bg-gray-50">
        <h1 className="text-lg font-semibold">{config?.name}</h1>
        {config?.description && <p className="text-sm text-gray-500">{config.description}</p>}
      </div>

      <div className="flex-1 flex flex-col">
        {error && (
          <div className="m-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>
        )}

        {needsData ? (
          <div className="flex-1 flex items-center justify-center p-4">
            <UserDataForm fields={fieldsToCollect} onSubmit={identify} />
          </div>
        ) : (
          <ChatWindow messages={messages} streaming={streaming} onSendMessage={sendMessage} />
        )}
      </div>
    </div>
  )
}

export default ChatPage
