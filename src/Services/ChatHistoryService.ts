import type { ChatSessionInfo } from '../types/chatSession'
import type { ChatMessageInfo } from '../types/chatMessage'
import type { Result } from '../types/result'

const API_URL = import.meta.env.VITE_API_URL

interface PaginatedResult<T> {
  items: T[]
  total: number
  pagina: number
  tamanhoPagina: number
}

export const ChatHistoryService = {
  getSessions: async (agentId: number, page = 1, pageSize = 20): Promise<Result<PaginatedResult<ChatSessionInfo>>> => {
    const response = await fetch(`${API_URL}/api/agents/${agentId}/sessions?pagina=${page}&tamanhoPagina=${pageSize}`)
    return response.json()
  },

  getMessages: async (sessionId: number, page = 1, pageSize = 50): Promise<Result<PaginatedResult<ChatMessageInfo>>> => {
    const response = await fetch(`${API_URL}/api/sessions/${sessionId}/messages?pagina=${page}&tamanhoPagina=${pageSize}`)
    return response.json()
  },
}
