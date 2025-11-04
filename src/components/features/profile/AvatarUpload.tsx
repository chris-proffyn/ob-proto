import { useState, useRef } from 'react'
import { Upload, X } from 'lucide-react'
import { logger } from '@utils/logger'

interface AvatarUploadProps {
  currentAvatarUrl?: string
  onAvatarChange: (file: File | null) => void
}

export function AvatarUpload({ currentAvatarUrl, onAvatarChange }: AvatarUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentAvatarUrl || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      logger.userAction('Avatar file selected', { fileName: file.name, size: file.size })

      // Validate file type
      if (!file.type.startsWith('image/')) {
        logger.warn('Invalid file type for avatar', { type: file.type })
        return
      }

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        logger.warn('Avatar file too large', { size: file.size })
        return
      }

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      onAvatarChange(file)
    }
  }

  const handleRemove = () => {
    logger.userAction('Avatar removed')
    setPreview(null)
    onAvatarChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32 mb-4">
        {preview ? (
          <div className="relative w-full h-full">
            <img
              src={preview}
              alt="Avatar preview"
              className="w-full h-full object-cover rounded-full"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              aria-label="Remove avatar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
            <Upload className="w-12 h-12 text-gray-400" />
          </div>
        )}
      </div>
      <label className="cursor-pointer">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors inline-block text-sm font-medium">
          {preview ? 'Change Photo' : 'Choose Photo'}
        </span>
      </label>
      <p className="text-xs text-gray-500 mt-2">Max 2MB, JPG or PNG</p>
    </div>
  )
}

