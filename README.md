
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
│   ├── Navbar.tsx       # Navigation component
│   └── ApiConfiguration.tsx  # API setup component
├── contexts/            # React Context providers
│   └── UserContext.tsx  # User authentication context
├── hooks/               # Custom React hooks
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

**Key Frontend Technologies:**

1. **Component Architecture**
   - Functional components with React Hooks
   - TypeScript interfaces for type safety
   - Modular component design with single responsibility

2. **Styling System**
   - Tailwind CSS utility-first approach
   - Custom CSS variables for theming
   - Responsive design with mobile-first approach
   - shadcn/ui for consistent UI components

3. **State Management**
   - React Context for global state (user authentication)
   - TanStack Query for API data fetching and caching
   - Local component state with useState hook

4. **Routing Implementation**
   ```typescript
   // App.tsx routing structure
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

**API Architecture:**
The project uses a **serverless backend approach** with external API integrations rather than a traditional backend server.

**Backend Services:**

1. **Plant Analysis APIs**
   - **Primary Service:** Custom plant analysis API for disease detection
   - **Secondary Service:** Roboflow AI model integration for cassava plant analysis
   - **Implementation:** RESTful API calls with proper error handling

2. **Authentication System**
   - **Approach:** Frontend-based authentication with secure token management
   - **User Context:** React Context API for maintaining user session state
   - **Storage:** Local storage for user preferences and session data

3. **External API Integration**
   ```typescript
   // Service layer architecture
   export class RoboflowService {
     private static API_URL = 'https://detect.roboflow.com';
     
     static async analyzeImage(imageFile: File, apiKey: string, modelEndpoint: string) {
       // Base64 image conversion and API call implementation
     }
   }
   ```

**API Configuration:**

1. **Environment Variables**
   - API keys stored securely
   - Configurable API endpoints
   - Development vs production environment settings

2. **Error Handling**
   - Comprehensive error boundary implementation
   - User-friendly error messages
   - Fallback mechanisms for API failures

3. **Data Flow**
   ```
   User Upload → Image Processing → API Call → Result Processing → UI Update
   ```

**Backend Features:**

1. **Image Processing**
   - Base64 encoding for API transmission
   - File validation and size optimization
   - Support for multiple image formats (JPEG, PNG, WebP)

2. **Plant Disease Detection**
   - AI-powered analysis using trained models
   - Confidence scoring for predictions
   - Treatment recommendations database
   - Disease severity assessment

3. **Data Management**
   - Client-side data caching with TanStack Query
   - Optimistic updates for better user experience
   - Local storage for user preferences

**Security Implementation:**
- API key protection through environment variables
- Input validation for uploaded images
- CORS handling for cross-origin requests
- Secure HTTP requests with proper headers

**Performance Optimization:**
- Lazy loading for page components
- Image optimization and compression
- API response caching
- Bundle splitting with Vite

This implementation provides a modern, scalable architecture that separates concerns between frontend presentation and backend data processing while maintaining high performance and user experience standards.
