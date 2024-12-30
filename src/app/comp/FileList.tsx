"use client"
import Image from 'next/image'
import { FileIcon, FileTextIcon, VideoIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getFiles } from '@/actions/files'
import { useEffect, useState } from 'react'

interface File {
  id: string
  name: string
  path: string
  type: string
}

export default function FileList() {
  const [files,setFiles]=useState<any>()
  useEffect(()=>{
    getFiles().then((data)=>setFiles(data))
  },[])

  const renderFileCard = (file: File) => {
    switch (file.type) {
      case 'image':
        return (
          <Card key={file.id} className="w-full max-w-sm mx-auto">
            <CardContent className="p-4">
              <Image src={file.path} alt={file.name} width={300} height={200} className="rounded-lg" />
              <h3 className="mt-2 font-semibold">{file.name}</h3>
              <div className="mt-2 flex justify-between">
                <Button onClick={() => window.open(file.path, '_blank')}>Ouvrir</Button>
                <Button onClick={() => window.open(file.path, '_blank')}>Télécharger</Button>
              </div>
            </CardContent>
          </Card>
        )
      case 'video':
        return (
          <Card key={file.id} className="w-full max-w-sm mx-auto">
            <CardContent className="p-4">
              <VideoIcon className="w-16 h-16 mx-auto text-blue-500" />
              <h3 className="mt-2 font-semibold">{file.name}</h3>
              <div className="mt-2 flex justify-between">
                <Button onClick={() => window.open(file.path, '_blank')}>Ouvrir</Button>
                <Button onClick={() => window.open(file.path, '_blank')}>Télécharger</Button>
              </div>
            </CardContent>
          </Card>
        )
      case 'pdf':
        return (
          <Card key={file.id} className="w-full max-w-sm mx-auto">
            <CardContent className="p-4">
              <FileTextIcon className="w-16 h-16 mx-auto text-red-500" />
              <h3 className="mt-2 font-semibold">PDF: {file.name}</h3>
              <div className="mt-2 flex justify-between">
                <Button onClick={() => window.open(file.path, '_blank')}>Ouvrir</Button>
                <Button onClick={() => window.open(file.path, '_blank')}>Télécharger</Button>
              </div>
            </CardContent>
          </Card>
        )
      default:
        return (
          <Card key={file.id} className="w-full max-w-sm mx-auto">
            <CardContent className="p-4">
              <FileIcon className="w-16 h-16 mx-auto text-gray-500" />
              <h3 className="mt-2 font-semibold">{file.name}</h3>
              <p>Extension: {file.name.split('.').pop()}</p>
              <div className="mt-2 flex justify-between">
                <Button onClick={() => window.open(file.path, '_blank')}>Ouvrir</Button>
                <Button onClick={() => window.open(file.path, '_blank')}>Télécharger</Button>
              </div>
            </CardContent>
          </Card>
        )
    }
  }

  return (
    <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {files   && files.map(renderFileCard)}
    </div>
  )
}

