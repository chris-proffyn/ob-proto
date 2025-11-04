import log from 'loglevel'

const LOG_LEVEL = (import.meta.env.VITE_LOG_LEVEL as log.LogLevelDesc) || 'info'
log.setLevel(LOG_LEVEL)

interface LogContext {
  component?: string
  action?: string
  userId?: string
  [key: string]: any
}

class Logger {
  private formatMessage(level: string, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString()
    const contextStr = context ? JSON.stringify(context) : ''
    return `[${timestamp}] [${level}] ${message} ${contextStr}`
  }

  debug(message: string, context?: LogContext) {
    log.debug(this.formatMessage('DEBUG', message, context))
  }

  info(message: string, context?: LogContext) {
    log.info(this.formatMessage('INFO', message, context))
  }

  warn(message: string, context?: LogContext) {
    log.warn(this.formatMessage('WARN', message, context))
  }

  error(message: string, error?: Error, context?: LogContext) {
    const errorContext = {
      ...context,
      error: error?.message,
      stack: error?.stack,
    }
    log.error(this.formatMessage('ERROR', message, errorContext))
  }

  componentMounted(componentName: string) {
    this.debug(`Component mounted: ${componentName}`, { component: componentName })
  }

  componentUnmounted(componentName: string) {
    this.debug(`Component unmounted: ${componentName}`, { component: componentName })
  }

  apiRequest(endpoint: string, method: string, data?: any) {
    this.info(`API Request: ${method} ${endpoint}`, { endpoint, method, data })
  }

  apiResponse(endpoint: string, status: number, data?: any) {
    this.info(`API Response: ${endpoint} - ${status}`, { endpoint, status, data })
  }

  apiError(endpoint: string, error: Error) {
    this.error(`API Error: ${endpoint}`, error, { endpoint })
  }

  userAction(action: string, details?: any) {
    this.info(`User Action: ${action}`, { action, details })
  }
}

export const logger = new Logger()


