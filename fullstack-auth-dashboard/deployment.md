# Deploying to Render.com

This guide details how to deploy your **Full-Stack Auth Dashboard** to Render. Since you separate frontend and backend, you will create **two separate services**.

## Prerequisites
1.  Push your latest code to GitHub (you've already done this!).
2.  Create an account on [Render.com](https://render.com/).

---

## Part 1: Deploy the Backend (Node.js API)

1.  **Click "New +"** and select **"Web Service"**.
2.  **Connect your GitHub repository** (`Full-Stack-Dashboard`).
3.  **Config**:
    *   **Name**: `dashboard-backend` (or similar)
    *   **Region**: Closest to you (e.g., Singapore, Frankfurt)
    *   **Root Directory**: `backend` (⚠️ **CRITICAL**)
    *   **Environment**: `Node`
    *   **Build Command**: `npm install`
    *   **Start Command**: `npm start`
    *   **Plan**: Free
4.  **Environment Variables** (Advanced section):
    *   Add the following keys and values:
        *   `MONGO_URI`: `(Your MongoDB Atlas Connection String)`
        *   `JWT_SECRET`: `(Your secret key)`
        *   `NODE_ENV`: `production`
5.  **Click "Create Web Service"**.

**Wait for deployment to finish.**
Once "Live", copy the **Service URL** (e.g., `https://dashboard-backend-xyz.onrender.com`). You will need this for the frontend.

---

## Part 2: Deploy the Frontend (React App)

1.  **Click "New +"** and select **"Static Site"**.
2.  **Connect the same GitHub repository** (`Full-Stack-Dashboard`).
3.  **Config**:
    *   **Name**: `dashboard-frontend`
    *   **Root Directory**: `frontend` (⚠️ **CRITICAL**)
    *   **Build Command**: `npm install && npm run build` (or just `npm run build` if dependencies are installed)
    *   **Publish Directory**: `dist`
    *   **Plan**: Free
4.  **Environment Variables**:
    *   `VITE_API_URL`: Paste the **Backend Service URL** from Part 1 here.
5.  **Redirects/Rewrites**:
    *   Go to the **Redirects/Rewrites** tab (after creation or during setup if available).
    *   Add a rule:
        *   **Source**: `/*`
        *   **Destination**: `/index.html`
        *   **Action**: `Rewrite`
    *   *Reason*: This is required for React Router to work when you refresh a page like `/login`.
6.  **Click "Create Static Site"**.

**Wait for deployment to finish.**
Visit your frontend URL. Your app is now live!
