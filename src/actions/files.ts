'use server'

import { writeFile } from 'fs/promises'
import path from 'path'
import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

export async function uploadFiles(formData: FormData) {
  const files = formData.getAll('files') as File[]
  const savedFiles = []

  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = file.name.replace(/\s/g, '-')
    const filepath = path.join(process.cwd(), 'public', 'files', filename)

    try {
      await writeFile(filepath, buffer)
      console.log(`Saved file to ${filepath}`)

      const savedFile = await prisma.file.create({
        data: {
          name: filename,
          path: `/files/${filename}`,
          type: getFileType(filename),
        },
      })

      savedFiles.push(savedFile)
    } catch (error) {
      console.error('Error saving file:', error)
      throw new Error('Error saving file')
    }
  }

  revalidatePath('/')
  return { files: savedFiles }
}

export async function getFiles() {
  try {
    const files = await prisma.file.findMany()
    return files
  } catch (error) {
    console.error('Error fetching files:', error)
    throw new Error('Error fetching files')
  }
}

function getFileType(filename: string): string {
  const ext = path.extname(filename).toLowerCase()
  if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) return 'image'
  if (['.mp4', '.avi', '.mov'].includes(ext)) return 'video'
  if (ext === '.pdf') return 'pdf'
  return 'other'
}

