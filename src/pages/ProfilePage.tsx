import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { profileSchema, type ProfileFormData } from '@utils/validators'
import { useAuth } from '@hooks/useAuth'
import { useUserStore } from '@store/userStore'
import { databaseService } from '@services/supabase/database.service'
import { storageService } from '@services/supabase/storage.service'
import { Input } from '@components/common/Input'
import { Button } from '@components/common/Button'
import { LoadingSpinner } from '@components/common/LoadingSpinner'
import { ErrorMessage } from '@components/common/ErrorMessage'
import { Card } from '@components/common/Card'
import { AccountCard } from '@components/features/profile/AccountCard'
import { AvatarUpload } from '@components/features/profile/AvatarUpload'
import { InterestsSelector } from '@components/features/profile/InterestsSelector'
import { ChampionsSelector } from '@components/features/profile/ChampionsSelector'
import { logger } from '@utils/logger'
import toast from 'react-hot-toast'
import { User } from 'lucide-react'

export default function ProfilePage() {
  const { user } = useAuth()
  const { profile, accounts, setProfile, setAccounts } = useUserStore()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [selectedChampions, setSelectedChampions] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  })

  useEffect(() => {
    logger.componentMounted('ProfilePage')

    const loadProfile = async () => {
      if (!user?.id) return

      setIsLoading(true)
      setError(null)

      try {
        const [profileData, accountsData] = await Promise.all([
          databaseService.getProfile(user.id),
          databaseService.query('accounts', {
            filters: { user_id: user.id },
          }),
        ])

        if (profileData) {
          setProfile(profileData as any)
          setValue('name', profileData.name || '')
          setValue('dob', profileData.dob || '')
          setValue('address', profileData.address || '')
          setSelectedInterests(profileData.interests || [])
          setSelectedChampions(profileData.favourite_champions || [])
        }

        if (accountsData) {
          setAccounts(accountsData as any)
        }
      } catch (err) {
        logger.error('Error loading profile', err as Error)
        setError('Failed to load profile')
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()

    return () => logger.componentUnmounted('ProfilePage')
  }, [user, setProfile, setAccounts, setValue])

  const onSubmit = async (data: ProfileFormData) => {
    if (!user?.id) return

    logger.userAction('Profile update submitted', data)
    setIsSaving(true)
    setError(null)

    try {
      // Upload avatar if changed
      let avatarUrl = profile?.avatar_url
      if (avatarFile) {
        const fileName = `${user.id}-${Date.now()}.${avatarFile.name.split('.').pop()}`
        const uploadResult = await storageService.uploadFile(`avatars/${fileName}`, avatarFile)

        if (uploadResult) {
          avatarUrl = storageService.getPublicUrl(`avatars/${fileName}`)
          logger.info('Avatar uploaded successfully', { avatarUrl })
        }
      }

      // Update profile
      const updates = {
        name: data.name,
        dob: data.dob || null,
        address: data.address || null,
        avatar_url: avatarUrl || null,
        interests: selectedInterests,
        favourite_champions: selectedChampions,
      }

      const result = await databaseService.updateProfile(user.id, updates)

      if (result) {
        setProfile(result as any)
        toast.success('Profile updated successfully!')
        logger.info('Profile updated successfully')
        setAvatarFile(null)
      } else {
        setError('Failed to update profile')
      }
    } catch (err) {
      logger.error('Profile update failed', err as Error)
      setError('Failed to update profile')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Loading profile..." />
      </div>
    )
  }

  if (error && !profile) {
    return (
      <ErrorMessage
        message={error}
        title="Profile Error"
        onRetry={() => window.location.reload()}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <User className="w-6 h-6 text-primary-600" />
          Profile Settings
        </h1>
        <p className="text-gray-600 mt-1">Manage your personal information</p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Avatar Upload */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Picture</h2>
            <AvatarUpload
              currentAvatarUrl={profile?.avatar_url}
              onAvatarChange={setAvatarFile}
            />
          </div>

          {/* Personal Information */}
          <div className="border-b border-gray-200 pb-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Personal Information
            </h2>
            <Input
              label="Name"
              placeholder="John Doe"
              error={errors.name?.message}
              {...register('name')}
            />

            <Input
              label="Email"
              type="email"
              value={user?.email || ''}
              disabled
              helperText="Email cannot be changed"
            />

            <Input
              label="Date of Birth"
              type="date"
              error={errors.dob?.message}
              {...register('dob')}
            />

            <Input
              label="Address"
              placeholder="123 Main St, City, Country"
              error={errors.address?.message}
              {...register('address')}
            />
          </div>

          {/* Connected Accounts */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Connected Accounts</h2>
            {accounts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {accounts.map((account) => (
                  <AccountCard key={account.id} account={account} />
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No accounts connected yet.</p>
            )}
          </div>

          {/* Interests */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Interests</h2>
            <InterestsSelector
              selectedInterests={selectedInterests}
              onInterestsChange={setSelectedInterests}
            />
          </div>

          {/* Favourite Champions */}
          <div className="pb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Favourite Champions</h2>
            <ChampionsSelector
              selectedChampions={selectedChampions}
              onChampionsChange={setSelectedChampions}
            />
          </div>

          {/* Error Display */}
          {error && (
            <ErrorMessage message={error} title="Save Error" />
          )}

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isSaving}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

