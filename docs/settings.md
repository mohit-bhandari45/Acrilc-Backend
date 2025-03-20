# API Routes Documentation

## Base URL: `http://localhost:8000`

## Authentication

All endpoints require a valid JWT token unless specified otherwise. The token must be included in the `Authorization` header.

## Profile Routes

### 1. Get Own Profile

- **URL**: `/api/user/me`
- **Method**: `GET`
- **Headers**:
    - `Authorization: Bearer <your_token>`
- **Request Body**: None
- **Response Body**:
    - **Success Response**:
        ```json
        {
            "msg": "User Found",
            "user": {
                "_id": "507f1f77bcf86cd799439011",
                "username": "jane_doe",
                "fullName": "Jane Doe",
                "profilePicture": "https://i.ibb.co/example.jpg",
                "socialLinks": { "twitter": "https://twitter.com/jane_doe" },
                "bio": "Lover of code and coffee",
                "preferences": ["Woolen", "Ceramic"]
            }
        }
        ```

### 2. Get User Profile by ID

- **URL**: `/api/user/:userId`
- **Method**: `GET`
- **Headers**:
    - `Authorization: Bearer <your_token>`
- **Path Parameters**:
    - `userId`: The MongoDB ObjectId of the user whose profile is being retrieved (e.g., `507f1f77bcf86cd799439011`).
- **Request Body**: None
- **Response Body**:
    - **Success Response**:
        ```json
        {
            "msg": "User Found",
            "user": {
                "_id": "507f1f77bcf86cd799439011",
                "username": "john_doe",
                "fullName": "John Doe",
                "profilePicture": "https://i.ibb.co/example2.jpg",
                "socialLinks": { "linkedin": "https://linkedin.com/in/john_doe" },
                "bio": "Passionate developer",
                "preferences": ["Ceramic"]
            }
        }
        ```

## General Settings Routes

### 1. Get Personal General Details

- **URL**: `/api/user/`
- **Method**: `GET`
- **Headers**:
    - `Authorization: Bearer <your_token>`
- **Request Body**: None
- **Response Body**:
    - **Success Response**:
        ```json
        {
            "msg": "User Found",
            "user": {
                "username": "jane_doe",
                "fullName": "Jane Doe",
                "profilePicture": "https://i.ibb.co/example.jpg",
                "socialLinks": { "twitter": "https://twitter.com/jane_doe" },
                "bio": "Lover of code and coffee"
            }
        }
        ```

### 2. Update Personal General Details

- **URL**: `/api/user/`
- **Method**: `PUT`
- **Headers**:
    - `Authorization: Bearer <your_token>`
    - `Content-Type: application/json` (Required for sending the request body).
- **Request Body**:
    ```json
    {
        "username": "jane_updated",
        "fullName": "Jane Updated",
        "bio": "Updated bio: Code, coffee, and more!"
    }
    ```

### 3. Add Social Links

- **URL**: `/api/user/social-links`
- **Method**: `POST`
- **Headers**:
    - `Authorization: Bearer <your_token>`
    - `Content-Type: application/json` (Required for sending the request body).
- **Request Body**:
    ```json
    {
        "platform": "twitter",
        "url": "https://twitter.com/jane_doe"
    }
    ```

### 4. Add Profile Picture

- **URL**: `/api/user/profile-pic`
- **Method**: `POST`
- **Headers**:
    - `Authorization: Bearer <your_token>`
    - `Content-Type: multipart/form-data`
- **Request Body**:

    - Form field: `image` (File upload, e.g., `.jpg`, `.png`).
    - **Notes**:
        - The `image` field must contain the file to be uploaded.
        - Assumes Multer middleware is configured to handle file uploads and populate `req.file`.

- **Response Body**:
    - **Success Response**:
        ```json
        {
            "msg": "Profile Pic Added",
            "profilePic": "https://i.ibb.co/example.jpg"
        }
        ```

### 5. Update Profile Picture

- **URL**: `/api/user/profile-pic`
- **Method**: `PUT`
- **Headers**:

    - `Authorization: Bearer <your_token>`
    - `Content-Type: multipart/form-data`

    - Form field: `image` (File upload, e.g., `.jpg`, `.png`).
    - **Notes**:
        - The `image` field must contain the new file to replace the existing profile picture.
        - Assumes Multer middleware is configured to handle file uploads and populate `req.file`.

- **Response Body**:
    - **Success Response**:
        ```json
        {
            "msg": "Profile Pic Updated",
            "profilePic": "https://i.ibb.co/updated-example.jpg"
        }
        ```

### 6. Delete Profile Picture

- **URL**: `/api/user/profile-pic`
- **Method**: `DELETE`
- **Headers**:
    - `Authorization: Bearer <your_token>` (Required, provides user authentication via JWT or similar middleware).
- **Request Body**: None
- **Response Body**:
    - **Success Response**:
        ```json
        {
            "msg": "Profile Pic Deleted"
        }
        ```

## Preferences Routes

### 1. Get Preferences Details

- **URL**: `/api/user/preferences`
- **Method**: `GET`
- **Headers**:
    - `Authorization: Bearer <your_token>` (Required, provides user authentication via JWT or similar middleware).
- **Request Body**: None
- **Response Body**:
    - **Success Response**:
        ```json
        {
            "msg": "Preferenes Found",
            "preferences": "dark mode"
        }
        ```

### 2. Set Preferences Details

- **URL**: `/api/user/preferences`
- **Method**: `POST`
- **Headers**:
    - `Authorization: Bearer <your_token>` (Required, provides user authentication via JWT or similar middleware).
    - `Content-Type: application/json` (Required for sending the request body).
- **Request Body**:
    ```json
    {
        "preferences": "dark mode"
    }
    ```

### 3. Update Preferences Details

- **URL**: `/api/user/preferences`
- **Method**: `PUT`
- **Headers**:
    - `Authorization: Bearer <your_token>` (Required, provides user authentication via JWT or similar middleware).
    - `Content-Type: application/json` (Required for sending the request body).
- **Request Body**:
    ```json
    {
        "preferences": "light mode"
    }
    ```
