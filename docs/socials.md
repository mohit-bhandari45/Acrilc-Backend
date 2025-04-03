## API Documentation - Follow/Unfollow Users

### Base URL: `http://localhost:8000`

- **Status Code:** `500`
    ```json
    {
        "msg": "Internal Server Error"
    }
    ```

## Table of Contents

1. [User Routes](#user-routes)
    - [Follow/Unfollow a User](#1-followunfollow-a-user)
    - [Get All Followers](#2-get-all-followers)
    - [Get All Following](#3-get-all-following)

## User Routes

### 1. Follow/Unfollow a User

- **URL**: `/api/users/:userId/follow`
- **Method**: `POST`
- **Headers**:

    - `Authorization: Bearer <your_token>`

- **Response (User Followed)**: `200`

    ```json
    {
        "msg": "User Followed"
    }
    ```

- **Response (User Unfollowed)**: `200`

    ```json
    {
        "msg": "User Unfollowed"
    }
    ```

- **Response (User Not Found)**: `404`
    ```json
    {
        "msg": "No User"
    }
    ```

### 2. Get All Followers

- **URL**: `/api/users/:userId/followers`
- **Method**: `GET`
- **Headers**:

    - `Authorization: Bearer <your_token>`

- **Success Response**: `200`

    ```json
    {
        "msg": "Got Followers",
        "followers": [
            {
                "_id": "6530a3f29bde3f001d432fbc",
                "username": "john_doe",
                "email": "john@example.com"
            }
        ]
    }
    ```

- **Response (User Not Found)**: `404`
    ```json
    {
        "msg": "No User"
    }
    ```

### 3. Get All Following

- **URL**: `/api/users/:userId/following`
- **Method**: `GET`
- **Headers**:

    - `Authorization: Bearer <your_token>`

- **Success Response**: `200`

    ```json
    {
        "msg": "Got Following",
        "following": [
            {
                "_id": "6530a3f29bde3f001d432fbd",
                "username": "jane_doe",
                "email": "jane@example.com"
            }
        ]
    }
    ```

- **Response (User Not Found)**: `404`
    ```json
    {
        "msg": "No User"
    }
    ```
