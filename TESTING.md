# API Testing Guide for ValidationStation

This guide provides examples for testing the API endpoints of ValidationStation using Thunder Client or Postman.

## Setting Up

1. Install Thunder Client (VS Code extension) or Postman.
2. Create a new request for each endpoint you want to test.

## API Endpoints

### User Management

1. User Registration:
   - URL: `http://localhost:8000/api/v1/users/register/`
   - Method: POST
   - Body (JSON):
     ```json
     {
       "email": "newuser@example.com",
       "password": "securepassword123"
     }
     ```

2. User Login:
   - URL: `http://localhost:8000/api/v1/users/login/`
   - Method: POST
   - Body (JSON):
     ```json
     {
       "email": "newuser@example.com",
       "password": "securepassword123"
     }
     ```

3. User Logout:
   - URL: `http://localhost:8000/api/v1/users/logout/`
   - Method: POST
   - Headers:
     - Key: `Authorization`
     - Value: `Token your_token_here`

4. User Info:
   - URL: `http://localhost:8000/api/v1/users/info/`
   - Method: GET
   - Headers:
     - Key: `Authorization`
     - Value: `Token your_token_here`

### Email Validation

5. Email Validation:
   - URL: `http://localhost:8000/api/v1/email/`
   - Method: POST
   - Headers:
     - Key: `Authorization`
     - Value: `Token your_token_here`
   - Body (JSON):
     ```json
     {
       "email_address": "test@example.com"
     }
     ```

6. Get Single Email Record:
   - URL: `http://localhost:8000/api/v1/email/single_record/test@example.com/`
   - Method: GET
   - Headers:
     - Key: `Authorization`
     - Value: `Token your_token_here`

7. Get All Email Records:
   - URL: `http://localhost:8000/api/v1/email/all/`
   - Method: GET
   - Headers:
     - Key: `Authorization`
     - Value: `Token your_token_here`

8. Get Whitelisted Emails:
   - URL: `http://localhost:8000/api/v1/email/whitelist/`
   - Method: GET
   - Headers:
     - Key: `Authorization`
     - Value: `Token your_token_here`

9. Get Blacklisted Emails:
   - URL: `http://localhost:8000/api/v1/email/blacklist/`
   - Method: GET
   - Headers:
     - Key: `Authorization`
     - Value: `Token your_token_here`

### Phone Validation

10. Phone Validation:
    - URL: `http://localhost:8000/api/v1/phone/`
    - Method: POST
    - Headers:
      - Key: `Authorization`
      - Value: `Token your_token_here`
    - Body (JSON):
      ```json
      {
        "phone_number": "1234567890",
        "countryCode": "US"
      }
      ```

11. Get Single Phone Record:
    - URL: `http://localhost:8000/api/v1/phone/single_record/+11234567890/`
    - Method: GET
    - Headers:
      - Key: `Authorization`
      - Value: `Token your_token_here`

12. Get All Phone Records:
    - URL: `http://localhost:8000/api/v1/phone/all/`
    - Method: GET
    - Headers:
      - Key: `Authorization`
      - Value: `Token your_token_here`

13. Get Whitelisted Phone Numbers:
    - URL: `http://localhost:8000/api/v1/phone/whitelist/`
    - Method: GET
    - Headers:
      - Key: `Authorization`
      - Value: `Token your_token_here`

14. Get Blacklisted Phone Numbers:
    - URL: `http://localhost:8000/api/v1/phone/blacklist/`
    - Method: GET
    - Headers:
      - Key: `Authorization`
      - Value: `Token your_token_here`

### Icon Retrieval

15. Get Valid Icon:
    - URL: `http://localhost:8000/api/v1/icons/isValid/`
    - Method: GET
    - Headers:
      - Key: `Authorization`
      - Value: `Token your_token_here`

16. Get Invalid Icon:
    - URL: `http://localhost:8000/api/v1/icons/notValid/`
    - Method: GET
    - Headers:
      - Key: `Authorization`
      - Value: `Token your_token_here`

Remember to replace `your_token_here` with the actual token you receive after logging in.
