import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ChatHistoryService } from '../../Services/ChatHistoryService'
import { ChatSessionInfo } from '../../types/chatSession'
import { ChatMessageInfo, SenderType } from '../../types/chatMessage'

const ChatHistoryPage = () => {
  const { agentId } = useParams<{ agentId: string }>()
  const [sessions, setSessions] = useState<ChatSessionInfo[]>([])
  const [selectedSession, setSelectedSession] = useState<number | null>(null)
  const [messages, setMessages] = useState<ChatMessageInfo[]>([])
  const [loading, setLoading] = useState(false)
  const id = Number(agentId)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    ChatHistoryService.getSessions(id).then(result => {
      if (result.sucesso) setSessions(result.dados.items)
    }).finally(() => setLoading(false))
  }, [id])

  const handleSelectSession = async (sessionId: number) => {
    setSelectedSession(sessionId)
    const result = await ChatHistoryService.getMessages(sessionId)
    if (result.sucesso) setMessages(result.dados.items)
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Historico de Conversas</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <h2 className="font-medium">Sessoes</h2>
          </div>
          <div className="max-h-[600px] overflow-y-auto">
            {loading ? (
              <p className="p-4 text-gray-500">Carregando...</p>
            ) : sessions.length === 0 ? (
              <p className="p-4 text-gray-500">Nenhuma sessao encontrada.</p>
            ) : (
              sessions.map(session => (
                <button
                  key={session.chatSessionId}
                  onClick={() => handleSelectSession(session.chatSessionId)}
                  className={`w-full text-left p-3 border-b hover:bg-gray-50 ${
                    selectedSession === session.chatSessionId ? 'bg-blue-50' : ''
                  }`}
                >
                  <p className="text-sm font-medium">{session.userName || 'Anonimo'}</p>
                  <p className="text-xs text-gray-500">{session.userEmail || ''}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(session.startedAt).toLocaleString('pt-BR')}
                  </p>
                </button>
              ))
            )}
          </div>
        </div>

        <div className="col-span-2 border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <h2 className="font-medium">Mensagens</h2>
          </div>
          <div className="max-h-[600px] overflow-y-auto p-4">
            {!selectedSession ? (
              <p className="text-gray-500">Selecione uma sessao para ver as mensagens.</p>
            ) : messages.length === 0 ? (
              <p className="text-gray-500">Nenhuma mensagem nesta sessao.</p>
            ) : (
              messages.map(msg => (
                <div
                  key={msg.chatMessageId}
                  className={`mb-3 flex ${msg.senderType === SenderType.User ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    msg.senderType === SenderType.User
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
                    <p className="text-xs mt-1 opacity-60">
                      {new Date(msg.createdAt).toLocaleTimeString('pt-BR')}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatHistoryPage
