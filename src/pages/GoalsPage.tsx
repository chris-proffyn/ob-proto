import { useState } from 'react'
import { useAuth } from '@hooks/useAuth'
import { useGoals } from '@hooks/useGoals'
import { useUserStore } from '@store/userStore'
import { GoalCard } from '@components/features/goals/GoalCard'
import { CreateGoalForm } from '@components/features/goals/CreateGoalForm'
import { Modal } from '@components/common/Modal'
import { Button } from '@components/common/Button'
import { LoadingSpinner } from '@components/common/LoadingSpinner'
import { ErrorMessage } from '@components/common/ErrorMessage'
import { Card } from '@components/common/Card'
import { logger } from '@utils/logger'
import { Plus, Target } from 'lucide-react'
import type { GoalFormData } from '@utils/validators'

export default function GoalsPage() {
  const { user } = useAuth()
  const { goals, isLoading, error, createGoal } = useGoals(user?.id)
  const { accounts } = useUserStore()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  const handleCreateGoal = async (data: GoalFormData) => {
    logger.userAction('Creating new goal', data)
    setIsCreating(true)
    try {
      const result = await createGoal(data)
      if (result) {
        setIsCreateModalOpen(false)
      }
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Target className="w-6 h-6 text-primary-600" />
            My Goals
          </h1>
          <p className="text-gray-600 mt-1">Track and manage your savings goals</p>
        </div>
        <Button
          variant="primary"
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Goal
        </Button>
      </div>

      {isLoading ? (
        <LoadingSpinner size="lg" text="Loading goals..." />
      ) : error ? (
        <ErrorMessage message={error} title="Error Loading Goals" />
      ) : goals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No goals yet</h2>
          <p className="text-gray-600 mb-6">
            Create your first savings goal to start tracking your progress!
          </p>
          <Button variant="primary" onClick={() => setIsCreateModalOpen(true)}>
            Create Your First Goal
          </Button>
        </Card>
      )}

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Goal"
        size="md"
      >
        <CreateGoalForm
          onSubmit={handleCreateGoal}
          onCancel={() => setIsCreateModalOpen(false)}
          isLoading={isCreating}
          accounts={accounts.map((acc) => ({
            id: acc.id,
            bank_name: acc.bank_name,
          }))}
        />
      </Modal>
    </div>
  )
}

