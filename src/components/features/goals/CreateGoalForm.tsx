import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { goalSchema, type GoalFormData } from '@utils/validators'
import { Input } from '@components/common/Input'
import { Button } from '@components/common/Button'
import { logger } from '@utils/logger'

interface CreateGoalFormProps {
  onSubmit: (data: GoalFormData) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
  accounts?: Array<{ id: string; bank_name: string }>
}

export function CreateGoalForm({
  onSubmit,
  onCancel,
  isLoading = false,
  accounts = [],
}: CreateGoalFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GoalFormData>({
    resolver: zodResolver(goalSchema),
  })

  const handleFormSubmit = async (data: GoalFormData) => {
    logger.userAction('Create goal form submitted', data)
    await onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Input
        label="Goal Name"
        placeholder="e.g., Emergency Fund"
        error={errors.name?.message}
        {...register('name')}
      />

      <Input
        label="Description"
        placeholder="What are you saving for?"
        error={errors.description?.message}
        {...register('description')}
      />

      <Input
        label="Target Amount"
        type="number"
        step="0.01"
        placeholder="0.00"
        error={errors.target_amount?.message}
        {...register('target_amount', { valueAsNumber: true })}
      />

      <Input
        label="Regular Amount (Optional)"
        type="number"
        step="0.01"
        placeholder="0.00"
        error={(errors as any).regular_amount?.message}
        {...register('regular_amount', { valueAsNumber: true })}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Frequency
        </label>
        <select
          {...register('frequency')}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="one-time">One-time</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        {errors.frequency && (
          <p className="mt-1 text-sm text-red-600">{errors.frequency.message}</p>
        )}
      </div>

      <Input
        label="Due Date (Optional)"
        type="date"
        error={errors.due_date?.message}
        {...register('due_date')}
      />

      {accounts.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Linked Account (Optional)
          </label>
          <select
            {...register('linked_account_id')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">None</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.bank_name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          fullWidth
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
          Create Goal
        </Button>
      </div>
    </form>
  )
}

