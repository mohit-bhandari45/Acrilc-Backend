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
    - [Get All Applauds in a Section(Post/Storyboard)(#4-get-all-applauds-in-a-sectionpoststoryboard)]
    - [Applauded or Unapplauded a Post](#5-applaud-or-unapplaud-a-sectionpoststoryboard)

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
        "data": [
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
        "data": [
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

### 4. Get All Applauds in a Section(Post/StoryBoard)

- **URL**: `/api/socials/:section/:sectionId/applauds`
- **Method**: `GET`
- **Headers**:

    - `Authorization: Bearer <your_token>`

- **Description**: Get all users who applauded a specific post

- **Success Response**: `200`

    ```json
    {
        "msg": "No Applauds Yet!" or "Fetched all applauds users",
        "data": [
            {
                "fullName": "John Doe",
                "username": "john_doe",
                "email": "john@example.com"
            },
            {
                "fullName": "Jane Smith",
                "username": "jane_smith",
                "email": "jane@example.com"
            }
        ]
    }
    ```

- **Error Response**:
    - **Status Code**: `404`
        ```json
        {
            "msg": "Post Not found"
        }
        ```

### 5. Applaud or UnApplaud a Section(post/storyboard)

- **URL**: `/api/socials/:section/:sectionId/applaud`
- **Method**: `GET`
- **Headers**:

    - `Authorization: Bearer <your_token>`

- **Description**: Applaud or UnApplaud a specific section based on current user's applaud status. If already Applauded, it will unapplaud; if not applauded, it will applaud.

- **Success Response**: `200`

    - **When Applauding a Section**:
        ```json
        {
            "msg": "Applauded a Post or Applauded a Story",
            "data": {
                "applauds": ["user123"]
            }
        }
        ```
    - **When UnApplauding a Section**:
        ```json
        {
            "msg": "UnApplauded Post or UpApplauded a Story",
            "data": {
                "applauds": []
            }
        }
        ```

- **Error Response**:
    - **Status Code**: `404`
        ```json
        {
            "msg": "Post Not found"
        }
        ```