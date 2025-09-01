# AEON Bank Challenge - Banking Demo Application

A modern, responsive banking application built with Next.js 15.5, React 19.1, and TypeScript. This project demonstrates a complete authentication flow, transaction management, and responsive design patterns suitable for enterprise banking applications.

## 🎯 Project Overview

This application showcases a multi-step banking authentication system with:

- **Secure multi-step login flow** (Username → Secure Word → Password)
- **Protected dashboard** with transaction history
- **Responsive navigation** with mobile-first design
- **Modern React patterns** using hooks and context
- **Type-safe development** with TypeScript
- **Comprehensive testing** with Vitest

## ✨ Key Features

### Authentication System

- **Multi-step login process** with progressive disclosure
- **Secure word verification** for enhanced security
- **Password validation** with bcrypt hashing
- **Session management** with React Context
- **Protected routes** with authentication guards

### User Interface

- **Responsive design** that works on all devices
- **Modern UI components** built with shadcn/ui
- **Smooth animations** and transitions
- **Accessible navigation** with keyboard support
- **Loading states** and error handling

### Data Management

- **Mock user database** with realistic test data
- **Transaction history** with search and filtering
- **RESTful API endpoints** for data operations
- **Type-safe data structures** throughout the application

## 🛠 Technology Stack

### Frontend

- **Next.js 15.5** - React framework with App Router
- **React 19.1** - Latest React with concurrent features
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern React component library
- **Lucide React** - Beautiful icon library

### Backend & API

- **Next.js API Routes** - Serverless API endpoints
- **bcryptjs** - Password hashing and validation
- **Mock Database** - In-memory user and transaction data

### Development Tools

- **ESLint** - Code linting and quality
- **Prettier** - Code formatting
- **Husky** - Git hooks for code quality
- **Vitest** - Fast unit testing framework
- **TypeScript** - Static type checking

## 📋 Prerequisites

This project requires specific versions to ensure compatibility:

- **Node.js**: v20.18.0 (specified in `.nvmrc` and `.node-version`)
- **npm**: v9.0.0 or higher
- **Bun**: v1.0.0 or higher (recommended for faster installs)

### Version Management

#### Using NVM (Node Version Manager)

```bash
# Install and use the specified Node.js version
nvm install
nvm use
```

#### Using fnm (Fast Node Manager)

```bash
# Install and use the specified Node.js version
fnm install
fnm use
```

#### Using Bun (Recommended)

```bash
# Install Bun (if not already installed)
curl -fsSL https://bun.sh/install | bash

# Verify Bun version
bun --version
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/mimmydev/aeon-bank-challenges.git
cd aeon-bank-challenges
```

### 2. Install Dependencies

```bash
# Using Bun (recommended for speed)
bun install

# Or using npm
npm install
```

### 3. Start Development Server

```bash
# Using Bun
bun dev

# Or using npm
npm run dev
```

### 4. Open Application

Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Demo Credentials

Use these test accounts to explore the application:

| Username   | Password      | Role  |
| ---------- | ------------- | ----- |
| `mimmy`    | `password123` | user  |
| `admin`    | `admin123`    | admin |
| `testuser` | `test123`     | user  |
| `john`     | `john456`     | user  |

### Login Flow

1. Enter username on the first step
2. View your secure word (displayed automatically)
3. Enter your password
4. Access the dashboard with transaction history

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API endpoints
│   │   ├── getSecureWord/ # Secure word retrieval
│   │   ├── login/         # Authentication endpoint
│   │   └── transaction-history/ # Transaction data
│   ├── dashboard/         # Protected dashboard page
│   ├── login/            # Login page
│   ├── hooks/            # Custom React hooks
│   └── types/            # TypeScript type definitions
├── components/            # Reusable UI components
│   ├── common/           # Shared components
│   ├── layout/           # Navigation and layout
│   ├── login/            # Login flow components
│   ├── transactions/     # Transaction-related components
│   └── ui/               # Base UI components (shadcn/ui)
├── contexts/             # React Context providers
├── lib/                  # Utility functions and constants
└── __tests__/           # Test files
```

## 🔌 API Endpoints

### Authentication

- `POST /api/login` - User authentication
- `POST /api/getSecureWord` - Retrieve user's secure word

### Data

- `GET /api/transaction-history` - Fetch user transactions

### Example API Usage

#### Login Request

```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username": "mimmy", "password": "password123"}'
```

#### Get Secure Word

```bash
curl -X POST http://localhost:3000/api/getSecureWord \
  -H "Content-Type: application/json" \
  -d '{"username": "mimmy"}'
```

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Run tests once (CI mode)
npm run test:run
```

### Test Coverage

The project includes comprehensive tests for:

- API endpoints (`login`, `transaction-history`)
- Authentication flow
- Component rendering
- Error handling

## 🔧 Development Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run type-check   # Run TypeScript type checking

# Testing
npm run test         # Run tests in watch mode
npm run test:ui      # Run tests with Vitest UI
npm run test:run     # Run tests once
npm run test:coverage # Run tests with coverage report
```

## 🏗 Architecture Highlights

### Custom Hooks

- **`useLogin`** - Manages multi-step login state and validation
- **`useAuth`** - Handles authentication context and session management
- **`useTransactions`** - Manages transaction data fetching and state
- **`useNavbar`** - Controls responsive navigation behavior

### State Management

- **React Context** for global authentication state
- **Custom hooks** for component-specific logic
- **Local state** for form inputs and UI interactions

### Security Features

- **Password hashing** with bcrypt (10 rounds)
- **Secure word verification** for additional security layer
- **Protected routes** with authentication guards
- **Input validation** and sanitization

### Performance Optimizations

- **Next.js App Router** for optimal routing and loading
- **Turbopack** for faster development builds
- **Component lazy loading** where appropriate
- **Optimized bundle splitting**

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically on every push

### Environment Variables

For production deployment, consider adding:

```env
# Add to .env.local
NEXTAUTH_SECRET=your-secret-key
DATABASE_URL=your-database-url
```

## 🤝 For Interviewers

### What to Look For

1. **Code Organization** - Clean separation of concerns
2. **TypeScript Usage** - Comprehensive type safety
3. **React Patterns** - Modern hooks and context usage
4. **Error Handling** - Graceful error states and validation
5. **Testing Strategy** - API and component test coverage
6. **Responsive Design** - Mobile-first approach
7. **Security Considerations** - Password hashing and validation

### Key Implementation Highlights

- Multi-step form with state management
- Custom hook patterns for reusable logic
- Responsive navigation with mobile menu
- Type-safe API endpoints
- Comprehensive error handling
- Modern React 19 features

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React 19 Features](https://react.dev/blog/2024/04/25/react-19)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)

## 📄 License

This project is created for interview and demonstration purposes.

---

**Built with ❤️ for AEON Bank Challenge**
