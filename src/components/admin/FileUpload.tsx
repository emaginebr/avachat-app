import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

interface FileUploadProps {
  onUpload: (file: File) => Promise<void>
  loading: boolean
}

const FileUpload = ({ onUpload, loading }: FileUploadProps) => {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      await onUpload(file)
    }
  }, [onUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/markdown': ['.md'] },
    maxSize: 10 * 1024 * 1024,
    disabled: loading,
  })

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
      } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-blue-600">Solte o arquivo aqui...</p>
      ) : (
        <div>
          <p className="text-gray-600">Arraste arquivos .md aqui ou clique para selecionar</p>
          <p className="text-sm text-gray-400 mt-1">Maximo 10MB por arquivo</p>
        </div>
      )}
    </div>
  )
}

export default FileUpload
