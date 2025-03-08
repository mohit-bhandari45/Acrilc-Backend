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
- **Success Response**:
    ```json
    {
        "msg": "User Created Successfully",
        "user": {
            "_id": "64a2f4c2e5f1d12345678901",
            "fullName": "example rawat",
            "email": "example@gmail.com",
            "password": "$2b$10$encrypted_password",
            "createdAt": "2024-09-25T10:00:00.000Z",
            "updatedAt": "2024-09-25T10:00:00.000Z",
            "__v": 0
        }
    }
    ```
- **Error Response**:
    - Status Code: 409
        ```json
        {
            "msg": "User Already Exists"
        }
        ```
    - Status Code: 500
        ```json
        {
            "msg": "Internal Server Error"
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
- **Success Response**:

    ```json
    {
        "msg": "Login Successful",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "user": {
            "_id": "64a2f4c2e5f1d12345678901",
            "fullName": "example rawat",
            "email": "example@gmail.com"
        }
    }
    ```

- **Error Response**:

    - Status Code: 401

        ```json
        {
            "msg": "Invalid Email or Password",
            "token": null
        }
        ```

    - Status Code: 500
        ```json
        {
            "msg": "Internal Server Error"
        }
        ```
