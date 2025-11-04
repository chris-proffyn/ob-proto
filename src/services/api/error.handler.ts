import { logger } from '@utils/logger'
import toast from 'react-hot-toast'

export enum ErrorType {
  NETWORK = 'NETWORK_ERROR',
  AUTHENTICATION = 'AUTHENTICATION_ERROR',
  AUTHORIZATION = 'AUTHORIZATION_ERROR',
  VALIDATION = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND_ERROR',
  SERVER = 'SERVER_ERROR',
  UNKNOWN = 'UNKNOWN_ERROR',
}

export interface AppError {
  type: ErrorType
  message: string
  details?: any
  statusCode?: number
  originalError?: Error
}

class ErrorHandler {
  private getUserFriendlyMessage(errorType: ErrorType): string {
    const messages: Record<ErrorType, string> = {
      [ErrorType.NETWORK]: 'Unable to connect. Please check your internet connection.',
      [ErrorType.AUTHENTICATION]: 'Your session has expired. Please log in again.',
      [ErrorType.AUTHORIZATION]: 'You do not have permission to perform this action.',
      [ErrorType.VALIDATION]: 'Please check your input and try again.',
      [ErrorType.NOT_FOUND]: 'The requested resource was not found.',
      [ErrorType.SERVER]: 'Something went wrong on our end. Please try again later.',
      [ErrorType.UNKNOWN]: 'An unexpected error occurred. Please try again.',
    }

    return messages[errorType]
  }

  handle(error: any, context?: string): AppError {
    logger.error(`Error in ${context || 'application'}`, error)

    if (!navigator.onLine || error?.message === 'Network Error') {
      const appError: AppError = {
        type: ErrorType.NETWORK,
        message: this.getUserFriendlyMessage(ErrorType.NETWORK),
        originalError: error,
      }
      toast.error(appError.message)
      return appError
    }

    if (error?.response) {
      const statusCode = error.response.status
      let errorType: ErrorType

      switch (statusCode) {
        case 401:
          errorType = ErrorType.AUTHENTICATION
          break
        case 403:
          errorType = ErrorType.AUTHORIZATION
          break
        case 404:
          errorType = ErrorType.NOT_FOUND
          break
        case 422:
          errorType = ErrorType.VALIDATION
          break
        case 500:
        case 502:
        case 503:
          errorType = ErrorType.SERVER
          break
        default:
          errorType = ErrorType.UNKNOWN
      }

      const appError: AppError = {
        type: errorType,
        message: error.response.data?.message || this.getUserFriendlyMessage(errorType),
        statusCode,
        details: error.response.data,
        originalError: error,
      }

      toast.error(appError.message)
      return appError
    }

    if (error?.code) {
      const errorType = error.code.includes('auth') ? ErrorType.AUTHENTICATION : ErrorType.SERVER

      const appError: AppError = {
        type: errorType,
        message: error.message || this.getUserFriendlyMessage(errorType),
        details: error,
        originalError: error,
      }

      toast.error(appError.message)
      return appError
    }

    if (error?.name === 'ZodError') {
      const appError: AppError = {
        type: ErrorType.VALIDATION,
        message: 'Please check your input',
        details: error.errors,
        originalError: error,
      }

      toast.error(appError.message)
      return appError
    }

    const appError: AppError = {
      type: ErrorType.UNKNOWN,
      message: this.getUserFriendlyMessage(ErrorType.UNKNOWN),
      originalError: error,
    }

    toast.error(appError.message)
    return appError
  }

  async handleAsync<T>(fn: () => Promise<T>, context?: string): Promise<T | null> {
    try {
      return await fn()
    } catch (error) {
      this.handle(error, context)
      return null
    }
  }
}

export const errorHandler = new ErrorHandler()


