# Claude Development Guidelines

## 👨‍💻 Developer Profile
Fullstack Frontend Developer | JavaScript & TypeScript Specialist

---

## 🎯 Core Principles

### Code Quality Standards
- **Type Safety First**: Always prefer TypeScript over JavaScript for new projects
- **Functional Programming**: Favor pure functions and immutability
- **DRY Principle**: Avoid code duplication through reusable components and utilities
- **SOLID Principles**: Apply object-oriented design principles where appropriate
- **Defensive Programming**: Always validate inputs and handle edge cases

### Architecture Preferences
- **Component-Based Architecture**: Build modular, reusable components
- **Separation of Concerns**: Keep business logic separate from UI logic
- **State Management**: Use appropriate tools (Redux, Zustand, Jotai) based on complexity
- **API Layer Abstraction**: Centralize API calls in service layers
- **Feature-Based Structure**: Organize code by features, not by file types

---

## 📋 Development Workflow

### 1. Code Organization
```
src/
├── components/       # Reusable UI components
├── features/         # Feature-specific modules
├── hooks/            # Custom React hooks
├── services/         # API and external services
├── utils/            # Helper functions
├── types/            # TypeScript type definitions
├── contexts/         # React contexts
└── constants/        # Application constants
```

### 2. Naming Conventions
- **Components**: PascalCase (`UserProfile.tsx`)
- **Hooks**: camelCase with 'use' prefix (`useAuth.ts`)
- **Utils**: camelCase (`formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Types/Interfaces**: PascalCase (`User`, `IAuthService`)
- **Boolean variables**: Prefix with `is`, `has`, `should` (`isLoading`, `hasPermission`)

### 3. TypeScript Best Practices

#### Type Definitions
```typescript
// ✅ Good: Explicit and descriptive types
interface User {
  id: string;
  email: string;
  profile: UserProfile;
  createdAt: Date;
}

// ❌ Avoid: Any type
const data: any = fetchData();

// ✅ Use: Proper typing
const data: User[] = await fetchUsers();
```

#### Generics
```typescript
// ✅ Reusable generic functions
function asyncWrapper<T>(promise: Promise<T>): Promise<[T | null, Error | null]> {
  return promise
    .then((data) => [data, null] as [T, null])
    .catch((error) => [null, error] as [null, Error]);
}
```

#### Type Guards
```typescript
// ✅ Use type guards for runtime safety
function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'email' in obj
  );
}
```

---

## ⚛️ React Best Practices

### Component Structure
```typescript
// ✅ Preferred component structure
import React, { useState, useEffect } from 'react';
import type { FC } from 'react';

interface UserCardProps {
  userId: string;
  onUpdate?: (user: User) => void;
}

export const UserCard: FC<UserCardProps> = ({ userId, onUpdate }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, [userId]);

  const loadUser = async () => {
    // Implementation
  };

  if (isLoading) return <Skeleton />;
  if (!user) return <ErrorState />;

  return (
    <div className="user-card">
      {/* Component content */}
    </div>
  );
};
```

### Custom Hooks
```typescript
// ✅ Extract reusable logic into custom hooks
export function useUser(userId: string) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const data = await userService.getById(userId);
        setUser(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { user, isLoading, error };
}
```

### Performance Optimization
```typescript
// ✅ Memoization for expensive computations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

// ✅ Callback memoization
const handleClick = useCallback(() => {
  doSomething(value);
}, [value]);

// ✅ Component memoization
export const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* Render logic */}</div>;
});
```

---

## 🔧 Code Style Preferences

### ESLint Configuration
```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-explicit-any": "error",
    "react/react-in-jsx-scope": "off",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

### Prettier Configuration
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "always"
}
```

---

## 🌐 API Integration

### Service Layer Pattern
```typescript
// services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
});

// Add interceptors
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

```typescript
// services/userService.ts
import api from './api';
import type { User, CreateUserDto } from '@/types';

export const userService = {
  async getAll(): Promise<User[]> {
    const { data } = await api.get<User[]>('/users');
    return data;
  },

  async getById(id: string): Promise<User> {
    const { data } = await api.get<User>(`/users/${id}`);
    return data;
  },

  async create(userData: CreateUserDto): Promise<User> {
    const { data } = await api.post<User>('/users', userData);
    return data;
  },

  async update(id: string, userData: Partial<User>): Promise<User> {
    const { data } = await api.patch<User>(`/users/${id}`, userData);
    return data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  },
};
```

---

## 🧪 Testing Approach

### Unit Tests (Jest + React Testing Library)
```typescript
// ✅ Test component behavior, not implementation
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserCard } from './UserCard';

describe('UserCard', () => {
  it('should display user information when loaded', async () => {
    render(<UserCard userId="123" />);
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  it('should call onUpdate when edit button is clicked', async () => {
    const onUpdate = jest.fn();
    render(<UserCard userId="123" onUpdate={onUpdate} />);
    
    const editButton = screen.getByRole('button', { name: /edit/i });
    await userEvent.click(editButton);
    
    expect(onUpdate).toHaveBeenCalled();
  });
});
```

---

## 🛠️ Preferred Tech Stack

### Frontend Framework
- **React 18+** with TypeScript
- **Next.js** for SSR/SSG when needed
- **Vite** for build tooling (faster than CRA)

### State Management
- **Zustand** or **Jotai** for simple state
- **Redux Toolkit** for complex state management
- **TanStack Query (React Query)** for server state

### Styling
- **Tailwind CSS** for utility-first styling
- **CSS Modules** for component-scoped styles
- **Styled Components** when CSS-in-JS is preferred

### UI Libraries
- **Shadcn/ui** or **Radix UI** for headless components
- **Lucide React** for icons
- **Framer Motion** for animations

### Form Handling
- **React Hook Form** with **Zod** for validation

### Testing
- **Vitest** or **Jest** for unit tests
- **React Testing Library** for component tests
- **Playwright** or **Cypress** for E2E tests

---

## 📝 Documentation Standards

### Component Documentation
```typescript
/**
 * UserCard component displays user profile information
 * 
 * @component
 * @example
 * ```tsx
 * <UserCard 
 *   userId="123" 
 *   onUpdate={(user) => console.log(user)}
 * />
 * ```
 */
export const UserCard: FC<UserCardProps> = ({ userId, onUpdate }) => {
  // Implementation
};
```

### Function Documentation
```typescript
/**
 * Formats a date string to a localized format
 * 
 * @param date - The date to format (ISO string or Date object)
 * @param locale - The locale to use (default: 'en-US')
 * @returns Formatted date string
 * 
 * @example
 * ```ts
 * formatDate('2024-03-15') // Returns: "March 15, 2024"
 * ```
 */
export function formatDate(date: string | Date, locale = 'en-US'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
```

---

## 🚀 Performance Guidelines

### Code Splitting
```typescript
// ✅ Lazy load routes and heavy components
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}
```

### Image Optimization
```typescript
// ✅ Use next/image for automatic optimization (Next.js)
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority
  placeholder="blur"
/>
```

### Bundle Size Monitoring
- Use webpack-bundle-analyzer or similar tools
- Keep main bundle under 200KB (gzipped)
- Lazy load heavy dependencies

---

## 🔒 Security Best Practices

### Input Sanitization
```typescript
// ✅ Sanitize user input
import DOMPurify from 'dompurify';

const sanitizedHTML = DOMPurify.sanitize(userInput);
```

### Environment Variables
```typescript
// ✅ Never commit secrets
// Use .env.local for local development
// Store sensitive data in environment variables

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
```

### Authentication
```typescript
// ✅ Secure token storage and refresh logic
export const authService = {
  async login(credentials: LoginCredentials) {
    const { accessToken, refreshToken } = await api.post('/auth/login', credentials);
    
    // Store tokens securely
    sessionStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  },
  
  async refreshAccessToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    // Implementation
  },
};
```

---

## 📊 Error Handling

### Global Error Boundary
```typescript
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Log to error tracking service (e.g., Sentry)
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}
```

### API Error Handling
```typescript
// ✅ Consistent error handling pattern
export async function fetchWithErrorHandling<T>(
  promise: Promise<T>
): Promise<{ data?: T; error?: string }> {
  try {
    const data = await promise;
    return { data };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return { error: err.response?.data?.message || 'Network error occurred' };
    }
    return { error: 'An unexpected error occurred' };
  }
}
```

---

## 🎨 Accessibility (a11y)

### Semantic HTML
```typescript
// ✅ Use semantic elements
<nav>
  <ul>
    <li><a href="/home">Home</a></li>
  </ul>
</nav>

<main>
  <article>
    <h1>Article Title</h1>
    <p>Content...</p>
  </article>
</main>
```

### ARIA Attributes
```typescript
// ✅ Provide proper ARIA labels
<button
  aria-label="Close dialog"
  aria-pressed={isPressed}
  onClick={handleClose}
>
  <CloseIcon aria-hidden="true" />
</button>
```

### Keyboard Navigation
```typescript
// ✅ Support keyboard interactions
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    handleClick();
  }
};
```

---

## 📦 Git Workflow

### Commit Messages (Conventional Commits)
```
feat: add user authentication feature
fix: resolve infinite loop in useEffect
refactor: extract form validation logic
docs: update API integration guide
test: add tests for UserCard component
chore: update dependencies
```

### Branch Naming
```
feature/user-authentication
bugfix/login-error-handling
refactor/api-service-layer
hotfix/critical-security-patch
```

---

## 🎯 Code Review Checklist

- [ ] Code follows TypeScript best practices
- [ ] All functions and components are properly typed
- [ ] No `any` types without justification
- [ ] Components are properly memoized where needed
- [ ] Error handling is implemented
- [ ] Tests are written and passing
- [ ] No console.logs or debug code
- [ ] Accessibility standards are met
- [ ] Code is properly documented
- [ ] No security vulnerabilities introduced
- [ ] Bundle size impact is acceptable

---

## 📚 Learning Resources

### Official Documentation
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
- [Next.js Documentation](https://nextjs.org/docs)

### Best Practices
- [Clean Code JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Web.dev Performance](https://web.dev/performance/)

---

## 💡 When Working with Claude

### Provide Context
- Share relevant code snippets
- Mention the tech stack in use
- Describe the expected behavior
- Include error messages if applicable

### Ask for Specific Help
- "Review this component for performance issues"
- "Suggest improvements for type safety"
- "Help debug this TypeScript error"
- "Refactor this code following best practices"

### Request Code Generation
- "Create a custom hook for data fetching"
- "Build a reusable form component with validation"
- "Generate unit tests for this component"
- "Set up API service layer with error handling"

---

**Last Updated**: March 2024
**Version**: 1.0.0
