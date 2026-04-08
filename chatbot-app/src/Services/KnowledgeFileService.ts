import { KnowledgeFileInfo } from '../types/knowledgeFile'
import { Result } from '../types/result'

const API_URL = import.meta.env.VITE_API_URL

export const KnowledgeFileService = {
  getByAgent: async (agentId: number): Promise<Result<KnowledgeFileInfo[]>> => {
    const response = await fetch(`${API_URL}/api/agents/${agentId}/files`)
    return response.json()
  },

  upload: async (agentId: number, file: File): Promise<Result<KnowledgeFileInfo>> => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await fetch(`${API_URL}/api/agents/${agentId}/files`, {
      method: 'POST',
      body: formData,
    })
    return response.json()
  },

  delete: async (agentId: number, fileId: number): Promise<Result<null>> => {
    const response = await fetch(`${API_URL}/api/agents/${agentId}/files/${fileId}`, {
      method: 'DELETE',
    })
    return response.json()
  },

  reprocess: async (agentId: number, fileId: number): Promise<Result<null>> => {
    const response = await fetch(`${API_URL}/api/agents/${agentId}/files/${fileId}/reprocess`, {
      method: 'POST',
    })
    return response.json()
  },
}
