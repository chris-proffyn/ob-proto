# Cursor AI Project Setup Guide
## React + Supabase Responsive Web Application

---

## Project Overview

Create a production-ready, responsive React web application with Supabase backend integration. This application prioritizes:
- **Extensive debugging and logging** at all levels
- **Componentized architecture** with clear separation of concerns
- **Comprehensive error handling** with user-friendly feedback
- **Mobile-first responsive design**
- **Type safety** with TypeScript
- **Robust authentication** and secure data storage

---

## 1. Initial Project Setup

### 1.1 Create React Application with Vite + TypeScript

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
```

### 1.2 Install Core Dependencies

```bash
# Supabase client
npm install @supabase/supabase-js

# Routing
npm install react-router-dom
npm install -D @types/react-router-dom

# State management
npm install zustand

# HTTP client with better error handling
npm install axios

# Form handling with validation
npm install react-hook-form zod @hookform/resolvers

# UI and styling (Tailwind CSS)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Icons
npm install lucide-react

# Date handling
npm install date-fns

# Toast notifications for errors and success messages
npm install react-hot-toast

# Development and debugging tools
npm install -D @types/node
```

### 1.3 Additional Development Tools

```bash
# ESLint for code quality
npm install -D eslint-plugin-react-hooks eslint-plugin-jsx-a11y

# Debugging and logging
npm install loglevel

# Error boundary
npm install react-error-boundary
```

---

## 2. Project Structure

Create the following directory structure:

```
src/
├── components/
│   ├── common/                 # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorMessage.tsx
│   ├── layout/                 # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   └── MainLayout.tsx
│   └── features/               # Feature-specific components
│       ├── auth/
│       │   ├── LoginForm.tsx
│       │   ├── SignupForm.tsx
│       │   ├── PasswordReset.tsx
│       │   └── ProtectedRoute.tsx
│       └── profile/
│           ├── ProfileCard.tsx
│           └── ProfileEditor.tsx
├── pages/                      # Page components
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── SignupPage.tsx
│   ├── DashboardPage.tsx
│   ├── ProfilePage.tsx
│   └── NotFoundPage.tsx
├── hooks/                      # Custom React hooks
│   ├── useAuth.ts
│   ├── useSupabase.ts
│   ├── useDebounce.ts
│   └── useMediaQuery.ts
├── services/                   # API and external services
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── auth.service.ts
│   │   ├── storage.service.ts
│   │   └── database.service.ts
│   └── api/
│       ├── api.client.ts
│       └── error.handler.ts
├── store/                      # State management
│   ├── authStore.ts
│   ├── userStore.ts
│   └── appStore.ts
├── utils/                      # Utility functions
│   ├── logger.ts
│   ├── validators.ts
│   ├── formatters.ts
│   └── constants.ts
├── types/                      # TypeScript definitions
│   ├── database.types.ts
│   ├── auth.types.ts
│   └── common.types.ts
├── styles/                     # Global styles
│   ├── index.css
│   └── responsive.css
├── config/                     # Configuration
│   ├── supabase.config.ts
│   └── app.config.ts
├── App.tsx
├── main.tsx
└── vite-env.d.ts
```

---

## 3. Configuration Files

### 3.1 Tailwind CSS Configuration (`tailwind.config.js`)

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '320px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
        },
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
        },
      },
    },
  },
  plugins: [],
}
```

### 3.2 TypeScript Configuration (`tsconfig.json`)

Update to include path aliases:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@pages/*": ["./src/pages/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@services/*": ["./src/services/*"],
      "@store/*": ["./src/store/*"],
      "@utils/*": ["./src/utils/*"],
      "@types/*": ["./src/types/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 3.3 Vite Configuration (`vite.config.ts`)

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@services': path.resolve(__dirname, './src/services'),
      '@store': path.resolve(__dirname, './src/store'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
    },
  },
  server: {
    port: 3000,
  },
})
```

### 3.4 Environment Variables (`.env.example`)

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Application Configuration
VITE_APP_NAME=My App
VITE_APP_ENV=development

# Logging
VITE_LOG_LEVEL=debug
```

---

## 4. Core Implementation Files

### 4.1 Logger Utility (`src/utils/logger.ts`)

**CRITICAL: Implement comprehensive logging throughout the application**

```typescript
import log from 'loglevel';

// Configure log level based on environment
const LOG_LEVEL = import.meta.env.VITE_LOG_LEVEL || 'info';
log.setLevel(LOG_LEVEL as log.LogLevelDesc);

interface LogContext {
  component?: string;
  action?: string;
  userId?: string;
  [key: string]: any;
}

class Logger {
  private formatMessage(level: string, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? JSON.stringify(context) : '';
    return `[${timestamp}] [${level}] ${message} ${contextStr}`;
  }

  debug(message: string, context?: LogContext) {
    log.debug(this.formatMessage('DEBUG', message, context));
  }

  info(message: string, context?: LogContext) {
    log.info(this.formatMessage('INFO', message, context));
  }

  warn(message: string, context?: LogContext) {
    log.warn(this.formatMessage('WARN', message, context));
  }

  error(message: string, error?: Error, context?: LogContext) {
    const errorContext = {
      ...context,
      error: error?.message,
      stack: error?.stack,
    };
    log.error(this.formatMessage('ERROR', message, errorContext));
  }

  // Log component lifecycle
  componentMounted(componentName: string) {
    this.debug(`Component mounted: ${componentName}`, { component: componentName });
  }

  componentUnmounted(componentName: string) {
    this.debug(`Component unmounted: ${componentName}`, { component: componentName });
  }

  // Log API calls
  apiRequest(endpoint: string, method: string, data?: any) {
    this.info(`API Request: ${method} ${endpoint}`, { endpoint, method, data });
  }

  apiResponse(endpoint: string, status: number, data?: any) {
    this.info(`API Response: ${endpoint} - ${status}`, { endpoint, status, data });
  }

  apiError(endpoint: string, error: Error) {
    this.error(`API Error: ${endpoint}`, error, { endpoint });
  }

  // Log user actions
  userAction(action: string, details?: any) {
    this.info(`User Action: ${action}`, { action, details });
  }
}

export const logger = new Logger();
```

### 4.2 Error Handler (`src/services/api/error.handler.ts`)

**CRITICAL: Comprehensive error handling with user-friendly messages**

```typescript
import { logger } from '@utils/logger';
import toast from 'react-hot-toast';

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
  type: ErrorType;
  message: string;
  details?: any;
  statusCode?: number;
  originalError?: Error;
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
    };

    return messages[errorType];
  }

  handle(error: any, context?: string): AppError {
    logger.error(`Error in ${context || 'application'}`, error);

    // Handle network errors
    if (!navigator.onLine || error.message === 'Network Error') {
      const appError: AppError = {
        type: ErrorType.NETWORK,
        message: this.getUserFriendlyMessage(ErrorType.NETWORK),
        originalError: error,
      };
      toast.error(appError.message);
      return appError;
    }

    // Handle Axios/HTTP errors
    if (error.response) {
      const statusCode = error.response.status;
      let errorType: ErrorType;

      switch (statusCode) {
        case 401:
          errorType = ErrorType.AUTHENTICATION;
          break;
        case 403:
          errorType = ErrorType.AUTHORIZATION;
          break;
        case 404:
          errorType = ErrorType.NOT_FOUND;
          break;
        case 422:
          errorType = ErrorType.VALIDATION;
          break;
        case 500:
        case 502:
        case 503:
          errorType = ErrorType.SERVER;
          break;
        default:
          errorType = ErrorType.UNKNOWN;
      }

      const appError: AppError = {
        type: errorType,
        message: error.response.data?.message || this.getUserFriendlyMessage(errorType),
        statusCode,
        details: error.response.data,
        originalError: error,
      };

      toast.error(appError.message);
      return appError;
    }

    // Handle Supabase errors
    if (error.code) {
      const errorType = error.code.includes('auth')
        ? ErrorType.AUTHENTICATION
        : ErrorType.SERVER;

      const appError: AppError = {
        type: errorType,
        message: error.message || this.getUserFriendlyMessage(errorType),
        details: error,
        originalError: error,
      };

      toast.error(appError.message);
      return appError;
    }

    // Handle validation errors (Zod, etc.)
    if (error.name === 'ZodError') {
      const appError: AppError = {
        type: ErrorType.VALIDATION,
        message: 'Please check your input',
        details: error.errors,
        originalError: error,
      };

      toast.error(appError.message);
      return appError;
    }

    // Default unknown error
    const appError: AppError = {
      type: ErrorType.UNKNOWN,
      message: this.getUserFriendlyMessage(ErrorType.UNKNOWN),
      originalError: error,
    };

    toast.error(appError.message);
    return appError;
  }

  // Handle async functions with automatic error handling
  async handleAsync<T>(
    fn: () => Promise<T>,
    context?: string
  ): Promise<T | null> {
    try {
      return await fn();
    } catch (error) {
      this.handle(error, context);
      return null;
    }
  }
}

export const errorHandler = new ErrorHandler();
```

### 4.3 Supabase Client (`src/services/supabase/client.ts`)

```typescript
import { createClient } from '@supabase/supabase-js';
import { logger } from '@utils/logger';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  logger.error('Missing Supabase configuration', new Error('Environment variables not set'));
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

logger.info('Supabase client initialized', { url: supabaseUrl });
```

### 4.4 Auth Service (`src/services/supabase/auth.service.ts`)

```typescript
import { supabase } from './client';
import { logger } from '@utils/logger';
import { errorHandler } from '@services/api/error.handler';
import toast from 'react-hot-toast';

export class AuthService {
  async signUp(email: string, password: string, metadata?: any) {
    logger.info('Attempting user signup', { email });

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });

      if (error) {
        logger.error('Signup failed', error);
        throw error;
      }

      logger.info('Signup successful', { userId: data.user?.id });
      toast.success('Account created successfully!');
      return data;
    } catch (error) {
      return errorHandler.handle(error, 'AuthService.signUp');
    }
  }

  async signIn(email: string, password: string) {
    logger.info('Attempting user signin', { email });

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        logger.error('Signin failed', error);
        throw error;
      }

      logger.info('Signin successful', { userId: data.user?.id });
      toast.success('Welcome back!');
      return data;
    } catch (error) {
      return errorHandler.handle(error, 'AuthService.signIn');
    }
  }

  async signOut() {
    logger.info('Attempting user signout');

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        logger.error('Signout failed', error);
        throw error;
      }

      logger.info('Signout successful');
      toast.success('Signed out successfully');
      return true;
    } catch (error) {
      errorHandler.handle(error, 'AuthService.signOut');
      return false;
    }
  }

  async resetPassword(email: string) {
    logger.info('Attempting password reset', { email });

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        logger.error('Password reset failed', error);
        throw error;
      }

      logger.info('Password reset email sent', { email });
      toast.success('Password reset email sent!');
      return true;
    } catch (error) {
      errorHandler.handle(error, 'AuthService.resetPassword');
      return false;
    }
  }

  async updatePassword(newPassword: string) {
    logger.info('Attempting password update');

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        logger.error('Password update failed', error);
        throw error;
      }

      logger.info('Password updated successfully');
      toast.success('Password updated successfully!');
      return true;
    } catch (error) {
      errorHandler.handle(error, 'AuthService.updatePassword');
      return false;
    }
  }

  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        logger.error('Failed to get current user', error);
        throw error;
      }

      logger.debug('Current user retrieved', { userId: user?.id });
      return user;
    } catch (error) {
      errorHandler.handle(error, 'AuthService.getCurrentUser');
      return null;
    }
  }

  onAuthStateChange(callback: (event: string, session: any) => void) {
    logger.info('Setting up auth state listener');

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        logger.info('Auth state changed', { event, userId: session?.user?.id });
        callback(event, session);
      }
    );

    return subscription;
  }
}

export const authService = new AuthService();
```

### 4.5 Storage Service (`src/services/supabase/storage.service.ts`)

```typescript
import { supabase } from './client';
import { logger } from '@utils/logger';
import { errorHandler } from '@services/api/error.handler';
import toast from 'react-hot-toast';

export class StorageService {
  private bucket: string;

  constructor(bucket: string = 'public-files') {
    this.bucket = bucket;
    logger.info('Storage service initialized', { bucket });
  }

  async uploadFile(path: string, file: File, onProgress?: (progress: number) => void) {
    logger.info('Uploading file', { path, fileName: file.name, size: file.size });

    try {
      const { data, error } = await supabase.storage
        .from(this.bucket)
        .upload(path, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        logger.error('File upload failed', error, { path });
        throw error;
      }

      logger.info('File uploaded successfully', { path, data });
      toast.success('File uploaded successfully!');
      return data;
    } catch (error) {
      return errorHandler.handle(error, 'StorageService.uploadFile');
    }
  }

  async downloadFile(path: string) {
    logger.info('Downloading file', { path });

    try {
      const { data, error } = await supabase.storage
        .from(this.bucket)
        .download(path);

      if (error) {
        logger.error('File download failed', error, { path });
        throw error;
      }

      logger.info('File downloaded successfully', { path });
      return data;
    } catch (error) {
      return errorHandler.handle(error, 'StorageService.downloadFile');
    }
  }

  async deleteFile(path: string) {
    logger.info('Deleting file', { path });

    try {
      const { error } = await supabase.storage
        .from(this.bucket)
        .remove([path]);

      if (error) {
        logger.error('File deletion failed', error, { path });
        throw error;
      }

      logger.info('File deleted successfully', { path });
      toast.success('File deleted successfully!');
      return true;
    } catch (error) {
      errorHandler.handle(error, 'StorageService.deleteFile');
      return false;
    }
  }

  getPublicUrl(path: string): string {
    const { data } = supabase.storage
      .from(this.bucket)
      .getPublicUrl(path);

    logger.debug('Generated public URL', { path, url: data.publicUrl });
    return data.publicUrl;
  }

  async listFiles(folder: string = '') {
    logger.info('Listing files', { folder });

    try {
      const { data, error } = await supabase.storage
        .from(this.bucket)
        .list(folder);

      if (error) {
        logger.error('Failed to list files', error, { folder });
        throw error;
      }

      logger.info('Files listed successfully', { folder, count: data.length });
      return data;
    } catch (error) {
      errorHandler.handle(error, 'StorageService.listFiles');
      return [];
    }
  }
}

export const storageService = new StorageService();
```

### 4.6 Auth Store with Zustand (`src/store/authStore.ts`)

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { logger } from '@utils/logger';
import type { User, Session } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      isAuthenticated: false,
      isLoading: true,
      error: null,

      setUser: (user) => {
        logger.debug('Setting user in store', { userId: user?.id });
        set({ user, isAuthenticated: !!user });
      },

      setSession: (session) => {
        logger.debug('Setting session in store', { sessionId: session?.access_token?.substring(0, 10) });
        set({ session });
      },

      setLoading: (isLoading) => {
        set({ isLoading });
      },

      setError: (error) => {
        logger.warn('Auth error set', { error });
        set({ error });
      },

      reset: () => {
        logger.info('Resetting auth store');
        set({
          user: null,
          session: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        session: state.session,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
```

### 4.7 Auth Hook (`src/hooks/useAuth.ts`)

```typescript
import { useEffect } from 'react';
import { useAuthStore } from '@store/authStore';
import { authService } from '@services/supabase/auth.service';
import { logger } from '@utils/logger';

export function useAuth() {
  const { user, session, isAuthenticated, isLoading, setUser, setSession, setLoading, reset } =
    useAuthStore();

  useEffect(() => {
    logger.debug('useAuth hook initialized');

    // Get initial session
    authService.getCurrentUser().then((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Listen for auth changes
    const subscription = authService.onAuthStateChange((event, session) => {
      logger.info('Auth state change detected in hook', { event });
      
      setSession(session);
      setUser(session?.user ?? null);
      
      if (event === 'SIGNED_OUT') {
        reset();
      }
    });

    return () => {
      logger.debug('useAuth hook cleanup');
      subscription.unsubscribe();
    };
  }, [setUser, setSession, setLoading, reset]);

  return {
    user,
    session,
    isAuthenticated,
    isLoading,
    signIn: authService.signIn.bind(authService),
    signUp: authService.signUp.bind(authService),
    signOut: authService.signOut.bind(authService),
    resetPassword: authService.resetPassword.bind(authService),
    updatePassword: authService.updatePassword.bind(authService),
  };
}
```

### 4.8 Media Query Hook (`src/hooks/useMediaQuery.ts`)

**For responsive design**

```typescript
import { useState, useEffect } from 'react';
import { logger } from '@utils/logger';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    logger.debug('Media query initialized', { query, matches: media.matches });
    
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = (e: MediaQueryListEvent) => {
      logger.debug('Media query changed', { query, matches: e.matches });
      setMatches(e.matches);
    };

    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

// Predefined breakpoint hooks
export function useIsMobile() {
  return useMediaQuery('(max-width: 767px)');
}

export function useIsTablet() {
  return useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
}

export function useIsDesktop() {
  return useMediaQuery('(min-width: 1024px)');
}
```

### 4.9 Error Boundary Component (`src/components/common/ErrorBoundary.tsx`)

```typescript
import { Component, ErrorInfo, ReactNode } from 'react';
import { logger } from '@utils/logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error('Error caught by boundary', error, {
      componentStack: errorInfo.componentStack,
    });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="mt-4 text-xl font-semibold text-center text-gray-900">
              Something went wrong
            </h1>
            <p className="mt-2 text-sm text-center text-gray-600">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            {import.meta.env.DEV && this.state.error && (
              <div className="mt-4 p-3 bg-gray-100 rounded text-xs text-gray-700 overflow-auto">
                <pre>{this.state.error.message}</pre>
              </div>
            )}
            <button
              onClick={() => window.location.reload()}
              className="mt-6 w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### 4.10 Loading Spinner Component (`src/components/common/LoadingSpinner.tsx`)

```typescript
import { logger } from '@utils/logger';
import { useEffect } from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

export function LoadingSpinner({ 
  size = 'md', 
  text = 'Loading...', 
  fullScreen = false 
}: LoadingSpinnerProps) {
  useEffect(() => {
    logger.debug('LoadingSpinner rendered', { size, text, fullScreen });
  }, [size, text, fullScreen]);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`${sizeClasses[size]} border-4 border-gray-200 border-t-primary-600 rounded-full animate-spin`}
        role="status"
        aria-label="Loading"
      />
      {text && (
        <p className="text-sm text-gray-600 animate-pulse">{text}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
}
```

### 4.11 Error Message Component (`src/components/common/ErrorMessage.tsx`)

```typescript
import { AlertCircle } from 'lucide-react';
import { logger } from '@utils/logger';
import { useEffect } from 'react';

interface ErrorMessageProps {
  message: string;
  title?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorMessage({ 
  message, 
  title = 'Error', 
  onRetry,
  className = '' 
}: ErrorMessageProps) {
  useEffect(() => {
    logger.debug('ErrorMessage rendered', { message, title });
  }, [message, title]);

  return (
    <div className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-red-900">{title}</h3>
          <p className="mt-1 text-sm text-red-700">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
```

### 4.12 Button Component (`src/components/common/Button.tsx`)

```typescript
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { logger } from '@utils/logger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      disabled,
      onClick,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantClasses = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 active:bg-primary-800',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 active:bg-gray-400',
      outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:bg-red-800',
    };

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    const widthClass = fullWidth ? 'w-full' : '';

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      logger.userAction('Button clicked', { variant, size });
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
        disabled={disabled || isLoading}
        onClick={handleClick}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### 4.13 Input Component (`src/components/common/Input.tsx`)

```typescript
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
            error
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
          } ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
```

### 4.14 Protected Route Component (`src/components/features/auth/ProtectedRoute.tsx`)

```typescript
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { LoadingSpinner } from '@components/common/LoadingSpinner';
import { logger } from '@utils/logger';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    logger.debug('ProtectedRoute check', { 
      isAuthenticated, 
      isLoading, 
      path: location.pathname 
    });
  }, [isAuthenticated, isLoading, location]);

  if (isLoading) {
    return <LoadingSpinner fullScreen text="Checking authentication..." />;
  }

  if (!isAuthenticated) {
    logger.warn('Unauthorized access attempt', { path: location.pathname });
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
```

### 4.15 Main Layout Component (`src/components/layout/MainLayout.tsx`)

```typescript
import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { logger } from '@utils/logger';
import { useEffect } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  useEffect(() => {
    logger.componentMounted('MainLayout');
    return () => logger.componentUnmounted('MainLayout');
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}
```

### 4.16 Header Component (`src/components/layout/Header.tsx`)

```typescript
import { useAuth } from '@hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@components/common/Button';
import { logger } from '@utils/logger';

export function Header() {
  const { isAuthenticated, user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    logger.userAction('Sign out clicked');
    await signOut();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="text-xl font-bold text-primary-600 hover:text-primary-700 transition-colors"
            >
              MyApp
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="text-gray-700 hover:text-primary-600 transition-colors px-3 py-2"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => navigate('/profile')}
                  className="text-gray-700 hover:text-primary-600 transition-colors px-3 py-2 flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  {user?.email}
                </button>
                <Button onClick={handleSignOut} variant="outline" size="sm">
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => navigate('/login')}
                  variant="outline"
                  size="sm"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => navigate('/signup')}
                  variant="primary"
                  size="sm"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {isAuthenticated ? (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    navigate('/dashboard');
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    navigate('/profile');
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Button
                  onClick={() => {
                    navigate('/login');
                    setIsMobileMenuOpen(false);
                  }}
                  variant="outline"
                  fullWidth
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => {
                    navigate('/signup');
                    setIsMobileMenuOpen(false);
                  }}
                  variant="primary"
                  fullWidth
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
```

### 4.17 Login Form Component (`src/components/features/auth/LoginForm.tsx`)

```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@hooks/useAuth';
import { Input } from '@components/common/Input';
import { Button } from '@components/common/Button';
import { logger } from '@utils/logger';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    logger.userAction('Login form submitted', { email: data.email });
    setIsLoading(true);

    try {
      const result = await signIn(data.email, data.password);
      
      if (result) {
        logger.info('Login successful, redirecting to dashboard');
        navigate('/dashboard');
      }
    } catch (error) {
      logger.error('Login form error', error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register('email')}
      />

      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register('password')}
      />

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <span className="ml-2 text-sm text-gray-600">Remember me</span>
        </label>

        <button
          type="button"
          onClick={() => navigate('/forgot-password')}
          className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
        >
          Forgot password?
        </button>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        isLoading={isLoading}
      >
        Sign In
      </Button>

      <p className="text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={() => navigate('/signup')}
          className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
        >
          Sign up
        </button>
      </p>
    </form>
  );
}
```

### 4.18 App Router (`src/App.tsx`)

```typescript
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ErrorBoundary } from '@components/common/ErrorBoundary';
import { ProtectedRoute } from '@components/features/auth/ProtectedRoute';
import { MainLayout } from '@components/layout/MainLayout';
import { logger } from '@utils/logger';
import { useEffect } from 'react';

// Pages
import HomePage from '@pages/HomePage';
import LoginPage from '@pages/LoginPage';
import SignupPage from '@pages/SignupPage';
import DashboardPage from '@pages/DashboardPage';
import ProfilePage from '@pages/ProfilePage';
import NotFoundPage from '@pages/NotFoundPage';

function App() {
  useEffect(() => {
    logger.info('App initialized', { 
      env: import.meta.env.MODE,
      timestamp: new Date().toISOString() 
    });
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Fallback routes */}
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </MainLayout>
        
        {/* Global toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#22c55e',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
```

### 4.19 Global Styles (`src/styles/index.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom scrollbar */
@layer utilities {
  .scrollbar-thin::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  .scrollbar-thin::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  .scrollbar-thin::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
}

/* Responsive typography */
@layer base {
  html {
    font-size: 16px;
  }

  @media (max-width: 640px) {
    html {
      font-size: 14px;
    }
  }

  body {
    @apply text-gray-900 antialiased;
  }

  /* Ensure touch targets are at least 44x44px on mobile */
  @media (max-width: 768px) {
    button, a, input[type="checkbox"], input[type="radio"] {
      min-height: 44px;
      min-width: 44px;
    }
  }
}

/* Loading states */
@layer components {
  .skeleton {
    @apply animate-pulse bg-gray-200 rounded;
  }

  .fade-in {
    animation: fadeIn 0.3s ease-in;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

/* Focus visible for accessibility */
@layer utilities {
  .focus-visible-ring {
    @apply focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2;
  }
}
```

---

## 5. Implementation Checklist

### Phase 1: Foundation
- [ ] Initialize project with Vite + TypeScript + React
- [ ] Install all dependencies
- [ ] Configure Tailwind CSS
- [ ] Set up path aliases in tsconfig.json and vite.config.ts
- [ ] Create directory structure
- [ ] Set up environment variables (.env files)
- [ ] Configure Supabase project and get credentials

### Phase 2: Core Services
- [ ] Implement logger utility with comprehensive logging
- [ ] Implement error handler with user-friendly messages
- [ ] Set up Supabase client
- [ ] Implement auth service with all methods
- [ ] Implement storage service with upload/download
- [ ] Create database service for CRUD operations

### Phase 3: State Management
- [ ] Set up Zustand stores (auth, user, app)
- [ ] Implement auth hook with session management
- [ ] Create custom hooks (useMediaQuery, useDebounce, etc.)

### Phase 4: UI Components
- [ ] Build common components (Button, Input, LoadingSpinner, ErrorMessage)
- [ ] Build layout components (Header, Footer, MainLayout)
- [ ] Implement Error Boundary
- [ ] Create auth components (LoginForm, SignupForm, ProtectedRoute)

### Phase 5: Pages
- [ ] Create all page components
- [ ] Implement routing in App.tsx
- [ ] Add protected routes
- [ ] Implement 404 page

### Phase 6: Responsive Design
- [ ] Add mobile breakpoints and media queries
- [ ] Test on mobile devices (iOS and Android)
- [ ] Ensure touch targets are minimum 44x44px
- [ ] Test responsive navigation and layouts

### Phase 7: Error Handling & Debugging
- [ ] Add try-catch blocks to all async operations
- [ ] Implement error boundaries
- [ ] Add logging to all critical functions
- [ ] Test error scenarios (network failures, auth errors, etc.)
- [ ] Implement toast notifications for user feedback

### Phase 8: Testing & Polish
- [ ] Test all authentication flows
- [ ] Test responsive design on multiple devices
- [ ] Verify all error messages are user-friendly
- [ ] Check accessibility (keyboard navigation, screen readers)
- [ ] Performance optimization (lazy loading, code splitting)

---

## 6. Cursor AI Prompts for Implementation

Use these prompts with Cursor AI to implement the project:

### Initial Setup Prompt
```
Create a new React application using Vite with TypeScript. Set up Tailwind CSS with mobile-first responsive design. Configure path aliases for @components, @services, @hooks, @store, @utils, @types, and @pages. Install all necessary dependencies including @supabase/supabase-js, react-router-dom, zustand, react-hook-form, zod, axios, loglevel, react-hot-toast, and lucide-react.
```

### Logger Implementation Prompt
```
Create a comprehensive logging utility in src/utils/logger.ts that:
- Uses loglevel library
- Has methods for debug, info, warn, and error levels
- Includes context objects for structured logging
- Has specific methods for logging component lifecycle, API calls, and user actions
- Formats messages with timestamps and context
- Configures log level from environment variable
```

### Error Handler Implementation Prompt
```
Create a centralized error handling system in src/services/api/error.handler.ts that:
- Handles network errors, authentication errors, validation errors, and server errors
- Converts technical errors into user-friendly messages
- Integrates with react-hot-toast for displaying errors
- Logs all errors using the logger utility
- Exports an errorHandler singleton with handle() and handleAsync() methods
- Includes TypeScript types for error categories
```

### Supabase Integration Prompt
```
Set up Supabase integration with:
1. Client configuration in src/services/supabase/client.ts
2. Auth service with methods for signUp, signIn, signOut, resetPassword, updatePassword, getCurrentUser, and onAuthStateChange
3. Storage service with methods for uploadFile, downloadFile, deleteFile, getPublicUrl, and listFiles
4. Comprehensive error handling and logging for all operations
5. Toast notifications for success and error states
```

### Component Creation Prompt
```
Create a reusable [Component Name] component that:
- Is fully typed with TypeScript
- Includes proper error handling
- Logs lifecycle events using the logger utility
- Is responsive and works on mobile devices
- Follows accessibility best practices
- Uses Tailwind CSS for styling
- Includes loading and error states where applicable
```

### Auth Flow Implementation Prompt
```
Implement complete authentication flow with:
- Login form with validation using react-hook-form and zod
- Signup form with password confirmation
- Protected routes using ProtectedRoute component
- Auth state management with Zustand
- Persistent sessions across page refreshes
- Proper error handling and user feedback
- Mobile-responsive design
```

---

## 7. Critical Requirements

### Logging Requirements
✅ **MUST log:**
- All component mount/unmount events
- All API requests and responses
- All user actions (button clicks, form submissions)
- All authentication events
- All errors with full context
- Performance metrics for slow operations

### Error Handling Requirements
✅ **MUST handle:**
- Network failures (offline mode)
- Authentication errors (expired sessions)
- Validation errors (form inputs)
- Server errors (500, 502, 503)
- Not found errors (404)
- Authorization errors (403)
- Unknown errors with graceful degradation

### Component Requirements
✅ **MUST implement:**
- Loading states for all async operations
- Error states with retry options
- Empty states for lists and data views
- Skeleton loaders for better UX
- Proper TypeScript typing
- Accessibility attributes (ARIA labels, roles)

### Mobile Requirements
✅ **MUST ensure:**
- Touch targets minimum 44x44px
- Responsive navigation (hamburger menu)
- Proper viewport configuration
- Fast loading on mobile networks
- Touch-friendly interactions
- Readable text without zooming

---

## 8. Testing the Setup

### Manual Testing Checklist
- [ ] App loads without errors in browser console
- [ ] Environment variables are properly loaded
- [ ] Supabase connection works
- [ ] User can sign up successfully
- [ ] User can sign in successfully
- [ ] User can sign out successfully
- [ ] Protected routes redirect to login
- [ ] Error messages display correctly
- [ ] Loading states show during async operations
- [ ] App is responsive on mobile devices
- [ ] Navigation works on all screen sizes
- [ ] Forms validate input correctly
- [ ] Toast notifications appear for success/error

### Debug Commands
```bash
# Check for console errors
npm run dev

# Check TypeScript errors
npx tsc --noEmit

# Check ESLint errors
npx eslint src/

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 9. Common Issues and Solutions

### Issue: Module not found errors
**Solution:** Ensure path aliases are configured in both tsconfig.json and vite.config.ts

### Issue: Supabase connection fails
**Solution:** Verify environment variables are set correctly in .env file and prefixed with VITE_

### Issue: Components not logging
**Solution:** Check that LOG_LEVEL is set to 'debug' in environment variables

### Issue: Mobile menu not working
**Solution:** Ensure mobile breakpoints are correct and useState is properly managing menu state

### Issue: Auth state not persisting
**Solution:** Check that Zustand persist middleware is properly configured and localStorage is accessible

### Issue: Forms not submitting
**Solution:** Verify react-hook-form setup and check for validation errors in console

### Issue: Responsive design not working
**Solution:** Ensure Tailwind CSS is properly configured and content paths include all component files

---

## 10. Additional Supabase Configuration

### 10.1 Supabase Database Setup

Create these tables in your Supabase project:

```sql
-- Users profile table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles table
CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile automatically
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

### 10.2 Storage Buckets Setup

Create these storage buckets in Supabase:

1. **avatars** - For user profile pictures
   - Public: Yes
   - File size limit: 2MB
   - Allowed MIME types: image/jpeg, image/png, image/webp

2. **documents** - For user documents
   - Public: No
   - File size limit: 10MB
   - Allowed MIME types: application/pdf, image/*, text/*

### 10.3 Database Service Implementation

Create `src/services/supabase/database.service.ts`:

```typescript
import { supabase } from './client';
import { logger } from '@utils/logger';
import { errorHandler } from '@services/api/error.handler';

export class DatabaseService {
  // Get user profile
  async getProfile(userId: string) {
    logger.info('Fetching user profile', { userId });

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        logger.error('Failed to fetch profile', error);
        throw error;
      }

      logger.info('Profile fetched successfully', { userId });
      return data;
    } catch (error) {
      return errorHandler.handle(error, 'DatabaseService.getProfile');
    }
  }

  // Update user profile
  async updateProfile(userId: string, updates: any) {
    logger.info('Updating user profile', { userId, updates });

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        logger.error('Failed to update profile', error);
        throw error;
      }

      logger.info('Profile updated successfully', { userId });
      return data;
    } catch (error) {
      return errorHandler.handle(error, 'DatabaseService.updateProfile');
    }
  }

  // Generic query method with error handling
  async query<T>(
    table: string,
    options: {
      select?: string;
      filters?: Record<string, any>;
      order?: { column: string; ascending?: boolean };
      limit?: number;
    } = {}
  ): Promise<T[] | null> {
    logger.info('Database query', { table, options });

    try {
      let query = supabase.from(table).select(options.select || '*');

      // Apply filters
      if (options.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }

      // Apply ordering
      if (options.order) {
        query = query.order(options.order.column, {
          ascending: options.order.ascending ?? true,
        });
      }

      // Apply limit
      if (options.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;

      if (error) {
        logger.error('Database query failed', error);
        throw error;
      }

      logger.info('Database query successful', { table, count: data?.length });
      return data as T[];
    } catch (error) {
      errorHandler.handle(error, 'DatabaseService.query');
      return null;
    }
  }

  // Generic insert method
  async insert<T>(table: string, record: any): Promise<T | null> {
    logger.info('Database insert', { table, record });

    try {
      const { data, error } = await supabase
        .from(table)
        .insert(record)
        .select()
        .single();

      if (error) {
        logger.error('Database insert failed', error);
        throw error;
      }

      logger.info('Database insert successful', { table });
      return data as T;
    } catch (error) {
      errorHandler.handle(error, 'DatabaseService.insert');
      return null;
    }
  }

  // Generic update method
  async update<T>(
    table: string,
    id: string,
    updates: any
  ): Promise<T | null> {
    logger.info('Database update', { table, id, updates });

    try {
      const { data, error } = await supabase
        .from(table)
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        logger.error('Database update failed', error);
        throw error;
      }

      logger.info('Database update successful', { table, id });
      return data as T;
    } catch (error) {
      errorHandler.handle(error, 'DatabaseService.update');
      return null;
    }
  }

  // Generic delete method
  async delete(table: string, id: string): Promise<boolean> {
    logger.info('Database delete', { table, id });

    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (error) {
        logger.error('Database delete failed', error);
        throw error;
      }

      logger.info('Database delete successful', { table, id });
      return true;
    } catch (error) {
      errorHandler.handle(error, 'DatabaseService.delete');
      return false;
    }
  }
}

export const databaseService = new DatabaseService();
```

---

## 11. Example Page Implementations

### 11.1 Login Page (`src/pages/LoginPage.tsx`)

```typescript
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '@components/features/auth/LoginForm';
import { useAuth } from '@hooks/useAuth';
import { logger } from '@utils/logger';

export default function LoginPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logger.componentMounted('LoginPage');
    
    if (isAuthenticated) {
      logger.info('User already authenticated, redirecting to dashboard');
      navigate('/dashboard');
    }

    return () => logger.componentUnmounted('LoginPage');
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="mt-2 text-gray-600">Sign in to your account</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
```

### 11.2 Dashboard Page (`src/pages/DashboardPage.tsx`)

```typescript
import { useEffect, useState } from 'react';
import { useAuth } from '@hooks/useAuth';
import { databaseService } from '@services/supabase/database.service';
import { LoadingSpinner } from '@components/common/LoadingSpinner';
import { ErrorMessage } from '@components/common/ErrorMessage';
import { logger } from '@utils/logger';

export default function DashboardPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    logger.componentMounted('DashboardPage');

    const loadProfile = async () => {
      if (!user) return;

      setIsLoading(true);
      setError(null);

      const data = await databaseService.getProfile(user.id);
      
      if (data) {
        setProfile(data);
      } else {
        setError('Failed to load profile');
      }

      setIsLoading(false);
    };

    loadProfile();

    return () => logger.componentUnmounted('DashboardPage');
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Loading your dashboard..." />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        title="Dashboard Error"
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome back, {profile?.full_name || user?.email}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900">Quick Stats</h3>
          <p className="mt-2 text-3xl font-bold text-primary-600">0</p>
          <p className="text-sm text-gray-500">Total Items</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900">Activity</h3>
          <p className="mt-2 text-3xl font-bold text-primary-600">0</p>
          <p className="text-sm text-gray-500">Recent Actions</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900">Status</h3>
          <p className="mt-2 text-lg font-medium text-green-600">Active</p>
          <p className="text-sm text-gray-500">Account Status</p>
        </div>
      </div>
    </div>
  );
}
```

### 11.3 Profile Page (`src/pages/ProfilePage.tsx`)

```typescript
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@hooks/useAuth';
import { databaseService } from '@services/supabase/database.service';
import { storageService } from '@services/supabase/storage.service';
import { Input } from '@components/common/Input';
import { Button } from '@components/common/Button';
import { LoadingSpinner } from '@components/common/LoadingSpinner';
import { ErrorMessage } from '@components/common/ErrorMessage';
import { logger } from '@utils/logger';
import toast from 'react-hot-toast';

const profileSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    logger.componentMounted('ProfilePage');

    const loadProfile = async () => {
      if (!user) return;

      setIsLoading(true);
      setError(null);

      const data = await databaseService.getProfile(user.id);
      
      if (data) {
        setProfile(data);
        setValue('full_name', data.full_name || '');
        setValue('email', data.email || '');
        if (data.avatar_url) {
          setAvatarPreview(data.avatar_url);
        }
      } else {
        setError('Failed to load profile');
      }

      setIsLoading(false);
    };

    loadProfile();

    return () => logger.componentUnmounted('ProfilePage');
  }, [user, setValue]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      logger.userAction('Avatar file selected', { fileName: file.name, size: file.size });
      setAvatarFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    if (!user) return;

    logger.userAction('Profile update submitted', data);
    setIsSaving(true);

    try {
      // Upload avatar if changed
      let avatarUrl = profile?.avatar_url;
      if (avatarFile) {
        const fileName = `${user.id}-${Date.now()}.${avatarFile.name.split('.').pop()}`;
        const uploadResult = await storageService.uploadFile(
          `avatars/${fileName}`,
          avatarFile
        );

        if (uploadResult) {
          avatarUrl = storageService.getPublicUrl(`avatars/${fileName}`);
          logger.info('Avatar uploaded successfully', { avatarUrl });
        }
      }

      // Update profile
      const updates = {
        full_name: data.full_name,
        avatar_url: avatarUrl,
      };

      const result = await databaseService.updateProfile(user.id, updates);

      if (result) {
        setProfile(result);
        toast.success('Profile updated successfully!');
        logger.info('Profile updated successfully');
      }
    } catch (error) {
      logger.error('Profile update failed', error as Error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Loading profile..." />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        title="Profile Error"
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mb-4">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
            <label className="cursor-pointer">
              <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors inline-block">
                Choose Photo
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Form Fields */}
          <Input
            label="Full Name"
            placeholder="John Doe"
            error={errors.full_name?.message}
            {...register('full_name')}
          />

          <Input
            label="Email"
            type="email"
            disabled
            helperText="Email cannot be changed"
            {...register('email')}
          />

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isSaving}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

---

## 12. Performance Optimization Guide

### 12.1 Code Splitting

Implement lazy loading for routes:

```typescript
import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@components/common/LoadingSpinner';

const DashboardPage = lazy(() => import('@pages/DashboardPage'));
const ProfilePage = lazy(() => import('@pages/ProfilePage'));

// In your routes:
<Route
  path="/dashboard"
  element={
    <Suspense fallback={<LoadingSpinner fullScreen />}>
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    </Suspense>
  }
/>
```

### 12.2 Image Optimization

```typescript
// Image component with lazy loading
export function OptimizedImage({ src, alt, ...props }: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      {...props}
    />
  );
}
```

### 12.3 Debouncing for Search

```typescript
// useDebounce hook
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Usage in search component
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearch = useDebounce(searchTerm, 300);

useEffect(() => {
  if (debouncedSearch) {
    // Perform search
    logger.info('Search triggered', { query: debouncedSearch });
  }
}, [debouncedSearch]);
```

---

## 13. Production Deployment Checklist

### Pre-Deployment
- [ ] Remove all console.logs (keep logger.* calls)
- [ ] Set VITE_LOG_LEVEL to 'warn' or 'error' in production
- [ ] Verify all environment variables are set correctly
- [ ] Test build with `npm run build`
- [ ] Check bundle size with `npm run build -- --analyze`
- [ ] Run TypeScript checks: `npx tsc --noEmit`
- [ ] Verify all images are optimized
- [ ] Test on real mobile devices

### Supabase Configuration
- [ ] Enable RLS (Row Level Security) on all tables
- [ ] Set up proper database policies
- [ ] Configure email templates for auth
- [ ] Set up custom SMTP (optional)
- [ ] Configure storage buckets with proper access rules
- [ ] Set up database backups

### Security
- [ ] Never commit .env files
- [ ] Use environment variables for all secrets
- [ ] Enable CORS properly in Supabase
- [ ] Implement rate limiting where needed
- [ ] Add CSP (Content Security Policy) headers
- [ ] Enable HTTPS only

### Performance
- [ ] Enable compression (gzip/brotli)
- [ ] Set proper cache headers
- [ ] Use CDN for static assets
- [ ] Implement service worker for offline support (optional)
- [ ] Monitor Core Web Vitals

---

## 14. Monitoring and Maintenance

### Logging in Production

Set up external logging service (optional):

```typescript
// Add to logger.ts
if (import.meta.env.PROD) {
  // Send critical errors to external service
  const originalError = log.error;
  log.error = function(...args) {
    originalError.apply(log, args);
    // Send to Sentry, LogRocket, etc.
  };
}
```

### Health Check Endpoint

Monitor Supabase connection:

```typescript
export async function healthCheck() {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);
    
    return { status: 'healthy', timestamp: new Date().toISOString() };
  } catch (error) {
    return { status: 'unhealthy', error: error.message };
  }
}
```

---

## 15. Final Notes for Cursor AI

### Best Practices to Follow
1. **Always wrap async operations in try-catch blocks**
2. **Log every significant operation**
3. **Provide user feedback for all actions**
4. **Handle loading and error states**
5. **Use TypeScript for type safety**
6. **Follow mobile-first responsive design**
7. **Test on real devices, not just browser emulation**

### Code Quality Standards
- Use ESLint and Prettier
- Write self-documenting code with clear variable names
- Add comments for complex logic only
- Keep components small and focused
- Avoid prop drilling - use context or state management
- Follow DRY (Don't Repeat Yourself) principle

### When in Doubt
- **Logging**: When unsure, add more logging
- **Error Handling**: Always handle errors gracefully
- **User Feedback**: Keep users informed of what's happening
- **Mobile**: Test every feature on mobile

---

## 16. Quick Start Commands

```bash
# 1. Clone/create project
npm create vite@latest my-app -- --template react-ts
cd my-app

# 2. Install dependencies
npm install @supabase/supabase-js react-router-dom zustand axios react-hook-form zod @hookform/resolvers lucide-react date-fns react-hot-toast loglevel react-error-boundary

# 3. Install dev dependencies
npm install -D tailwindcss postcss autoprefixer @types/node

# 4. Initialize Tailwind
npx tailwindcss init -p

# 5. Create .env file
cp .env.example .env
# Add your Supabase credentials

# 6. Start development server
npm run dev
```

---

## Success Criteria

Your application is properly set up when:
✅ All imports resolve without errors
✅ TypeScript compilation succeeds
✅ Application runs in development mode
✅ Supabase connection works
✅ Authentication flow completes successfully
✅ All errors are caught and logged
✅ User sees appropriate feedback for all actions
✅ Application is fully responsive on mobile devices
✅ Console shows structured debug logs
✅ No unhandled promise rejections

---

**This guide provides everything needed to set up a production-ready React + Supabase application with comprehensive debugging, error handling, and mobile responsiveness. Use this as a reference throughout development and pass sections to Cursor AI as needed for implementation.**
            