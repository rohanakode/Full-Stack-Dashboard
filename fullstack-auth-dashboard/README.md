# Full-Stack Auth Dashboard

A scalable full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js). Features JWT authentication, protected routes, and a task management dashboard.

## Features
- **Authentication**: User registration and login with JWT and bcrypt password hashing.
- **Dashboard**: Protected route to manage tasks (CRUD operations).
- **Responsive UI**: Built with React Bootstrap for mobile and desktop compatibility.
- **Security**: 
  - JWT for stateless authentication.
  - BCrypt for password hashing.
  - Secure LocalStorage handling.
  - Error Boundary for robust crash handling.

## Tech Stack
- **Frontend**: React (Vite), Bootstrap 5, React Router 6, Axios
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT, Bcryptjs

## Prerequisites
- Node.js (v14 or higher)
- MongoDB Account (Atlas) OR Local MongoDB installed

## Setup Instructions

### 1. Clone/Download the repository
Ensure you are in the project root `fullstack-auth-dashboard`.

### 2. Backend Setup
1.  Navigate to the backend folder:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  **Configure Environment Variables**:
    - Create a `.env` file in the `backend` directory (if it doesn't exist).
    - Add your MongoDB connection string and other secrets:
    ```env
    PORT=5000
    MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/fullstack-auth-dashboard?retryWrites=true&w=majority
    JWT_SECRET=your_super_secret_jwt_key
    NODE_ENV=development
    ```
4.  Start the server:
    ```bash
    npm run dev
    ```
    The backend will start on `http://localhost:5000`.

### 3. Frontend Setup
1.  Open a new terminal and navigate to the frontend folder:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The frontend will start on the URL provided by Vite (usually `http://localhost:5173`).

## Project Structure
- **backend/**: Contains the Node.js/Express API, database models, and controllers.
- **frontend/**: Contains the React application, components, and pages.

## Scalability Notes
- **Frontend**: Built with Vite for optimized production builds. Deploys easily to Netlify/Vercel.
- **Backend**: Stateless architecture (JWT) allows for horizontal scaling with load balancers.
- **Database**: MongoDB supports sharding and replica sets for high availability.
