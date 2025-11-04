import { supabase } from './client'
import { logger } from '@utils/logger'
import { errorHandler } from '@services/api/error.handler'

export class DatabaseService {
  async getProfile(userId: string) {
    logger.info('Fetching user profile', { userId })

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        logger.error('Failed to fetch profile', error)
        throw error
      }

      logger.info('Profile fetched successfully', { userId })
      return data
    } catch (error) {
      return errorHandler.handle(error, 'DatabaseService.getProfile')
    }
  }

  async updateProfile(userId: string, updates: any) {
    logger.info('Updating user profile', { userId, updates })

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', userId)
        .select()
        .single()

      if (error) {
        logger.error('Failed to update profile', error)
        throw error
      }

      logger.info('Profile updated successfully', { userId })
      return data
    } catch (error) {
      return errorHandler.handle(error, 'DatabaseService.updateProfile')
    }
  }

  async query<T>(
    table: string,
    options: {
      select?: string
      filters?: Record<string, any>
      order?: { column: string; ascending?: boolean }
      limit?: number
    } = {}
  ): Promise<T[] | null> {
    logger.info('Database query', { table, options })

    try {
      let query = supabase.from(table).select(options.select || '*')

      if (options.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          query = query.eq(key, value)
        })
      }

      if (options.order) {
        query = query.order(options.order.column, { ascending: options.order.ascending ?? true })
      }

      if (options.limit) {
        query = query.limit(options.limit)
      }

      const { data, error } = await query

      if (error) {
        logger.error('Database query failed', error)
        throw error
      }

      logger.info('Database query successful', { table, count: data?.length })
      return data as T[]
    } catch (error) {
      errorHandler.handle(error, 'DatabaseService.query')
      return null
    }
  }

  async insert<T>(table: string, record: any): Promise<T | null> {
    logger.info('Database insert', { table })

    try {
      const { data, error } = await supabase.from(table).insert(record).select().single()

      if (error) {
        logger.error('Database insert failed', error)
        throw error
      }

      logger.info('Database insert successful', { table })
      return data as T
    } catch (error) {
      errorHandler.handle(error, 'DatabaseService.insert')
      return null
    }
  }

  async update<T>(table: string, id: string, updates: any): Promise<T | null> {
    logger.info('Database update', { table, id, updates })

    try {
      const { data, error } = await supabase
        .from(table)
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        logger.error('Database update failed', error)
        throw error
      }

      logger.info('Database update successful', { table, id })
      return data as T
    } catch (error) {
      errorHandler.handle(error, 'DatabaseService.update')
      return null
    }
  }

  async delete(table: string, id: string): Promise<boolean> {
    logger.info('Database delete', { table, id })

    try {
      const { error } = await supabase.from(table).delete().eq('id', id)

      if (error) {
        logger.error('Database delete failed', error)
        throw error
      }

      logger.info('Database delete successful', { table, id })
      return true
    } catch (error) {
      errorHandler.handle(error, 'DatabaseService.delete')
      return false
    }
  }
}

export const databaseService = new DatabaseService()


