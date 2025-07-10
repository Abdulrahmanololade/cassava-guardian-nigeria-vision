
# Welcome to my final year project

If you want to work locally using your own IDE, you can clone this repo and push changes

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## System Implementation

### Environment Setup

**Development Environment Configuration:**

1. **Node.js Environment**
   - Install Node.js version 18.0 or later
   - npm version 8.0 or later (bundled with Node.js)
   - Use nvm (Node Version Manager) for managing Node.js versions

2. **Project Initialization**
   ```sh
   # Create new Vite project with React + TypeScript template
   npm create vite@latest plant-analysis-app -- --template react-ts
   cd plant-analysis-app
   npm install
   ```

3. **Development Tools Setup**
   - **Code Editor:** VS Code with extensions:
     - ES7+ React/Redux/React-Native snippets
     - Tailwind CSS IntelliSense
     - TypeScript Hero
     - Prettier - Code formatter
     - ESLint

4. **Git Configuration**
   ```sh
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <repository-url>
   git push -u origin main
   ```

### Frontend Development

**Architecture Overview:**
- **Framework:** React 18 with TypeScript for type safety
- **Build Tool:** Vite for fast development and optimized builds
- **Styling:** Tailwind CSS with shadcn/ui component library
- **State Management:** React Context API and TanStack Query for server state
- **Routing:** React Router DOM for client-side navigation

**Project Structure:**
```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui base components
│   ├── sections/        # Page sections (Hero, Services, etc.)
│   ├── api-configuration/  # API configuration components
│   │   ├── AccessControlAlerts.tsx    # Access control notifications
│   │   ├── ApiCredentialsForm.tsx     # API credentials input form
│   │   └── SupportedApis.tsx          # Supported API documentation
│   ├── Navbar.tsx       # Navigation component
│   ├── ApiConfiguration.tsx  # Main API configuration component
│   └── ModelRecommendations.tsx  # AI model recommendations
├── contexts/            # React Context providers
│   └── UserContext.tsx  # User authentication context
├── hooks/               # Custom React hooks
│   ├── useApiConfiguration.ts  # API configuration state management
│   ├── useApiTest.ts           # API connection testing
│   └── use-toast.ts            # Toast notification hook
├── pages/               # Route components
│   ├── Index.tsx        # Landing page
│   ├── Auth.tsx         # Authentication page
│   ├── PlantAnalysis.tsx # Main analysis feature
│   ├── Contact.tsx      # Contact page
│   └── NotFound.tsx     # 404 error page
├── services/            # API service layers
│   ├── plantAnalysisService.ts  # Plant analysis API
│   └── roboflowService.ts      # Roboflow integration
├── lib/                 # Utility functions
└── App.tsx             # Main application component
```

**Component Architecture - API Configuration System:**

The API Configuration system has been refactored into a modular architecture with the following components:

1. **Main Components:**
   - `ApiConfiguration.tsx` - Main container component orchestrating the API configuration flow
   - `AccessControlAlerts.tsx` - Handles authentication and authorization alerts
   - `ApiCredentialsForm.tsx` - Form component for API credential input and management
   - `SupportedApis.tsx` - Documentation component for supported AI APIs

2. **Custom Hooks:**
   - `useApiConfiguration.ts` - Manages API configuration state, database operations, and form handling
   - `useApiTest.ts` - Handles API connection testing and validation
   - `use-toast.ts` - Provides toast notification functionality

3. **Key Features:**
   - **Modular Design:** Each component has a single responsibility
   - **Reusability:** Components can be easily reused across different parts of the application
   - **Type Safety:** Full TypeScript integration with proper interface definitions
   - **Error Handling:** Comprehensive error handling with user-friendly messages
   - **Access Control:** Role-based access control with admin-only configuration changes

**Styling System:**
- Tailwind CSS utility-first approach
- Custom CSS variables for theming
- Responsive design with mobile-first approach
- shadcn/ui for consistent UI components with proper accessibility

**State Management Implementation:**

1. **API Configuration Hook (`useApiConfiguration.ts`):**
   ```typescript
   // Manages complete API configuration lifecycle
   const {
     apiKey, setApiKey,
     modelEndpoint, setModelEndpoint,
     configName, setConfigName,
     modelName, setModelName,
     isLoading, isSaving,
     isAdmin, isLoggedIn,
     saveConfiguration,
     loadActiveConfiguration
   } = useApiConfiguration();
   ```

2. **API Testing Hook (`useApiTest.ts`):**
   ```typescript
   // Handles API connection validation
   const { 
     isTesting, 
     testResult, 
     testConnection 
   } = useApiTest(isAdmin);
   ```

**Routing Implementation:**
```typescript
// App.tsx routing structure with protected routes
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/auth" element={<Auth />} />
    <Route path="/plant-analysis" element={<PlantAnalysis />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

### Backend Integration

**Database Architecture:**
The project uses Supabase as the backend-as-a-service platform with PostgreSQL database.

**Database Schema:**

1. **API Configurations Table:**
   ```sql
   CREATE TABLE api_configurations (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     name TEXT NOT NULL,
     api_key TEXT NOT NULL,
     endpoint_url TEXT NOT NULL,
     model_name TEXT,
     is_active BOOLEAN DEFAULT false,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
     created_by UUID REFERENCES auth.users
   );
   ```

2. **Row Level Security (RLS) Policies:**
   - Admin users can create, update, and delete API configurations
   - Authenticated users can view API configurations
   - Email-based admin identification: `omotayoofficialbr@gmail.com`

3. **Database Functions:**
   ```sql
   CREATE OR REPLACE FUNCTION get_active_api_config()
   RETURNS TABLE(id uuid, name text, api_key text, endpoint_url text, model_name text)
   LANGUAGE sql STABLE SECURITY DEFINER
   ```

**API Service Architecture:**

1. **Plant Analysis Service (`plantAnalysisService.ts`):**
   - Integrates with multiple AI APIs for plant disease detection
   - Handles image validation and preprocessing
   - Provides comprehensive analysis results with treatment recommendations

2. **Roboflow Service (`roboflowService.ts`):**
   - Specialized service for Roboflow AI model integration
   - Handles base64 image encoding for API transmission
   - Manages API key authentication and error handling

**Authentication System:**
- Supabase Auth integration with email/password authentication
- React Context API for global authentication state management
- Protected routes with role-based access control
- Automatic session management and token refresh

**Data Flow Architecture:**
```
User Input → Form Validation → State Management → Database Operation → UI Update
     ↓
API Configuration → Validation → Supabase RPC → Database Storage → Success Feedback
```

### Integration and Testing

**Frontend Integration Testing:**

1. **Component Integration:**
   - API Configuration components work together seamlessly
   - State management between hooks and components is properly synchronized
   - Form validation and error handling integration

2. **Authentication Integration:**
   - User context integration with API configuration access control
   - Proper redirection and session management
   - Role-based feature access (admin-only configuration changes)

3. **Database Integration:**
   - Supabase client integration with proper error handling
   - Real-time data synchronization between frontend and database
   - Optimistic updates with rollback on failure

**API Integration Testing:**

1. **External API Integration:**
   - Plant analysis API connection testing
   - Roboflow API integration validation
   - Error handling for API failures and network issues

2. **Database API Integration:**
   - CRUD operations for API configurations
   - RLS policy enforcement testing
   - Database function execution and result handling

**Testing Strategy:**

1. **Unit Testing:**
   - Individual component functionality
   - Hook behavior and state management
   - Utility function validation

2. **Integration Testing:**
   - Component interaction testing
   - API service integration
   - Database operation validation

3. **End-to-End Testing:**
   - Complete user workflow testing
   - Authentication flow validation
   - API configuration and plant analysis pipeline

**Performance Optimization:**

1. **Frontend Optimization:**
   - Lazy loading for page components
   - Memoization for expensive computations
   - Optimized re-renders with proper dependency arrays

2. **Backend Optimization:**
   - Database query optimization
   - API response caching with TanStack Query
   - Connection pooling and timeout management

3. **Build Optimization:**
   - Vite build optimization with code splitting
   - Tree shaking for unused code elimination
   - Asset optimization and compression

**Error Handling and Monitoring:**

1. **Frontend Error Handling:**
   - Comprehensive try-catch blocks with user-friendly error messages
   - Toast notifications for user feedback
   - Form validation with real-time error display

2. **Backend Error Handling:**
   - Database constraint violation handling
   - API timeout and network error management
   - Graceful degradation for service unavailability

3. **Monitoring and Logging:**
   - Console logging for development debugging
   - Error boundary implementation for React components
   - Performance monitoring with metrics collection

This implementation provides a robust, scalable, and maintainable system for AI-powered plant analysis with comprehensive API configuration management, ensuring high performance and excellent user experience.
