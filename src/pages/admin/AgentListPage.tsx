import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAgentStore } from '../../stores/useAgentStore'
import { AgentService } from '../../Services/AgentService'

const AgentListPage = () => {
  const { agents, loading, error, loadAgents } = useAgentStore()

  useEffect(() => {
    loadAgents()
  }, [loadAgents])

  const handleToggleStatus = async (id: number) => {
    await AgentService.toggleStatus(id)
    await loadAgents()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja remover este agente?')) return
    await AgentService.delete(id)
    await loadAgents()
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Agentes</h1>
        <Link
          to="/admin/agents/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Novo Agente
        </Link>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}

      {loading ? (
        <p className="text-gray-500">Carregando...</p>
      ) : agents.length === 0 ? (
        <p className="text-gray-500">Nenhum agente cadastrado.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left p-3 text-sm font-medium text-gray-600">Nome</th>
                <th className="text-left p-3 text-sm font-medium text-gray-600">Slug</th>
                <th className="text-left p-3 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left p-3 text-sm font-medium text-gray-600">Coleta</th>
                <th className="text-right p-3 text-sm font-medium text-gray-600">Acoes</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent.agentId} className="border-b hover:bg-gray-50">
                  <td className="p-3">{agent.name}</td>
                  <td className="p-3 text-gray-500 font-mono text-sm">{agent.slug}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      agent.status === 1
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {agent.status === 1 ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-gray-500">
                    {[
                      agent.collectName && 'Nome',
                      agent.collectEmail && 'E-mail',
                      agent.collectPhone && 'Telefone',
                    ].filter(Boolean).join(', ') || 'Nenhum'}
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <Link
                      to={`/admin/agents/${agent.agentId}/edit`}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleToggleStatus(agent.agentId)}
                      className="text-yellow-600 hover:underline text-sm"
                    >
                      {agent.status === 1 ? 'Desativar' : 'Ativar'}
                    </button>
                    <button
                      onClick={() => handleDelete(agent.agentId)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AgentListPage
