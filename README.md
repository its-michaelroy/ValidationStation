# ValidationStation

ValidationStation is a web application for validating email addresses and phone numbers. It provides a user-friendly interface for input validation and displays the results along with additional information.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Cloud Deployment](#cloud-deployment)
- [Features](#features)
- [Troubleshooting](#troubleshooting)
- [API Testing](#api-testing)

## Prerequisites

Before you begin, ensure you have the following installed:

- Python 3.8+
- Node.js 14+
- npm 6+
- PostgreSQL 12+

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/its-michaelroy/ValidationStation.git
   cd ValidationStation
   ```

2. Set up the backend:

   ```
   cd back-end
   python -m venv .venv
   source .venv/bin/activate  # On Windows use `.venv\Scripts\activate`
   pip install -r requirements.txt
   ```

   Note for Linux users: If you encounter errors installing `psycopg2` from the requirements.txt file, you may need to install additional dependencies. Run the following commands:
   ```
   sudo apt-get update
   sudo apt-get install libpq-dev python3-dev
   ```
   Then try installing the requirements again.

3. Set up the frontend:

   ```
   cd ../front-end
   npm install
   ```

## Database Setup

1. Install PostgreSQL if you haven't already:

   - For Ubuntu/Debian: `sudo apt-get install postgresql postgresql-contrib`
   - For macOS using Homebrew: `brew install postgresql`
   - For Windows: Download and install from the [official PostgreSQL website](https://www.postgresql.org/download/windows/)

2. Start the PostgreSQL service:

   - For Ubuntu/Debian: `sudo service postgresql start`
   - For macOS: `brew services start postgresql`
   - For Windows: The service should start automatically after installation

3. Create a new PostgreSQL database and user:

   ```
   sudo -u postgres psql
   ```

   In the PostgreSQL prompt, run:

   ```sql
   CREATE DATABASE your_db_name;
   CREATE USER your_user_name WITH PASSWORD 'your_password_here';
   ALTER ROLE your_user_name SET client_encoding TO 'utf8';
   ALTER ROLE your_user_name SET default_transaction_isolation TO 'read committed';
   ALTER ROLE your_user_name SET timezone TO 'UTC';
   GRANT ALL PRIVILEGES ON DATABASE your_db_name TO your_user_name;
   \q
   ```

## Configuration

1. In the `back-end` directory, create a `.env` file with the following content:

   ```
   DJANGO_SECRET_KEY=your_secret_key_here
   API_KEY=your_api_key_here
   NOUN_PROJECT_API_KEY=your_noun_project_api_key
   NOUN_PROJECT_SECRET_KEY=your_noun_project_secret_key
   DB_NAME=your_db_name
   DB_USER=your_user_name
   DB_PASSWORD=your_password_here
   DB_HOST=localhost
   DB_PORT=5432
   ```

2. Update the database settings in `back-end/validation_proj/settings.py`:

   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': os.getenv('DB_NAME'),
           'USER': os.getenv('DB_USER'),
           'PASSWORD': os.getenv('DB_PASSWORD'),
           'HOST': os.getenv('DB_HOST', 'localhost'),
           'PORT': os.getenv('DB_PORT', '5432'),
       }
   }
   ```

## Running the Application

1. Start the backend server:

   ```
   cd back-end
   python manage.py migrate
   python manage.py runserver
   ```

2. In a new terminal, start the frontend development server:

   ```
   cd front-end
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173` to access the application.

## Cloud Deployment

For instructions on deploying ValidationStation to the cloud using Coolify, an open-source self-hosting platform, please refer to the [Coolify Deployment Guide](COOLIFY_DEPLOYMENT.md).

## Features

- User registration and authentication
- Email address validation
- Phone number validation
- Validation history
- Blacklist and whitelist management

## API Testing

For testing the API endpoints, you can use either Thunder Client (a Visual Studio Code extension) or Postman. Both tools allow you to easily send HTTP requests and examine the responses. Refer to the [API TESTING](TESTING.md) file for more information.

### Thunder Client

1. Install the Thunder Client extension in Visual Studio Code.
2. In VS Code, click on the Thunder Client icon in the sidebar.
3. Create a new request for each endpoint you want to test.

### Postman

1. Download and install Postman from [postman.com](https://www.postman.com/downloads/).
2. Create a new request for each endpoint you want to test.

### Example API Calls

Here are some example API calls you can test:

1. User Registration (POST):
   - URL: `http://localhost:8000/api/v1/users/register/`
   - Method: POST
   - Body (JSON):
     ```json
     {
       "email": "your_email@example.com",
       "password": "your_password"
     }
     ```

2. User Login (POST):
   - URL: `http://localhost:8000/api/v1/users/login/`
   - Method: POST
   - Body (JSON):
     ```json
     {
       "email": "your_email@example.com",
       "password": "your_password"
     }
     ```

3. For authenticated requests:
   - Add a header:
     - Key: `Authorization`
     - Value: `Token your_token_here`

Both Thunder Client and Postman allow you to save these requests for easy reuse and modification during development and testing.

## Troubleshooting

If you encounter database connection issues, particularly on Linux systems, follow these steps:

1. Check PostgreSQL authentication settings:

   Open the PostgreSQL client authentication configuration file:
   ```
   sudo nano /etc/postgresql/[version]/main/pg_hba.conf
   ```
   Replace [version] with your PostgreSQL version (e.g., 12, 13, 14).

2. Modify authentication method:

   Find these lines:
   ```
   # "local" is for Unix domain socket connections only
   local   all             all                                     peer
   # IPv4 local connections:
   host    all             all             127.0.0.1/32            scram-sha-256
   ```

   Change them to:
   ```
   # "local" is for Unix domain socket connections only
   local   all             all                                     md5
   # IPv4 local connections:
   host    all             all             127.0.0.1/32            md5
   ```

3. Save the file and restart PostgreSQL:
   ```
   sudo service postgresql restart
   ```

4. Ensure your .env file in the back-end directory contains the correct database credentials:
   ```
   DB_NAME=your_db_name
   DB_USER=your_user_name
   DB_PASSWORD=your_password_here
   DB_HOST=localhost
   DB_PORT=5432
   ```

5. Verify that your settings.py file is correctly configured to use these environment variables:
   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': os.getenv('DB_NAME'),
           'USER': os.getenv('DB_USER'),
           'PASSWORD': os.getenv('DB_PASSWORD'),
           'HOST': os.getenv('DB_HOST', 'localhost'),
           'PORT': os.getenv('DB_PORT', '5432'),
       }
   }
   ```

6. Confirm that you've created the database and user as specified earlier in this README.

7. If you're using a Linux system and encounter issues installing psycopg2, you may need to install additional dependencies:
   ```
   sudo apt-get update
   sudo apt-get install libpq-dev python3-dev
   ```
   Then try installing the requirements again:
   ```
   pip install -r requirements.txt
   ```

After making these changes, try running the migrations again:
```
python manage.py migrate
```

If you continue to experience issues, please check the Django and PostgreSQL logs for more detailed error messages.

For more information about the project structure and specific features, please refer to the source code and comments within the files.
