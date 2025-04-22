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
    - [Get All Applauds in a Section](#4-get-all-applauds-in-a-sectionpoststoryboard)]
    - [Applauded or Unapplauded a Post](#5-applaud-or-unapplaud-a-sectionpoststoryboard)
    - [Comment on a Section(Post/Storyboard)](#6-comment-on-a-sectionpoststoryboard)
    - [Get All Comments in a Section(Post/Storyboard)](#7-get-all-comments-in-a-sectionpoststoryboard)
    - [Update a Comment](#8-update-a-comment)
    - [Delete a Comment](#9-delete-a-comment)
    - [Applaud a Section(Post/Storyboard) Comment](#10-applaud-a-sectionpoststoryboard-comment)
    - [Reply to a Section(Post/Storyboard) Comment](#11-reply-to-a-sectionpoststoryboard-comment)

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

### 6. Comment on a Section(Post/Storyboard)

- **URL**: `/api/socials/:section/:sectionId/comment`
- **Method**: `POST`
- **Headers**:

    - `Authorization: Bearer <your_token>`

- **Request Body**: `200`:

    ```json
    {
        "text": "Great post!"
    }
    ```

- **Description**: Add a new comment to a specific section(Post/Storyboard)

- **Success Response**: `200`

    ```json
    {
        "msg": "Commented Successfully",
        "data": {
            "user": {
                "_id": "6804aa97ba95371c5c510c1a",
                "username": "john_doe"
            },
            "text": "hello Hated the video",
            "applauds": [],
            "_id": "6805e9ea0b1df5aa9d282bae",
            "replies": [],
            "createdAt": "2025-04-21T06:47:06.867Z",
            "updatedAt": "2025-04-21T06:47:06.867Z"
        }
    }
    ```

- **Error Response**:
    - **Status Code**: `404`
        ```json
        {
            "msg": "No Post Found"
        }
        ```

### 7. Get All Comments in a Section(Post/Storyboard)

- **URL**: `/api/posts/post/:postId/comments`
- **Method**: `GET`
- **Headers**:

    - `Authorization: Bearer <your_token>`

- **Description**: Retrieve all comments and their replies for a specific section(Post/Storyboard)

- **Success Response**: `200`

    ```json
    {
        "msg": "No Comments Yet!" or "Fetched all comments",
        if there are comments
        "data": [
            {
                "user": {
                    "_id": "6804aa97ba95371c5c510c1a",
                    "username": "john_doe"
                },
                "text": "hello Hated the video",
                "applauds": [],
                "_id": "6805e9ea0b1df5aa9d282bae",
                "replies": [],
                "createdAt": "2025-04-21T06:47:06.867Z",
                "updatedAt": "2025-04-21T06:47:06.867Z"
            }
        ]
    }
    ```

### 8. Update a Comment

- **URL**: `/api/socials/:section/:sectionId/comment/:commentId`
- **Method**: `PATCH`
- **Headers**:

    - `Authorization: Bearer <your_token>`

- **Request Body**:

    ```json
    {
        "text": "Updated comment text"
    }
    ```

- **Description**: Updates the text of a specific comment on a section(Post/Storyboard)

- **Success Response**: `200`

    ```json
    {
        "msg": "Comment Updated Successfully",
        "data": {
            "user": {
                "_id": "6804aa97ba95371c5c510c1a",
                "username": "john_doe"
            },
            "text": "Hello Man",
            "applauds": [],
            "_id": "6805e9ea0b1df5aa9d282bae",
            "replies": [],
            "createdAt": "2025-04-21T06:47:06.867Z",
            "updatedAt": "2025-04-21T07:33:45.826Z"
        }
    }
    ```

- **Error Response**:
    - **Status Code**: `404`
        ```json
        {
            "msg": "No Post Found"
        }
        ```
    - **Status Code**: `404`
        ```json
        {
            "msg": "No Comment Found"
        }
        ```

### 9. Delete a Comment

- **URL**: `/api/socials/:section/:sectionId/comment/:commentId`
- **Method**: `DELETE`
- **Headers**:

    - `Authorization: Bearer <your_token>`

- **Description**: Deletes a specific comment from a section(Post/Storyboard)

- **Success Response** : `200`

    ```json
    {
        "msg": "Comment Deleted Successfully"
    }
    ```

- **Error Response**:
    - **Status Code**: `404`
        ```json
        {
            "msg": "No Post Found"
        }
        ```

### 10. Applaud a Section(Post/Storyboard) Comment

- **URL**: `/api/socials/:sections/:sectionId/comment/:commentId/applaud`
- **Method**: `GET`
- **Headers**:

    - `Authorization: Bearer <your_token>`

- **Description**: Applaud or unApplaud a specific comment on a section(Post/Storyboard) based on current user's applaud status

- **Success Response**: `200`

    - **When Applauding a Comment**:
        ```json
        {
            "msg": "Applauded Post",
            "data": {
                "_id": "6804aa97ba95371c5c510c1a",
                "username": "john_doe"
            }
        }
        ```
    - **When UnApplauding a Comment**:
        ```json
        {
            "msg": "UnApplauded Post"
        }
        ```

- **Error Response**:
    - **Status Code**: `404`
        ```json
        {
            "msg": "Post Not found"
        }
        ```
        ```json
        {
            "msg": "Storyboard Not found"
        }
        ```
    - **Status Code**: `404`
        ```json
        {
            "msg": "Comment Not found"
        }
        ```

### 11. Reply to a Section(Post/Storyboard) Comment

- **URL**: `/api/socials/:sections/:sectionId/comment/:commentId/reply`
- **Method**: `POST`
- **Headers**:

    - `Authorization: Bearer <your_token>`

- **Request Body**:

    ```json
    {
        "text": "Thanks for the comment!"
    }
    ```

- **Description**: Add a reply to a specific comment on a section(post/storyboard)

- **Success Response**: `200`

    ```json
    {
        "msg": "Replied Successfully",
        "data": {
            "user": {
                "_id": "6804aa97ba95371c5c510c1a",
                "username": "john_doe"
            },
            "text": "You are shit",
            "applauds": [],
            "_id": "68060e122aeb23d1a95dc03d",
            "createdAt": "2025-04-21T09:21:22.874Z",
            "updatedAt": "2025-04-21T09:21:22.874Z"
        }
    }
    ```

- **Error Response**:
    - **Status Code**: `404`
        ```json
        {
            "msg": "No Post Found"
        }
        ```
        ```json
        {
            "msg": "No Storyboard Found"
        }
        ```
    - **Status Code**: `404`
        ```json
        {
            "msg": "No Comment Found"
        }
        ```
