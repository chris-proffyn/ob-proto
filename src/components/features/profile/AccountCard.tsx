import { useNavigate } from 'react-router-dom'
import { CreditCard } from 'lucide-react'
import { Card } from '@components/common/Card'
import { formatCurrency } from '@utils/formatters'
import type { Account } from '../../../types/database.types'
import { getBankLogoUrl } from '@utils/bankLogos'

interface AccountCardProps {
  account: Account
}

export function AccountCard({ account }: AccountCardProps) {
  const navigate = useNavigate()
  const logoUrl = getBankLogoUrl(account.bank_name)

  return (
    <Card className="p-3 cursor-pointer" onClick={() => navigate(`/accounts/${account.id}`)} hover>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center overflow-hidden">
            <img
              src={logoUrl}
              alt={`${account.bank_name} logo`}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to icon if logo is missing
                const target = e.currentTarget as HTMLImageElement
                target.style.display = 'none'
                const parent = target.parentElement
                if (parent && parent.firstChild === target) {
                  const icon = document.createElement('div')
                  icon.innerHTML = ''
                }
              }}
            />
            <CreditCard className="w-4 h-4 text-primary-600" />
          </div>
          <h3 className="text-sm font-semibold text-gray-900">{account.bank_name}</h3>
        </div>
        <p className="text-lg font-bold text-gray-900">{formatCurrency(account.balance)}</p>
      </div>
    </Card>
  )
}

