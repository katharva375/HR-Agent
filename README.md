# Employee Management System

This project is an employee management system built with React, TypeScript, and Supabase. It allows users to manage employee data efficiently.

## Running Locally

To run the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root of the project and add your Supabase URL and anon key:
   ```env
   REACT_APP_SUPABASE_URL=your-supabase-url
   REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
   You can find these in your Supabase project settings.

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000` (or another port if specified).

## Technologies Used

* **React:** A JavaScript library for building user interfaces.
* **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
* **Supabase:** An open-source Firebase alternative for building secure and scalable applications.
    * **Supabase Auth:** For user authentication.
    * **Supabase Database:** A PostgreSQL database for storing application data.
* **React Router:** For handling client-side routing.
* **Tailwind CSS:** (Assumed, common in modern React projects) - A utility-first CSS framework.

## Project Structure

A typical project structure might look like this:

```
.
├── public/
│   ├── index.html
│   └── ... (other static assets like favicons, manifest.json)
├── src/
│   ├── assets/          # Static assets like images, fonts
│   ├── components/      # Reusable UI components (e.g., Button, Modal, EmployeeForm)
│   ├── contexts/        # React contexts for global state management (e.g., AuthContext)
│   ├── hooks/           # Custom React hooks (e.g., useAuth, useTableData)
│   ├── layouts/         # Layout components (e.g., MainLayout, AuthLayout, DashboardLayout)
│   ├── pages/           # Top-level page components mapped to routes (e.g., LoginPage, EmployeeListPage, EmployeeDetailsPage)
│   ├── services/        # Modules for interacting with Supabase or other APIs (e.g., employeeService.ts, authService.ts)
│   ├── types/           # TypeScript type definitions and interfaces (e.g., Employee.ts, User.ts)
│   ├── utils/           # Utility functions (e.g., validators, formatters)
│   ├── App.tsx          # Main application component, sets up routing and global providers
│   ├── index.tsx        # Entry point of the React application, renders App
│   └── supabaseClient.ts # Supabase client initialization and configuration
├── .env.example         # Example for .env file
├── .gitignore           # Files and folders to be ignored by Git
├── package.json         # Project metadata, dependencies, and scripts
├── tsconfig.json        # TypeScript compiler options
└── README.md            # This file
```
