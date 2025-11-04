import { CreditCard, TrendingUp } from 'lucide-react'
import { Card } from '@components/common/Card'
import { formatCurrency } from '@utils/formatters'
import type { Account } from '../../../types/database.types'

interface AccountCardProps {
  account: Account
  compact?: boolean
}

export function AccountCard({ account, compact = false }: AccountCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{account.bank_name}</h3>
            {!compact && account.credit_score !== undefined && (
              <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                <TrendingUp className="w-4 h-4" />
                <span>Credit Score: {account.credit_score}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="text-right">
        <p className="text-2xl font-bold text-gray-900">
          {formatCurrency(account.balance)}
        </p>
      </div>
    </Card>
  )
}

