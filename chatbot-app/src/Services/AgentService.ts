import { AgentInfo, AgentInsertInfo, AgentChatConfigInfo } from '../types/agent'
import { Result } from '../types/result'

const API_URL = import.meta.env.VITE_API_URL

const getHeaders = (): HeadersInit => ({
  'Content-Type': 'application/json',
})

export const AgentService = {
  getAll: async (): Promise<Result<AgentInfo[]>> => {
    const response = await fetch(`${API_URL}/api/agents`, { headers: getHeaders() })
    return response.json()
  },

  getBySlug: async (slug: string): Promise<Result<AgentInfo>> => {
    const response = await fetch(`${API_URL}/api/agents/${slug}`, { headers: getHeaders() })
    return response.json()
  },

  getChatConfig: async (slug: string): Promise<Result<AgentChatConfigInfo>> => {
    const response = await fetch(`${API_URL}/api/agents/${slug}/chat-config`, { headers: getHeaders() })
    return response.json()
  },

  create: async (data: AgentInsertInfo): Promise<Result<AgentInfo>> => {
    const response = await fetch(`${API_URL}/api/agents`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    })
    return response.json()
  },

  update: async (id: number, data: AgentInsertInfo): Promise<Result<AgentInfo>> => {
    const response = await fetch(`${API_URL}/api/agents/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    })
    return response.json()
  },

  delete: async (id: number): Promise<Result<null>> => {
    const response = await fetch(`${API_URL}/api/agents/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    })
    return response.json()
  },

  toggleStatus: async (id: number): Promise<Result<AgentInfo>> => {
    const response = await fetch(`${API_URL}/api/agents/${id}/status`, {
      method: 'PATCH',
      headers: getHeaders(),
    })
    return response.json()
  },
}
