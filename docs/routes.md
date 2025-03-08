# API Routes Documentation

## Base URL: `http://localhost:8000`

## Authentication

### 1. Login

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
