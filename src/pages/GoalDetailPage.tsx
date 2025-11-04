import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { databaseService } from '@services/supabase/database.service'
import { Card } from '@components/common/Card'
import { Button } from '@components/common/Button'
import { LoadingSpinner } from '@components/common/LoadingSpinner'
import { ErrorMessage } from '@components/common/ErrorMessage'
import type { Goal, Account } from '../types/database.types'
import type { GoalFormData } from '../types/goal.types'
import { goalSchema } from '@utils/validators'
import { ProgressBar } from '@components/common/ProgressBar'
import { calculateProgress, formatCurrency, formatDate } from '@utils/formatters'
import toast from 'react-hot-toast'

export default function GoalDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [goal, setGoal] = useState<Goal | null>(null)
  const [linkedAccount, setLinkedAccount] = useState<Account | null>(null)
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isPaying, setIsPaying] = useState(false)
  const [paymentAmount, setPaymentAmount] = useState<number>(0)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GoalFormData>({ resolver: zodResolver(goalSchema) })

  useEffect(() => {
    const load = async () => {
      if (!id) return
      setLoading(true)
      setError(null)
      try {
        const data = await databaseService.query<Goal>('goals', {
          filters: { id },
          limit: 1,
        })
        const g = data && data.length > 0 ? data[0] : null
        setGoal(g)
        if (g) {
          reset({
            name: g.name,
            description: g.description || undefined,
            frequency: (g.frequency as any) || 'one-time',
            regular_amount: g.regular_amount ? Number(g.regular_amount) : undefined,
            linked_account_id: g.linked_account_id || undefined,
            target_amount: Number(g.target_amount),
          })
        }

        const accs = await databaseService.query<Account>('accounts')
        setAccounts(accs || [])

        if (g?.linked_account_id) {
          const acc = await databaseService.query<Account>('accounts', {
            filters: { id: g.linked_account_id },
            limit: 1,
          })
          setLinkedAccount(acc && acc.length > 0 ? acc[0] : null)
        } else {
          setLinkedAccount(null)
        }
      } catch (e) {
        setError('Failed to load goal')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id, reset])

  const progress = useMemo(() => {
    if (!goal) return 0
    return calculateProgress(Number(goal.saved_amount || 0), Number(goal.target_amount || 0))
  }, [goal])

  const onSubmit = async (data: GoalFormData) => {
    if (!id) return
    setIsSaving(true)
    try {
      const updated = await databaseService.update<Goal>('goals', id, {
        name: data.name,
        description: data.description,
        frequency: data.frequency,
        regular_amount: data.regular_amount,
        linked_account_id: data.linked_account_id || null,
      })
      if (updated) {
        setGoal(updated)
        if (updated.linked_account_id) {
          const acc = await databaseService.query<Account>('accounts', {
            filters: { id: updated.linked_account_id },
            limit: 1,
          })
          setLinkedAccount(acc && acc.length > 0 ? acc[0] : null)
        } else {
          setLinkedAccount(null)
        }
        setIsEditing(false)
        toast.success('Goal updated')
      }
    } catch (e) {
      toast.error('Failed to update goal')
    } finally {
      setIsSaving(false)
    }
  }

  const handlePayment = async () => {
    if (!goal) return
    const amount = Number(paymentAmount)
    if (!amount || amount <= 0 || isNaN(amount)) {
      toast.error('Enter a valid amount')
      return
    }
    if (!linkedAccount?.id) {
      toast.error('Link an account to this goal first')
      return
    }
    if (Number(linkedAccount.balance) < amount) {
      toast.error('Insufficient account balance')
      return
    }

    setIsPaying(true)
    try {
      // Debit account
      const newBalance = Number(linkedAccount.balance) - amount
      const updatedAcc = await databaseService.update<Account>('accounts', linkedAccount.id, {
        balance: newBalance,
      })
      if (!updatedAcc) throw new Error('Failed to update account')

      // Credit goal saved_amount
      const newSaved = Number(goal.saved_amount || 0) + amount
      const updatedGoal = await databaseService.update<Goal>('goals', goal.id, {
        saved_amount: newSaved,
      })
      if (!updatedGoal) throw new Error('Failed to update goal')

      setLinkedAccount(updatedAcc)
      setGoal(updatedGoal)
      setPaymentAmount(0)
      toast.success('Payment applied to goal')
    } catch (e) {
      toast.error('Failed to make payment')
    } finally {
      setIsPaying(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <LoadingSpinner text="Loading goal..." />
      </div>
    )
  }

  if (error || !goal) {
    return (
      <ErrorMessage
        message={error || 'Goal not found'}
        title="Goal Error"
        onRetry={() => navigate(0)}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{goal.name}</h1>
        <div className="flex gap-2">
          {!isEditing && (
            <Button variant="outline" onClick={() => setIsEditing(true)}>Edit</Button>
          )}
          <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
        </div>
      </div>

      <Card className="p-6 space-y-6">
        {!isEditing ? (
          <>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700">Progress</span>
                <span className="text-sm text-gray-600">{formatCurrency(Number(goal.saved_amount || 0))} / {formatCurrency(Number(goal.target_amount || 0))}</span>
              </div>
              <ProgressBar progress={progress} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Detail label="Description" value={goal.description || '—'} />
              <Detail label="Frequency" value={goal.frequency || '—'} />
              <Detail label="Regular Amount" value={goal.regular_amount ? formatCurrency(Number(goal.regular_amount)) : '—'} />
              <Detail label="Due Date" value={goal.due_date ? formatDate(goal.due_date) : '—'} />
              <Detail label="Linked Account" value={linkedAccount ? `${linkedAccount.bank_name} (${linkedAccount.account_type || 'Account'})` : '—'} />
              <Detail label="Created" value={goal.created_at ? formatDate(goal.created_at) : '—'} />
              <Detail label="Updated" value={goal.updated_at ? formatDate(goal.updated_at) : '—'} />
            </div>

            {/* Make Payment */}
            <div className="border-t border-gray-200 pt-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Make Payment</h2>
              <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
                <div className="sm:w-64">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(parseFloat(e.target.value))}
                  />
                  {linkedAccount && (
                    <p className="mt-1 text-xs text-gray-500">Available: {formatCurrency(Number(linkedAccount.balance))}</p>
                  )}
                </div>
                <Button onClick={handlePayment} variant="primary" isLoading={isPaying}>
                  Make Payment
                </Button>
              </div>
              {!linkedAccount && (
                <p className="mt-2 text-sm text-red-600">Link an account to this goal to make payments.</p>
              )}
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" {...register('name')} />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" {...register('frequency')}>
                  <option value="one-time">One-time</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
                {errors.frequency && <p className="mt-1 text-sm text-red-600">{errors.frequency.message}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" {...register('description')} />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Regular Amount</label>
                <input type="number" step="0.01" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" {...register('regular_amount', { valueAsNumber: true })} />
                {(errors as any).regular_amount && <p className="mt-1 text-sm text-red-600">{(errors as any).regular_amount.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Linked Account</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" {...register('linked_account_id')}>
                  <option value="">None</option>
                  {accounts.map((a) => (
                    <option key={a.id} value={a.id}>{a.bank_name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => { setIsEditing(false); reset({
                name: goal.name,
                description: goal.description || undefined,
                frequency: (goal.frequency as any) || 'one-time',
                regular_amount: goal.regular_amount ? Number(goal.regular_amount) : undefined,
                linked_account_id: goal.linked_account_id || undefined,
                target_amount: Number(goal.target_amount),
              })}}>Cancel</Button>
              <Button type="submit" variant="primary" isLoading={isSaving}>Save Changes</Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-gray-900 font-medium break-all">{value}</p>
    </div>
  )
}
