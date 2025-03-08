# API Routes Documentation

## Base URL: `http://localhost:8000`

## Authentication

### 1. Signup

- **URL**: `/auth/signup`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
    ``` json
    {
        "username":"user@76",
        "email":"user@76gmail.com",
        "password":"guwrqoig",
    }

### 2. Login

- **URL**: `/auth/login`
- **Method**: `POST`
- **Headers**: `Content-Type:application/json`
- **Request Body**:
    ```json
    {
        "email": "user@example.com",
        "password": "securepass"
    }
    ```
