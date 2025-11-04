import { Check, X } from 'lucide-react'
import { AVAILABLE_CHAMPIONS } from '../../../types/common.types'
import { logger } from '@utils/logger'

interface ChampionsSelectorProps {
  selectedChampions: string[]
  onChampionsChange: (champions: string[]) => void
}

export function ChampionsSelector({
  selectedChampions,
  onChampionsChange,
}: ChampionsSelectorProps) {
  const toggleChampion = (championName: string) => {
    logger.userAction('Champion toggled', { championName })
    if (selectedChampions.includes(championName)) {
      onChampionsChange(selectedChampions.filter((c) => c !== championName))
    } else {
      onChampionsChange([...selectedChampions, championName])
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Favourite Champions
      </label>
      <p className="text-sm text-gray-500 mb-3">
        Select champions that inspire you
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {AVAILABLE_CHAMPIONS.map((champion) => {
          const isSelected = selectedChampions.includes(champion.name)
          return (
            <button
              key={champion.id}
              type="button"
              onClick={() => toggleChampion(champion.name)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                isSelected
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{champion.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{champion.category}</p>
                </div>
                {isSelected && (
                  <Check className="w-5 h-5 text-primary-600 flex-shrink-0" />
                )}
              </div>
            </button>
          )
        })}
      </div>
      {selectedChampions.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Selected Champions ({selectedChampions.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedChampions.map((champion) => (
              <span
                key={champion}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
              >
                {champion}
                <button
                  type="button"
                  onClick={() => toggleChampion(champion)}
                  className="hover:text-primary-900 transition-colors"
                  aria-label={`Remove ${champion}`}
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

