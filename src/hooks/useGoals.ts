import { useEffect, useCallback } from 'react'
import { useGoalsStore } from '@store/goalsStore'
import { databaseService } from '@services/supabase/database.service'
import { logger } from '@utils/logger'
import type { Goal, GoalFormData } from '../types/goal.types'

export function useGoals(userId?: string) {
  const {
    goals,
    selectedGoal,
    isLoading,
    error,
    setGoals,
    addGoal,
    updateGoal,
    deleteGoal,
    setSelectedGoal,
    setLoading,
    setError,
  } = useGoalsStore()

  const loadGoals = useCallback(async () => {
    if (!userId) return

    logger.info('Loading goals', { userId })
    setLoading(true)
    setError(null)

    try {
      const data = await databaseService.query<Goal>('goals', {
        filters: { user_id: userId },
        order: { column: 'created_at', ascending: false },
      })

      if (data) {
        setGoals(data)
      } else {
        setError('Failed to load goals')
      }
    } catch (err) {
      logger.error('Error loading goals', err as Error)
      setError('Failed to load goals')
    } finally {
      setLoading(false)
    }
  }, [userId, setGoals, setLoading, setError])

  useEffect(() => {
    if (userId) {
      loadGoals()
    }
  }, [userId, loadGoals])

  const createGoal = useCallback(
    async (goalData: GoalFormData) => {
      if (!userId) return null

      logger.info('Creating goal', { userId, goalData })
      setLoading(true)
      setError(null)

      try {
        const newGoal = await databaseService.insert<Goal>('goals', {
          ...goalData,
          user_id: userId,
          saved_amount: 0,
        })

        if (newGoal) {
          addGoal(newGoal)
          return newGoal
        }
        setError('Failed to create goal')
        return null
      } catch (err) {
        logger.error('Error creating goal', err as Error)
        setError('Failed to create goal')
        return null
      } finally {
        setLoading(false)
      }
    },
    [userId, addGoal, setLoading, setError]
  )

  const updateGoalById = useCallback(
    async (goalId: string, updates: Partial<GoalFormData>) => {
      logger.info('Updating goal', { goalId, updates })
      setLoading(true)
      setError(null)

      try {
        const updated = await databaseService.update<Goal>('goals', goalId, updates)

        if (updated) {
          updateGoal(goalId, updates)
          return updated
        }
        setError('Failed to update goal')
        return null
      } catch (err) {
        logger.error('Error updating goal', err as Error)
        setError('Failed to update goal')
        return null
      } finally {
        setLoading(false)
      }
    },
    [updateGoal, setLoading, setError]
  )

  const deleteGoalById = useCallback(
    async (goalId: string) => {
      logger.info('Deleting goal', { goalId })
      setLoading(true)
      setError(null)

      try {
        const success = await databaseService.delete('goals', goalId)

        if (success) {
          deleteGoal(goalId)
          return true
        }
        setError('Failed to delete goal')
        return false
      } catch (err) {
        logger.error('Error deleting goal', err as Error)
        setError('Failed to delete goal')
        return false
      } finally {
        setLoading(false)
      }
    },
    [deleteGoal, setLoading, setError]
  )

  return {
    goals,
    selectedGoal,
    isLoading,
    error,
    loadGoals,
    createGoal,
    updateGoal: updateGoalById,
    deleteGoal: deleteGoalById,
    setSelectedGoal,
  }
}

