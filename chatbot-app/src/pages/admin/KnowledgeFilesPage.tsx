import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useKnowledgeFileStore } from '../../stores/useKnowledgeFileStore'
import { KnowledgeFileService } from '../../Services/KnowledgeFileService'
import FileUpload from '../../components/admin/FileUpload'
import FileStatusBadge from '../../components/admin/FileStatusBadge'
import { ProcessingStatus } from '../../types/knowledgeFile'

const KnowledgeFilesPage = () => {
  const { agentId } = useParams<{ agentId: string }>()
  const { files, loading, error, loadFiles } = useKnowledgeFileStore()
  const [uploading, setUploading] = useState(false)
  const id = Number(agentId)

  useEffect(() => {
    if (id) loadFiles(id)
  }, [id, loadFiles])

  // Poll for processing status
  useEffect(() => {
    const hasProcessing = files.some(f => f.processingStatus === ProcessingStatus.Processing)
    if (!hasProcessing) return

    const interval = setInterval(() => loadFiles(id), 3000)
    return () => clearInterval(interval)
  }, [files, id, loadFiles])

  const handleUpload = async (file: File) => {
    setUploading(true)
    try {
      await KnowledgeFileService.upload(id, file)
      await loadFiles(id)
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (fileId: number) => {
    if (!confirm('Remover este arquivo e seus chunks indexados?')) return
    await KnowledgeFileService.delete(id, fileId)
    await loadFiles(id)
  }

  const handleReprocess = async (fileId: number) => {
    await KnowledgeFileService.reprocess(id, fileId)
    await loadFiles(id)
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Base de Conhecimento</h1>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}

      <FileUpload onUpload={handleUpload} loading={uploading} />

      <div className="mt-6">
        {loading && files.length === 0 ? (
          <p className="text-gray-500">Carregando...</p>
        ) : files.length === 0 ? (
          <p className="text-gray-500">Nenhum arquivo enviado.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left p-3 text-sm font-medium text-gray-600">Arquivo</th>
                <th className="text-left p-3 text-sm font-medium text-gray-600">Tamanho</th>
                <th className="text-left p-3 text-sm font-medium text-gray-600">Status</th>
                <th className="text-right p-3 text-sm font-medium text-gray-600">Acoes</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.knowledgeFileId} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-mono text-sm">{file.fileName}</td>
                  <td className="p-3 text-sm text-gray-500">{(file.fileSize / 1024).toFixed(1)} KB</td>
                  <td className="p-3">
                    <FileStatusBadge status={file.processingStatus} />
                    {file.errorMessage && (
                      <p className="text-xs text-red-500 mt-1">{file.errorMessage}</p>
                    )}
                  </td>
                  <td className="p-3 text-right space-x-2">
                    {file.processingStatus === ProcessingStatus.Error && (
                      <button onClick={() => handleReprocess(file.knowledgeFileId)} className="text-blue-600 hover:underline text-sm">
                        Reprocessar
                      </button>
                    )}
                    <button onClick={() => handleDelete(file.knowledgeFileId)} className="text-red-600 hover:underline text-sm">
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default KnowledgeFilesPage
