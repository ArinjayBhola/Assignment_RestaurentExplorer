# Restaurant Explorer Project

This is a full-stack web application for exploring restaurants, built with a modern technology stack. It features a robust backend API and a responsive, dynamic frontend.

## Technology Stack

### Frontend
The frontend is built using **React** with **TypeScript** and **Vite** for a fast and efficient development experience.
*   **Core:** React, TypeScript, Vite
*   **Styling:** TailwindCSS, Radix UI (Primitives), Lucide React (Icons)
*   **State Management:** React Query (@tanstack/react-query)
*   **Routing:** React Router DOM
*   **Forms & Validation:** React Hook Form, Zod
*   **Animations:** Framer Motion
*   **HTTP Client:** Axios

### Backend
The backend is a RESTful API built with **Node.js** and **Express**, using **TypeScript** for type safety.
*   **Core:** Node.js, Express, TypeScript
*   **Database:** MongoDB with Mongoose (ODM)
*   **Authentication:** JWT (JSON Web Tokens), Bcryptjs, Cookie Parser
*   **Validation:** Zod
*   **Utilities:** Morgan (Logging), Cors, Dotenv

## Project Structure

The project is divided into two main directories:
*   `frontend/`: Contains the React application.
*   `backend/`: Contains the Express API server.

## Routes

### Backend API Routes
Base URL: `/api`

#### Authentication (`/auth`)
*   `POST /auth/register`: Register a new user account.
*   `POST /auth/login`: Authenticate a user and receive a token.
*   `GET /auth/logout`: Clear the authentication session.
*   `GET /auth/me`: Retrieve the currently authenticated user's profile (Protected).

#### Restaurants (`/restaurants`)
*   `GET /restaurants/`: Retrieve a list of restaurants. Supports query parameters for filtering and pagination.
*   `GET /restaurants/:id`: Retrieve detailed information for a specific restaurant by its ID.

### Frontend Routes

#### Public Routes
*   `/auth/login`: User login page.
*   `/auth/signup`: User registration page.

#### Protected Routes (Require Authentication)
*   `/`: Automatically redirects to `/restaurants`.
*   `/restaurants`: The main listing page displaying available restaurants.
*   `/restaurants/:id`: Detailed view of a specific restaurant.
*   `/profile`: User profile management.
*   `/settings`: Application settings.

#### Other
*   `*`: Any undefined route redirects to `/restaurants`.

## Getting Started

1.  **Backend Setup:**
    *   Navigate to the `backend` directory.
    *   Install dependencies: `npm install`
    *   Set up environment variables (copy `.env.example` to `.env`).
    *   Start the server: `npm run dev`

2.  **Frontend Setup:**
    *   Navigate to the `frontend` directory.
    *   Install dependencies: `npm install`
    *   Start the development server: `npm run dev`
