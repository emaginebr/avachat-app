import { useState, useEffect } from 'react'
import { AgentInsertInfo } from '../../types/agent'

interface AgentFormProps {
  initialData?: AgentInsertInfo
  onSubmit: (data: AgentInsertInfo) => Promise<void>
  loading: boolean
}

const AgentForm = ({ initialData, onSubmit, loading }: AgentFormProps) => {
  const [formData, setFormData] = useState<AgentInsertInfo>({
    name: '',
    slug: '',
    description: null,
    systemPrompt: '',
    collectName: false,
    collectEmail: false,
    collectPhone: false,
  })

  useEffect(() => {
    if (initialData) setFormData(initialData)
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    setFormData(prev => ({
      ...prev,
      name,
      slug: !initialData ? generateSlug(name) : prev.slug,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleNameChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          required
          pattern="^[a-z0-9]+(-[a-z0-9]+)*$"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="mt-1 text-sm text-gray-500">Usado na URL: /chat/{formData.slug || 'meu-agente'}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Descricao</label>
        <textarea
          name="description"
          value={formData.description ?? ''}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Prompt de Sistema</label>
        <textarea
          name="systemPrompt"
          value={formData.systemPrompt}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Voce e um assistente especializado em..."
        />
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-700">Campos de coleta do usuario</p>

        <label className="flex items-center gap-2">
          <input type="checkbox" name="collectName" checked={formData.collectName} onChange={handleChange} className="rounded" />
          <span className="text-sm">Solicitar nome</span>
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" name="collectEmail" checked={formData.collectEmail} onChange={handleChange} className="rounded" />
          <span className="text-sm">Solicitar e-mail</span>
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" name="collectPhone" checked={formData.collectPhone} onChange={handleChange} className="rounded" />
          <span className="text-sm">Solicitar telefone</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Salvando...' : 'Salvar'}
      </button>
    </form>
  )
}

export default AgentForm
