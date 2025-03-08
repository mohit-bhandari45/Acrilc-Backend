# API Routes Documentation

## Base URL: `http://localhost:8000`

## Authentication

### 1. Signup

- **URL**: `/auth/signup`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
    ```json
    {
        "fullName": "example rawat",
        "email": "example@gmail.com",
        "password": "password@45"
    }
    ```

### 2. Login

- **URL**: `/auth/login`,
- **Method**: `POST`,
- **Headers**: `Content-Type: application/json`,
- **Request Body**:
    ```json
    {
        "email": "example@gmail.com",
        "password": "password132"
    }
    ```
