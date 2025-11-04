# Outbehaving Prototype - Implementation Task List

## Phase 1: Foundation & Core Infrastructure ✅ (Mostly Complete)

### Setup & Configuration
- [x] Initialize Vite React TypeScript project
- [x] Install all dependencies (Supabase, React Router, Zustand, React Hook Form, Zod, etc.)
- [x] Configure Tailwind CSS with mobile-first design and custom colors
- [x] Set up path aliases for all directories
- [x] Create directory structure
- [ ] Create logger utility (`src/utils/logger.ts`)
- [ ] Create error handler (`src/services/api/error.handler.ts`)
- [ ] Set up Supabase client (`src/services/supabase/client.ts`)
- [ ] Create environment variables template

## Phase 2: Database Schema & Types

### Database Setup
- [ ] Create Supabase project and configure
- [ ] Create `users` table (extends auth.users with profile data)
- [ ] Create `accounts` table (mock bank accounts)
- [ ] Create `goals` table (saving pots)
- [ ] Create `articles` table (news content)
- [ ] Create `rewards` table (reward catalogue)
- [ ] Create `user_rewards` table (user reward tracking)
- [ ] Set up Row Level Security (RLS) policies
- [ ] Create database trigger for auto-creating user profiles
- [ ] Seed database with mock data

### TypeScript Types
- [ ] Create `src/types/database.types.ts` (Supabase generated types)
- [ ] Create `src/types/auth.types.ts` (authentication types)
- [ ] Create `src/types/user.types.ts` (user profile types)
- [ ] Create `src/types/goal.types.ts` (goal/saving pot types)
- [ ] Create `src/types/news.types.ts` (article types)
- [ ] Create `src/types/ownership.types.ts` (rewards and engagement types)
- [ ] Create `src/types/common.types.ts` (shared types)

## Phase 3: Core Services & Utilities

### Supabase Services
- [ ] Implement `auth.service.ts` (signUp, signIn, signOut, getCurrentUser)
- [ ] Implement `database.service.ts` (CRUD operations for all tables)
- [ ] Implement `storage.service.ts` (file uploads for avatars)
- [ ] Create service hooks for data fetching

### Utility Functions
- [ ] Create `src/utils/validators.ts` (form validation schemas)
- [ ] Create `src/utils/formatters.ts` (currency, date formatting)
- [ ] Create `src/utils/constants.ts` (app constants)
- [ ] Create `src/hooks/useDebounce.ts`
- [ ] Create `src/hooks/useMediaQuery.ts` (responsive hooks)

## Phase 4: State Management

### Zustand Stores
- [ ] Create `authStore.ts` (authentication state)
- [ ] Create `userStore.ts` (user profile state)
- [ ] Create `goalsStore.ts` (goals/saving pots state)
- [ ] Create `newsStore.ts` (articles state)
- [ ] Create `ownershipStore.ts` (rewards and engagement state)
- [ ] Create `appStore.ts` (global app state)

### Custom Hooks
- [ ] Create `useAuth.ts` hook (authentication logic)
- [ ] Create `useSupabase.ts` hook (Supabase connection)
- [ ] Create `useGoals.ts` hook (goals management)
- [ ] Create `useNews.ts` hook (news/articles)
- [ ] Create `useOwnership.ts` hook (rewards and engagement)

## Phase 5: Common UI Components

### Layout Components
- [ ] Create `Header.tsx` (with logo, avatar, navigation)
- [ ] Create `Footer.tsx` (footer content)
- [ ] Create `MainLayout.tsx` (main app layout wrapper)
- [ ] Create `BottomNavigation.tsx` (fixed bottom nav bar for mobile)

### Common Components
- [ ] Create `Button.tsx` (with variants, sizes, loading states)
- [ ] Create `Input.tsx` (form input with label, error, helper text)
- [ ] Create `Card.tsx` (reusable card component)
- [ ] Create `Modal.tsx` (modal dialog component)
- [ ] Create `LoadingSpinner.tsx` (loading indicators)
- [ ] Create `ErrorMessage.tsx` (error display component)
- [ ] Create `ProgressBar.tsx` (progress indicators for goals)
- [ ] Create `ProgressRing.tsx` (circular progress for goals)

### Feature-Specific Components
- [ ] Create `GoalCard.tsx` (goal display card)
- [ ] Create `ArticleCard.tsx` (news article card)
- [ ] Create `RewardCard.tsx` (reward display card)
- [ ] Create `AccountCard.tsx` (bank account display)

## Phase 6: Authentication & Protected Routes

### Auth Components
- [ ] Create `LoginForm.tsx` (email/password login)
- [ ] Create `SignupForm.tsx` (registration form)
- [ ] Create `PasswordReset.tsx` (password reset flow)
- [ ] Create `ProtectedRoute.tsx` (route guard component)

### Auth Pages
- [ ] Create `LoginPage.tsx`
- [ ] Create `SignupPage.tsx`
- [ ] Create `ForgotPasswordPage.tsx`

## Phase 7: Dashboard Module

### Dashboard Components
- [ ] Create `DashboardHeader.tsx` (greeting with logo and avatar)
- [ ] Create `GoalsSummary.tsx` (top 3 goals display)
- [ ] Create `AccountsSummary.tsx` (total balance + credit score)
- [ ] Create `NewsHighlights.tsx` (latest 2 articles)
- [ ] Create `OwnershipSnapshot.tsx` (tier, progress, rewards preview)

### Dashboard Page
- [ ] Create `DashboardPage.tsx` (main dashboard with all components)
- [ ] Implement data fetching for all dashboard sections
- [ ] Add loading states
- [ ] Add error handling
- [ ] Make fully responsive (mobile-first)

## Phase 8: User Profile Module

### Profile Components
- [ ] Create `ProfileForm.tsx` (personal information form)
- [ ] Create `ConnectedAccountsList.tsx` (mock bank accounts display)
- [ ] Create `InterestsSelector.tsx` (interest chips selector)
- [ ] Create `ChampionsSelector.tsx` (favourite champions picker)
- [ ] Create `AvatarUpload.tsx` (profile picture upload)

### Profile Page
- [ ] Create `ProfilePage.tsx` (main profile page)
- [ ] Implement form validation with React Hook Form + Zod
- [ ] Implement profile update functionality
- [ ] Add avatar upload to Supabase storage
- [ ] Add loading and error states
- [ ] Make fully responsive

## Phase 9: Goals (Micro-Savings) Module

### Goals Components
- [ ] Create `GoalList.tsx` (list of all goals)
- [ ] Create `GoalCard.tsx` (individual goal display)
- [ ] Create `CreateGoalForm.tsx` (create new goal form)
- [ ] Create `GoalDetailView.tsx` (goal detail/edit view)
- [ ] Create `GoalProgressIndicator.tsx` (progress bar/ring)

### Goals Page
- [ ] Create `GoalsPage.tsx` (main goals page)
- [ ] Implement create goal functionality
- [ ] Implement edit goal functionality
- [ ] Implement delete goal functionality
- [ ] Add goal tracking (saved_amount updates)
- [ ] Add form validation
- [ ] Add loading and error states
- [ ] Make fully responsive

## Phase 10: News Module

### News Components
- [ ] Create `NewsTabs.tsx` (Favourites and Popular tabs)
- [ ] Create `ArticleList.tsx` (list of articles)
- [ ] Create `ArticleCard.tsx` (article display card)
- [ ] Create `ArticleDetail.tsx` (article detail view/web overlay)

### News Page
- [ ] Create `NewsPage.tsx` (main news page)
- [ ] Implement tab switching (Favourites/Popular)
- [ ] Implement article filtering by user interests
- [ ] Implement article detail view
- [ ] Add loading states
- [ ] Add error handling
- [ ] Make fully responsive

## Phase 11: Ownership Module

### Ownership Components
- [ ] Create `MembershipLevelDisplay.tsx` (tier visualization)
- [ ] Create `EngagementMetrics.tsx` (referrals, articles read, days active)
- [ ] Create `RewardCatalogue.tsx` (list of available rewards)
- [ ] Create `RewardCard.tsx` (individual reward display)
- [ ] Create `ProgressRing.tsx` (circular progress indicator)

### Ownership Page
- [ ] Create `OwnershipPage.tsx` (main ownership page)
- [ ] Implement engagement metrics calculation
- [ ] Implement membership tier calculation
- [ ] Implement reward redemption logic
- [ ] Add loading states
- [ ] Add error handling
- [ ] Make fully responsive

## Phase 12: Routing & Navigation

### App Router Setup
- [ ] Update `App.tsx` with all routes
- [ ] Set up route protection for authenticated pages
- [ ] Configure redirects (login redirects, 404 handling)
- [ ] Add bottom navigation bar (mobile)
- [ ] Add top navigation (desktop)
- [ ] Implement navigation state management

### Routes to Implement
- [ ] `/` - Home/Landing (redirect to dashboard if authenticated)
- [ ] `/login` - Login page
- [ ] `/signup` - Signup page
- [ ] `/dashboard` - Main dashboard (protected)
- [ ] `/profile` - User profile (protected)
- [ ] `/goals` - Goals management (protected)
- [ ] `/goals/:id` - Goal detail view (protected)
- [ ] `/news` - News feed (protected)
- [ ] `/news/:id` - Article detail (protected)
- [ ] `/ownership` - Ownership and rewards (protected)
- [ ] `/404` - Not found page

## Phase 13: Error Handling & User Feedback

### Error Boundaries
- [ ] Implement `ErrorBoundary.tsx` component
- [ ] Wrap app with error boundary
- [ ] Add error logging

### Toast Notifications
- [ ] Configure react-hot-toast in App.tsx
- [ ] Add success toasts for all actions
- [ ] Add error toasts for failures
- [ ] Add loading toasts for long operations

### Loading States
- [ ] Add loading spinners to all async operations
- [ ] Add skeleton loaders for data fetching
- [ ] Add loading states to forms

## Phase 14: Mobile Responsiveness & Polish

### Mobile-First Design
- [ ] Ensure all components work on 375px width
- [ ] Test touch targets (minimum 44x44px)
- [ ] Implement mobile navigation (hamburger menu)
- [ ] Ensure bottom navigation is fixed and accessible
- [ ] Test on real mobile devices (iOS and Android)

### Responsive Breakpoints
- [ ] Test xs breakpoint (320px)
- [ ] Test sm breakpoint (640px)
- [ ] Test md breakpoint (768px)
- [ ] Test lg breakpoint (1024px)
- [ ] Test xl breakpoint (1280px)

### Accessibility
- [ ] Add ARIA labels to all interactive elements
- [ ] Ensure keyboard navigation works
- [ ] Test with screen readers
- [ ] Add focus visible states
- [ ] Ensure color contrast meets WCAG standards

## Phase 15: Data Integration & Mock Data

### Supabase Integration
- [ ] Connect to Supabase project
- [ ] Test all database operations
- [ ] Test authentication flow
- [ ] Test file storage (avatar uploads)
- [ ] Verify RLS policies work correctly

### Mock Data Setup
- [ ] Create seed script for mock accounts
- [ ] Create seed script for mock goals
- [ ] Create seed script for mock articles
- [ ] Create seed script for mock rewards
- [ ] Test with various user scenarios

## Phase 16: Testing & Validation

### Manual Testing
- [ ] Test complete user registration flow
- [ ] Test complete user login flow
- [ ] Test profile creation and updates
- [ ] Test goal creation and management
- [ ] Test news article viewing
- [ ] Test ownership metrics calculation
- [ ] Test reward redemption
- [ ] Test all error scenarios
- [ ] Test offline behavior
- [ ] Test on multiple devices

### Validation Checklist
- [ ] All forms validate correctly
- [ ] All errors display user-friendly messages
- [ ] All loading states show appropriately
- [ ] All success messages appear
- [ ] Navigation works on all screen sizes
- [ ] All data persists correctly
- [ ] Authentication state persists across refreshes

## Phase 17: Performance & Optimization

### Code Splitting
- [ ] Implement lazy loading for routes
- [ ] Implement code splitting for large components
- [ ] Optimize bundle size

### Image Optimization
- [ ] Optimize all images
- [ ] Implement lazy loading for images
- [ ] Add proper image alt tags

### Performance Monitoring
- [ ] Check Core Web Vitals
- [ ] Optimize initial load time
- [ ] Optimize re-renders
- [ ] Add performance logging

## Phase 18: Documentation & Deployment Prep

### Documentation
- [ ] Document API endpoints
- [ ] Document component props
- [ ] Document state management structure
- [ ] Create user guide
- [ ] Update README with setup instructions

### Deployment Preparation
- [ ] Set up production environment variables
- [ ] Test production build
- [ ] Configure Vercel/Netlify deployment
- [ ] Set up Supabase production environment
- [ ] Configure CORS settings
- [ ] Set up error monitoring (optional)

---

## Quick Reference: Key Features by Module

### Dashboard
- Greeting header with logo and avatar
- Top 3 goals summary
- Accounts summary (total + credit score)
- Latest 2 news articles
- Ownership snapshot (tier + progress + rewards)
- Fixed bottom navigation

### User Profile
- Personal info (name, email, DOB, address)
- Connected accounts (mocked)
- Interests selector (chips)
- Favourite champions selector
- Avatar upload
- Save changes button

### Goals
- Create new goal/pot
- Progress visualization (bar or ring)
- Goal fields: name, description, target amount, frequency, due date, linked account
- Goal detail view for tracking and editing

### News
- Tabs: Favourites and Popular
- Article cards with thumbnail, title, source tag
- Click-through to article detail

### Ownership
- Membership level display
- Progress bar/ring
- Engagement metrics (Referrals, Articles read, Days active)
- Reward catalogue (mocked list)

---

**Total Estimated Tasks: ~150+ individual tasks**

**Recommended Order:**
1. Complete Phase 1 (Foundation)
2. Phase 2 (Database & Types)
3. Phase 3 (Services & Utilities)
4. Phase 4 (State Management)
5. Phase 5 (Common Components)
6. Phase 6 (Authentication)
7. Phase 7-11 (Feature Modules)
8. Phase 12 (Routing)
9. Phase 13-18 (Polish & Testing)

