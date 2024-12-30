'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { uploadFiles } from '@/actions/files'

export default function FileUpload() {
  const [uploading, setUploading] = useState(false)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true)
    const formData = new FormData()
    acceptedFiles.forEach(file => {
      formData.append('files', file)
    })

    try {
      await uploadFiles(formData)
      console.log('Files uploaded successfully')
    } catch (error) {
      console.error('Error uploading files:', error)
    } finally {
      setUploading(false)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

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
          <p>Glissez et déposez des fichiers ici, ou cliquez pour sélectionner des fichiers</p>
        </div>
      )}
      {uploading && <p>Téléchargement en cours...</p>}
      <Button className="mt-4">Sélectionner des fichiers</Button>
    </div>
  )
}

