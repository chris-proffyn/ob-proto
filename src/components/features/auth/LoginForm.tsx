import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInSchema, type SignInFormData } from '@utils/validators'
import { useAuth } from '@hooks/useAuth'
import { Input } from '@components/common/Input'
import { Button } from '@components/common/Button'
import { logger } from '@utils/logger'

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit = async (data: SignInFormData) => {
    logger.userAction('Login form submitted', { email: data.email })
    setIsLoading(true)

    try {
      const result = await signIn(data.email, data.password)

      if (result) {
        logger.info('Login successful, redirecting to dashboard')
        navigate('/dashboard')
      }
    } catch (error) {
      logger.error('Login form error', error as Error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        {...register('password')}
      />

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <span className="ml-2 text-sm text-gray-600">Remember me</span>
        </label>

        <button
          type="button"
          onClick={() => navigate('/forgot-password')}
          className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
        >
          Forgot password?
        </button>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        isLoading={isLoading}
      >
        Sign In
      </Button>

      <p className="text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={() => navigate('/signup')}
          className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
        >
          Sign up
        </button>
      </p>
    </form>
  )
}

