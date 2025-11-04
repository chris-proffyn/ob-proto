export const appConfig = {
  name: import.meta.env.VITE_APP_NAME || 'Outbehaving',
  env: import.meta.env.VITE_APP_ENV || 'development',
  logLevel: import.meta.env.VITE_LOG_LEVEL || 'info',
} as const;

