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
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
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

- **URL**: `/auth/login`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
    ```json
    {
        "email": "example@gmail.com",
        "password": "password132"
    }
    ```
- **Response Body**

    - **Success Response**:

        ```json
        {
            "msg": "Login Successful",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
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

## Post Routes

### 1. Creating a Post

- **URL**: `/api/posts/create`
- **Method**: `POST`
- **Headers**:
    - `Content-Type: multipart/form-data`
    - `Authorization: Bearer <your_token>`
- **Request Body**:

    ```json
    {
        "text": "Exploring the beautiful city!",
        "links": ["https://example.com"],
        "hashTags": ["#travel", "#exploration"],
        "author": "652f8ae19bde3f001d432bad",
        "mentions": ["user123", "user456"],
        "poll": {
            "question": "What's your favorite travel destination?",
            "options": ["Beach", "Mountains", "City", "Countryside"],
            "expiresAt": "2025-12-31T23:59:59Z"
        },
        "location": {
            "latitude": 40.7128,
            "longitude": -74.006,
            "name": "New York City, USA"
        },
        "files": []
    }
    ```

- **Response Body**

    - **Success Response**:

        ```json
        {
            "msg": "Post Created Successfully",
            "post": {
                "_id": "6530a3f29bde3f001d432fbc",
                "text": "Exploring the beautiful city!",
                "media": [
                    {
                        "url": "/uploads/image1.jpg",
                        "type": "image"
                    },
                    {
                        "url": "/uploads/video1.mp4",
                        "type": "video"
                    }
                ],
                "author": "652f8ae19bde3f001d432bad",
                "links": ["https://example.com"],
                "hashTags": ["#travel", "#exploration"],
                "mentions": ["user123", "user456"],
                "poll": {
                    "question": "What's your favorite travel destination?",
                    "options": ["Beach", "Mountains", "City", "Countryside"],
                    "expiresAt": "2025-12-31T23:59:59Z"
                },
                "location": {
                    "latitude": 40.7128,
                    "longitude": -74.006,
                    "name": "New York City, USA"
                },
                "createdAt": "2025-03-11T10:00:00Z",
                "updatedAt": "2025-03-11T10:00:00Z"
            }
        }
        ```

    - **Error Response**:

        - Status Code: 500
            ```json
            {
                "msg": "Internal Server Error"
            }
            ```

### 2. Get Posts by Author

- **URL**: `/api/posts/author/:id`
- **Method**: `GET`
- **Headers**:
    - `Authorization: Bearer <your_token>`
- **Response Body**

    - **Success Response**:

        ```json
        [
            {
                "_id": "6530a3f29bde3f001d432fbc",
                "text": "Exploring the beautiful city!",
                "author": "652f8ae19bde3f001d432bad",
                "createdAt": "2025-03-11T10:00:00Z",
                "updatedAt": "2025-03-11T10:00:00Z"
            },
            ...
        ]
        ```

    - **Error Response**:

        - Status Code: 500
            ```json
            {
                "msg": "Internal Server Error"
            }
            ```
