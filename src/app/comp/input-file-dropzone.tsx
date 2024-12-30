import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload } from 'lucide-react'

interface FileDropzoneProps {
  onFilesSelected: (files: File[]) => void
  value: File[]
  accept?: Record<string, string[]>
  multiple?: boolean
}

export function FileDropzone({ onFilesSelected, value, accept, multiple = true }: FileDropzoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFilesSelected(multiple ? acceptedFiles : [acceptedFiles[0]])
  }, [onFilesSelected, multiple])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept,
    multiple
  })

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Déposez les fichiers ici ...</p>
      ) : (
        <div>
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p>Glissez et déposez {multiple ? 'des fichiers' : 'un fichier'} ici, ou cliquez pour sélectionner</p>
        </div>
      )}
      {value.length > 0 && (
        <p className="mt-2">{value.length} fichier(s) sélectionné(s)</p>
      )}
    </div>
  )
}
