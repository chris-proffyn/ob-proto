import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpSchema, type SignUpFormData } from '@utils/validators'
import { useAuth } from '@hooks/useAuth'
import { Input } from '@components/common/Input'
import { Button } from '@components/common/Button'
import { logger } from '@utils/logger'

export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = async (data: SignUpFormData) => {
    logger.userAction('Signup form submitted', { email: data.email })
    setIsLoading(true)

    try {
      const result = await signUp(data.email, data.password, {
        name: data.name,
        full_name: data.name,
      })

      if (result) {
        logger.info('Signup successful, redirecting to dashboard')
        navigate('/dashboard')
      }
    } catch (error) {
      logger.error('Signup form error', error as Error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Name"
        type="text"
        placeholder="John Doe"
        error={errors.name?.message}
        {...register('name')}
      />

      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register('email')}
      />

      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        error={errors.password?.message}
        helperText="Must be at least 6 characters"
        {...register('password')}
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        isLoading={isLoading}
      >
        Create Account
      </Button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
        >
          Sign in
        </button>
      </p>
    </form>
  )
}

