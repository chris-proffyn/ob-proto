import { format, formatDistance, isPast, differenceInDays } from 'date-fns'

export const formatCurrency = (amount: number, currency: string = 'GBP'): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
  }).format(amount)
}

export const formatDate = (date: string | Date, formatStr: string = 'dd MMM yyyy'): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return format(dateObj, formatStr)
  } catch {
    return ''
  }
}

export const formatRelativeDate = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return formatDistance(dateObj, new Date(), { addSuffix: true })
  } catch {
    return ''
  }
}

export const formatPercentage = (value: number, decimals: number = 0): string => {
  return `${value.toFixed(decimals)}%`
}

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-GB').format(value)
}

export const calculateDaysRemaining = (dueDate: string | Date | undefined): number | null => {
  if (!dueDate) return null
  try {
    const dateObj = typeof dueDate === 'string' ? new Date(dueDate) : dueDate
    if (isPast(dateObj)) return 0
    return differenceInDays(dateObj, new Date())
  } catch {
    return null
  }
}

export const calculateProgress = (current: number, target: number): number => {
  if (target === 0) return 0
  const progress = (current / target) * 100
  return Math.min(Math.max(progress, 0), 100)
}

