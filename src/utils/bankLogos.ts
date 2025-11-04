export function bankNameToSlug(bankName: string): string {
  return bankName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

export function getBankLogoUrl(bankName: string): string {
  const slug = bankNameToSlug(bankName)
  return `/logos/${slug}.png`
}
