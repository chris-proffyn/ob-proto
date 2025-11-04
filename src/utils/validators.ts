import { z } from 'zod'

export const emailSchema = z.string().email('Please enter a valid email address')

export const passwordSchema = z
  .string()
  .min(6, 'Password must be at least 6 characters')
  .max(100, 'Password must be less than 100 characters')

export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
})

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100).optional(),
  dob: z.string().optional(),
  address: z.string().max(200).optional(),
})

export const goalSchema = z.object({
  name: z.string().min(3, 'Goal name must be at least 3 characters').max(100),
  description: z.string().max(500).optional(),
  target_amount: z.number().positive('Target amount must be positive').min(0.01),
  frequency: z.enum(['daily', 'weekly', 'monthly', 'one-time']),
  due_date: z.string().optional(),
  regular_amount: z.number().positive('Regular amount must be positive').min(0.01).optional(),
  linked_account_id: z.string().optional(),
})

export type SignUpFormData = z.infer<typeof signUpSchema>
export type SignInFormData = z.infer<typeof signInSchema>
export type ProfileFormData = z.infer<typeof profileSchema>
export type GoalFormData = z.infer<typeof goalSchema>

