# Deploying ValidationStation with Coolify

Coolify is an open-source, self-hostable alternative to services like AWS and Vercel. It allows you to deploy both your frontend and backend, as well as manage your database, all in one place.

## Prerequisites

- A server or VPS with Docker installed
- Domain name (optional, but recommended)

## Coolify Setup

1. Install Coolify on your server by following the instructions at [https://coolify.io/docs/installation](https://coolify.io/docs/installation)

2. Access the Coolify dashboard and set up your account

## Database Deployment

1. In the Coolify dashboard, go to "Resources" and click "New Resource"
2. Choose "Database" and select "PostgreSQL"
3. Configure your database settings (name, username, password)
4. Deploy the database

## Backend Deployment

1. In the Coolify dashboard, go to "Applications" and click "New Application"
2. Choose "Git Repository" and select your ValidationStation repository
3. Configure the build settings:
   - Build Command: `pip install -r back-end/requirements.txt`
   - Start Command: `python back-end/manage.py migrate && python back-end/manage.py runserver 0.0.0.0:8000`
4. Set environment variables:
   - `DJANGO_SECRET_KEY`
   - `API_KEY`
   - `NOUN_PROJECT_API_KEY`
   - `NOUN_PROJECT_SECRET_KEY`
   - `DATABASE_URL` (use the URL provided by your Coolify PostgreSQL deployment)
5. Deploy the backend

## Frontend Deployment

1. In the Coolify dashboard, create another "New Application"
2. Choose "Git Repository" and select your ValidationStation repository again
3. Configure the build settings:
   - Build Command: `cd front-end && npm install && npm run build`
   - Start Command: `cd front-end && npm run preview`
4. Set environment variables:
   - `VITE_API_BASE_URL` (set this to your backend's URL)
5. Deploy the frontend

## Connecting Frontend and Backend

1. Update the `api.jsx` file in your frontend to use the deployed backend URL:
   ```javascript
   export const api = axios.create({
       baseURL: import.meta.env.VITE_API_BASE_URL,
   })
   ```

2. Update the CORS settings in your Django backend to allow requests from your frontend URL

## Finalizing Deployment

1. Configure your domain (if using one) in Coolify for both frontend and backend
2. Set up SSL certificates through Coolify's built-in Let's Encrypt integration

Your ValidationStation application should now be fully deployed and accessible through Coolify!
