import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { databaseService } from '@services/supabase/database.service'
import { Card } from '@components/common/Card'
import { Button } from '@components/common/Button'
import { LoadingSpinner } from '@components/common/LoadingSpinner'
import { ErrorMessage } from '@components/common/ErrorMessage'
import type { Account } from '../types/database.types'
import { formatCurrency } from '@utils/formatters'
import { getBankLogoUrl } from '@utils/bankLogos'

export default function AccountDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [account, setAccount] = useState<Account | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      if (!id) return
      setLoading(true)
      setError(null)
      try {
        const data = await databaseService.query<Account>('accounts', {
          filters: { id },
          limit: 1,
        })
        setAccount(data && data.length > 0 ? data[0] : null)
      } catch (e) {
        setError('Failed to load account')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <LoadingSpinner text="Loading account..." />
      </div>
    )
  }

  if (error || !account) {
    return (
      <ErrorMessage
        message={error || 'Account not found'}
        title="Account Error"
        onRetry={() => navigate(0)}
      />
    )
  }

  const logoUrl = getBankLogoUrl(account.bank_name)

  const formatIsoDate = (value?: string) => {
    if (!value) return '—'
    const d = new Date(value)
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-primary-50 overflow-hidden flex items-center justify-center">
            <img src={logoUrl} alt={`${account.bank_name} logo`} className="w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{account.bank_name} Account</h1>
        </div>
        <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
      </div>

      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Detail label="Bank Name" value={account.bank_name} />
          <Detail label="Balance" value={formatCurrency(Number(account.balance))} />
          <Detail label="Account Type" value={account.account_type || '—'} />
          <Detail label="Account Number" value={account.account_number || '—'} />
          <Detail label="Sort Code" value={account.sort_code || '—'} />
          <Detail label="IBAN" value={account.iban || '—'} />
          <Detail label="Created" value={formatIsoDate(account.created_at)} />
          <Detail label="Updated" value={formatIsoDate(account.updated_at)} />
        </div>
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
