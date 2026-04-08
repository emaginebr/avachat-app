import { create } from 'zustand'
import type { AgentInfo } from '../types/agent'
import { AgentService } from '../Services/AgentService'

interface AgentStoreState {
  agents: AgentInfo[]
  loading: boolean
  error: string | null
  loadAgents: () => Promise<void>
  clearError: () => void
}

export const useAgentStore = create<AgentStoreState>((set) => ({
  agents: [],
  loading: false,
  error: null,

  loadAgents: async () => {
    set({ loading: true, error: null })
    try {
      const result = await AgentService.getAll()
      if (result.sucesso) {
        set({ agents: result.dados, loading: false })
      } else {
        set({ error: result.mensagem, loading: false })
      }
    } catch (err) {
      set({ error: 'Erro ao carregar agentes', loading: false })
    }
  },

  clearError: () => set({ error: null }),
}))
