import { create } from 'zustand'
import { logger } from '@utils/logger'
import type { Goal, GoalWithProgress, GoalUpdateData } from '../types/goal.types'

interface GoalsState {
  goals: GoalWithProgress[]
  selectedGoal: GoalWithProgress | null
  isLoading: boolean
  error: string | null

  setGoals: (goals: Goal[]) => void
  addGoal: (goal: Goal) => void
  updateGoal: (goalId: string, updates: GoalUpdateData) => void
  deleteGoal: (goalId: string) => void
  setSelectedGoal: (goal: GoalWithProgress | null) => void
  calculateProgress: (goal: Goal) => GoalWithProgress
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

const calculateGoalProgress = (goal: Goal): GoalWithProgress => {
  const progress_percentage =
    goal.target_amount > 0 ? (goal.saved_amount / goal.target_amount) * 100 : 0
  const is_complete = progress_percentage >= 100

  let days_remaining: number | undefined
  if (goal.due_date) {
    const dueDate = new Date(goal.due_date)
    const today = new Date()
    const diff = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    days_remaining = diff > 0 ? diff : 0
  }

  return {
    ...goal,
    progress_percentage: Math.min(Math.max(progress_percentage, 0), 100),
    days_remaining,
    is_complete,
  }
}

export const useGoalsStore = create<GoalsState>((set) => ({
  goals: [],
  selectedGoal: null,
  isLoading: false,
  error: null,

  setGoals: (goals) => {
    logger.debug('Setting goals in store', { count: goals.length })
    const goalsWithProgress = goals.map(calculateGoalProgress)
    set({ goals: goalsWithProgress })
  },

  addGoal: (goal) => {
    logger.debug('Adding goal to store', { goalId: goal.id })
    const goalWithProgress = calculateGoalProgress(goal)
    set((state) => ({
      goals: [...state.goals, goalWithProgress],
    }))
  },

  updateGoal: (goalId, updates) => {
    logger.debug('Updating goal in store', { goalId, updates })
    set((state) => ({
      goals: state.goals.map((goal) => {
        if (goal.id === goalId) {
          const updatedGoal = { ...goal, ...updates }
          return calculateGoalProgress(updatedGoal)
        }
        return goal
      }),
      selectedGoal:
        state.selectedGoal?.id === goalId
          ? calculateGoalProgress({ ...state.selectedGoal, ...updates })
          : state.selectedGoal,
    }))
  },

  deleteGoal: (goalId) => {
    logger.debug('Deleting goal from store', { goalId })
    set((state) => ({
      goals: state.goals.filter((goal) => goal.id !== goalId),
      selectedGoal: state.selectedGoal?.id === goalId ? null : state.selectedGoal,
    }))
  },

  setSelectedGoal: (goal) => {
    logger.debug('Setting selected goal', { goalId: goal?.id })
    set({ selectedGoal: goal })
  },

  calculateProgress: calculateGoalProgress,

  setLoading: (isLoading) => {
    set({ isLoading })
  },

  setError: (error) => {
    logger.warn('Goals store error set', { error })
    set({ error })
  },

  reset: () => {
    logger.info('Resetting goals store')
    set({
      goals: [],
      selectedGoal: null,
      isLoading: false,
      error: null,
    })
  },
}))

