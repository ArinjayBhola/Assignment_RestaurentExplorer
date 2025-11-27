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

Follow these instructions to run the project locally on your machine.

### Prerequisites

*   **Node.js** (v18 or higher recommended)
*   **npm** (Node Package Manager)
*   **MongoDB** (Local instance or Atlas URI)

### Installation & Setup

#### 1. Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  **Environment Variables**:
    Create a `.env` file in the `backend` directory and add the following variables:
    ```env
    MONGO_URI=your_mongodb_connection_string
    CLIENT_URL=http://localhost:5173
    ```
    *   `MONGO_URI`: Your MongoDB connection string.
    *   `CLIENT_URL`: The URL where your frontend application will run (default is `http://localhost:5173` for Vite).

4.  Start the backend server:
    ```bash
    npm run dev
    ```
    The server should be running on `http://localhost:5000` (or your configured port).

#### 2. Frontend Setup

1.  Open a new terminal and navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  **Environment Variables**:
    Create a `.env` file in the `frontend` directory and add the following variable:
    ```env
    VITE_API_URL=http://localhost:5000/api
    ```
    *   `VITE_API_URL`: The full URL of your backend API (ensure it ends with `/api` if your backend routes are prefixed).

4.  Start the frontend development server:
    ```bash
    npm run dev
    ```
    The application should now be accessible at `http://localhost:5173`.
