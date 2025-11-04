import { supabase } from './client'
import { logger } from '@utils/logger'
import { errorHandler } from '@services/api/error.handler'
import toast from 'react-hot-toast'

export class StorageService {
  private bucket: string

  constructor(bucket: string = 'avatars') {
    this.bucket = bucket
    logger.info('Storage service initialized', { bucket })
  }

  async uploadFile(path: string, file: File, _onProgress?: (progress: number) => void) {
    logger.info('Uploading file', { path, fileName: file.name, size: file.size })

    try {
      const { data, error } = await supabase.storage.from(this.bucket).upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      })

      if (error) {
        logger.error('File upload failed', error, { path })
        throw error
      }

      logger.info('File uploaded successfully', { path, data })
      toast.success('File uploaded successfully!')
      return data
    } catch (error) {
      return errorHandler.handle(error, 'StorageService.uploadFile')
    }
  }

  async downloadFile(path: string) {
    logger.info('Downloading file', { path })

    try {
      const { data, error } = await supabase.storage.from(this.bucket).download(path)

      if (error) {
        logger.error('File download failed', error, { path })
        throw error
      }

      logger.info('File downloaded successfully', { path })
      return data
    } catch (error) {
      return errorHandler.handle(error, 'StorageService.downloadFile')
    }
  }

  async deleteFile(path: string) {
    logger.info('Deleting file', { path })

    try {
      const { error } = await supabase.storage.from(this.bucket).remove([path])

      if (error) {
        logger.error('File deletion failed', error, { path })
        throw error
      }

      logger.info('File deleted successfully', { path })
      toast.success('File deleted successfully!')
      return true
    } catch (error) {
      errorHandler.handle(error, 'StorageService.deleteFile')
      return false
    }
  }

  getPublicUrl(path: string): string {
    const { data } = supabase.storage.from(this.bucket).getPublicUrl(path)
    logger.debug('Generated public URL', { path, url: data.publicUrl })
    return data.publicUrl
  }

  async listFiles(folder: string = '') {
    logger.info('Listing files', { folder })

    try {
      const { data, error } = await supabase.storage.from(this.bucket).list(folder)

      if (error) {
        logger.error('Failed to list files', error, { folder })
        throw error
      }

      logger.info('Files listed successfully', { folder, count: data.length })
      return data
    } catch (error) {
      errorHandler.handle(error, 'StorageService.listFiles')
      return []
    }
  }
}

export const storageService = new StorageService()


