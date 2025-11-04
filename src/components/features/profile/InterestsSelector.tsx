import { X } from 'lucide-react'
import { INTEREST_CATEGORIES } from '../../../types/common.types'
import { logger } from '@utils/logger'

interface InterestsSelectorProps {
  selectedInterests: string[]
  onInterestsChange: (interests: string[]) => void
}

export function InterestsSelector({
  selectedInterests,
  onInterestsChange,
}: InterestsSelectorProps) {
  const toggleInterest = (interest: string) => {
    logger.userAction('Interest toggled', { interest })
    if (selectedInterests.includes(interest)) {
      onInterestsChange(selectedInterests.filter((i) => i !== interest))
    } else {
      onInterestsChange([...selectedInterests, interest])
    }
  }

  const removeInterest = (interest: string) => {
    logger.userAction('Interest removed', { interest })
    onInterestsChange(selectedInterests.filter((i) => i !== interest))
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Your Interests
        </label>
        <div className="flex flex-wrap gap-2">
          {INTEREST_CATEGORIES.map((category) => {
            const isSelected = selectedInterests.includes(category)
            return (
              <button
                key={category}
                type="button"
                onClick={() => toggleInterest(category)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  isSelected
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            )
          })}
        </div>
      </div>

      {selectedInterests.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selected Interests
          </label>
          <div className="flex flex-wrap gap-2">
            {selectedInterests.map((interest) => (
              <span
                key={interest}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
              >
                {interest}
                <button
                  type="button"
                  onClick={() => removeInterest(interest)}
                  className="hover:text-primary-900 transition-colors"
                  aria-label={`Remove ${interest}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

