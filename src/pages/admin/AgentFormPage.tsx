import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AgentForm from '../../components/admin/AgentForm'
import { AgentService } from '../../Services/AgentService'
import type { AgentInsertInfo } from '../../types/agent'

const AgentFormPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [initialData, setInitialData] = useState<AgentInsertInfo | undefined>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isEditing = Boolean(id)

  useEffect(() => {
    if (id) {
      // For editing, we need to load the agent data
      // Since we get by slug in the API, but have ID in the URL for editing,
      // we'll need to find the agent from the list or add a getById endpoint
      // For now, load all and find by ID
      AgentService.getAll().then(result => {
        if (result.sucesso) {
          const agent = result.dados.find(a => a.agentId === Number(id))
          if (agent) {
            setInitialData({
              name: agent.name,
              description: agent.description,
              systemPrompt: agent.systemPrompt,
              collectName: agent.collectName,
              collectEmail: agent.collectEmail,
              collectPhone: agent.collectPhone,
            })
          }
        }
      })
    }
  }, [id])

  const handleSubmit = async (data: AgentInsertInfo) => {
    setLoading(true)
    setError(null)
    try {
      const result = isEditing
        ? await AgentService.update(Number(id), data)
        : await AgentService.create(data)

      if (result.sucesso) {
        navigate('/admin/agents')
      } else {
        setError(result.mensagem)
      }
    } catch {
      setError('Erro ao salvar agente')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {isEditing ? 'Editar Agente' : 'Novo Agente'}
      </h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}

      <AgentForm
        initialData={initialData}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  )
}

export default AgentFormPage
