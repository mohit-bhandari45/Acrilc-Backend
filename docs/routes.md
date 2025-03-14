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

## Profile Routes

### 1. Get Profile

- **URL**: `/api/profile`
- **Method**: `GET`
- **Headers**:
    - `Authorization: Bearer <your_token>`
- **Success Response**:
    ```json
    {
        "msg": "User Found",
        "user": {
            "_id": "652f8ae19bde3f001d432bad",
            "fullName": "John Doe",
            "username": "john_doe",
            "bio": "Love traveling!",
            "profilePicture": "profile_image.jpg"
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

### 2. Update Profile

- **URL**: `/api/profile`
- **Method**: `PUT`
- **Headers**:
    - `Content-Type: multipart/form-data`
    - `Authorization: Bearer <your_token>`
- **Request Body**:
    ```json
    {
        "fullName": "John Updated",
        "username": "john_updated",
        "bio": "Updated Bio",
        "profilePicture": "updated_image.jpg"
    }
    ```
- **Success Response**:
    ```json
    {
        "msg": "User Updated",
        "user": {
            "_id": "652f8ae19bde3f001d432bad",
            "fullName": "John Updated",
            "username": "john_updated",
            "bio": "Updated Bio",
            "profilePicture": "updated_image.jpg"
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

### 3. Delete Profile

- **URL**: `/api/profile`
- **Method**: `DELETE`
- **Headers**:
    - `Authorization: Bearer <your_token>`
- **Success Response**:
    ```json
    {
        "msg": "User Deleted"
    }
    ```
- **Non-Success Response**:

    - Status Code: 404

        ```json
        {
            "msg": "User Already Deleted"
        }
        ```

    - Status Code: 500
        ```json
        {
            "msg": "Internal Server Error",
            "err": "err"
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
                "author": "652f8ae19bde3f001d432bad",
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
            }
        ]
        ```

    - **Error Response**:
        - Status Code: 500
            ```json
            {
                "msg": "Internal Server Error"
            }
            ```
