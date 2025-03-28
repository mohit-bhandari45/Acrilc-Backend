## API Documentation - Create Post

### Base URL: `http://localhost:8000`

- **Status Code:** `500`
    ```json
    {
        "msg": "Internal Server Error"
    }
    ```

## Table of Contents

1. [Post Routes](#post-routes)
    - [Creating a Post](#1-creating-a-post)
    - [Get Posts of a User](#2-get-posts-of-a-user)
    - [Get Single Post](#3-get-single-post)
    - [Delete a Post](#4-delete-a-post)
    - [Get All Likes in a Post](#5-get-all-likes-in-a-post)
    - [Like or Dislike a Post](#6-like-or-dislike-a-post)
    - [Get All Comments in a Post](#7-get-all-comments-in-a-post)
    - [Comment on a Post](#8-comment-on-a-post)
    - [Reply to a Post Comment](#9-reply-to-a-post-comment)
    - [Like a Post Comment](#10-like-a-post-comment)
    - [Update a Comment](#11-update-a-comment)
    - [Delete a Comment](#12-delete-a-comment)
    - [Update a Reply](#13-update-a-reply)
    - [Delete a Reply](#14-delete-a-reply)

## Post Routes

### 1. Creating a Post

- **URL**: `/api/posts`
- **Method**: `POST`
- **Headers**:

    - `Content-Type: multipart/form-data`
    - `Authorization: Bearer <your_token>`

- **Request Body**:

    ```json
    {
        "title": "A Journey to Remember",
        "subtitle": "Exploring new places",
        "story": "The adventure began at sunrise...",
        "size": "medium",
        "links": ["https://example.com/travel-blog"],
        "hashTags": ["#Travel", "#Adventure"],
        "mentions": ["user123", "user456"],
        "location": "Eiffel Tower, Paris",
        "forte": "Photography",
        "collectionId": "6530a3f29bde3f001d432fbc",
        "files": []
    }
    ```

- **Success Response** :`200`
    ```json
    {
        "msg": "Post Created Successfully",
        "post": {
            "_id": "6530a3f29bde3f001d432fbc",
            "title": "A Journey to Remember",
            "subtitle": "Exploring new places",
            "story": "The adventure began at sunrise...",
            "size": "medium",
            "media": [
                {
                    "url": "uploads/123456789.jpg",
                    "type": "image"
                }
            ],
            "links": ["https://example.com/travel-blog"],
            "hashTags": ["#Travel", "#Adventure"],
            "mentions": ["user123", "user456"],
            "location": {
                "latitude": 48.8584,
                "longitude": 2.2945,
                "name": "Eiffel Tower, Paris"
            },
            "forte": "Photography",
            "createdAt": "2025-03-11T10:00:00Z",
            "updatedAt": "2025-03-11T10:00:00Z"
        }
    }
    ```

### 2. Get Posts of a User

- **URL**: `/api/posts/:userId`
- **Method**: `GET`
- **Headers**:

    - `Authorization: Bearer <your_token>`

- **Success Response**: `200`
    ```json
    {
        "msg": "Got All Posts",
        "posts": [
            {
                "_id": "6530a3f29bde3f001d432fbc",
                "title": "My Fitness Journey",
                "subtitle": "A guide to staying healthy",
                "story": "Started my fitness journey last year...",
                "media": [
                    {
                        "url": "/uploads/image1.jpg",
                        "type": "image"
                    }
                ],
                "forte": "Fitness",
                "links": ["https://myblog.com"],
                "hashTags": ["#Fitness", "#Health"],
                "mentions": ["user456", "user789"],
                "location": "Los Angeles, USA",
                "createdAt": "2025-03-11T10:00:00Z",
                "updatedAt": "2025-03-11T10:00:00Z"
            }
        ]
    }
    ```

### 3. Get Single Post

- **URL**: `/api/posts/post/:postId`
- **Method**: `POST`
- **Headers**:

    - `Authorization: Bearer <your_token>`

- **Success Response**: `200`
    ```json
    {
        "msg": "Post Found",
        "post": {
            "_id": "6530a3f29bde3f001d432fbc",
            "title": "A Journey to Remember",
            "subtitle": "Exploring new places",
            "story": "The adventure began at sunrise...",
            "applauds": [
                {
                    "fullName": "John Doe",
                    "username": "john_doe",
                    "email": "john@example.com"
                }
            ]
        }
    }
    ```

### 4. Delete a Post

- **URL**: `/api/posts/post/:postId`
- **Method**: `POST`
- **Headers**:

    - `Authorization: Bearer <your_token>`

- **Success Response**: `200`

    ```json
    {
        "msg": "Post Deleted Successfully"
    }
    ```

- **Error Response**:
    ```json
    {
        "msg": "Post Not Found"
    }
    ```

### 5. Get All Likes in a Post

- **URL**: `/api/posts/post/likes/:postId`
- **Method**: `GET`
- **Headers**:

    - `Authorization: Bearer <your_token>`

- **Description**: Get all users who liked (applauded) a specific post

- **Success Response**: `200`

    ```json
    {
        "msg": "Fetched all applauds users",
        "users": [
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

### 6. Like or Dislike a Post

- **URL**: `/api/posts/post/like/:postId`
- **Method**: `GET`
- **Headers**:

    - `Authorization: Bearer <your_token>`

- **Description**: Like or unlike a specific post based on current user's like status. If already liked, it will unlike; if not liked, it will like.

- **Success Response**: `200`

    - **When Liking a Post**:
        ```json
        {
            "msg": "Liked Post",
            "post": {
                "_id": "6530a3f29bde3f001d432fbc",
                "title": "A Journey to Remember",
                "subtitle": "Exploring new places",
                "story": "The adventure began at sunrise...",
                "applauds": ["user123"]
            }
        }
        ```
    - **When Unliking a Post**:
        ```json
        {
            "msg": "Unliked Post",
            "post": {
                "_id": "6530a3f29bde3f001d432fbc",
                "title": "A Journey to Remember",
                "subtitle": "Exploring new places",
                "story": "The adventure began at sunrise...",
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

### 7. Get All Comments in a Post

- **URL**: `/api/posts/post/comments/:postId`
- **Method**: `GET`
- **Headers**:

    - `Authorization: Bearer <your_token>`

- **Description**: Retrieve all comments and their replies for a specific post

- **Success Response**: `200`

    ```json
    {
        "msg": "Fetched all comments",
        "comments": [
            {
                "_id": "6530a3f29bde3f001d432fbd",
                "user": {
                    "fullName": "John Doe",
                    "username": "john_doe",
                    "email": "john@example.com"
                },
                "text": "Great post!",
                "replies": [
                    {
                        "user": {
                            "fullName": "Jane Smith",
                            "username": "jane_smith",
                            "email": "jane@example.com"
                        },
                        "text": "Thanks!"
                    }
                ],
                "applauds": ["user123"]
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

### 8. Comment on a Post

- **URL**: `/api/posts/post/comment/:postId`
- **Method**: `GET`
- **Headers**:

    - `Authorization: Bearer <your_token>`

- **Request Body**: `200`:

    ```json
    {
        "text": "Great post!"
    }
    ```

- **Description**: Add a new comment to a specific post

- **Success Response**: `200`

    ```json
    {
        "msg": "Commented Successfully",
        "post": {
            "_id": "6530a3f29bde3f001d432fbc",
            "title": "A Journey to Remember",
            "comments": [
                {
                    "user": "user123",
                    "text": "Great post!",
                    "_id": "6530a3f29bde3f001d432fbd"
                }
            ]
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

### 9. Reply to a Post Comment

- **URL**: `/api/posts/post/comment/reply/:commentId`
- **Method**: `GET`
- **Headers**:

    - `Authorization: Bearer <your_token>`

- **Request Body**:

    ```json
    {
        "postId": "6530a3f29bde3f001d432fbc",
        "text": "Thanks for the comment!"
    }
    ```

- **Description**: Add a reply to a specific comment on a post

- **Success Response**: `200`

    ```json
    {
        "msg": "Replied Successfully",
        "comments": [
            {
                "_id": "6530a3f29bde3f001d432fbd",
                "user": "user123",
                "text": "Great post!",
                "replies": [
                    {
                        "user": "user456",
                        "text": "Thanks for the comment!"
                    }
                ]
            }
        ]
    }
    ```

- **Error Response**:
    - **Status Code**: `404`
        ```json
        {
            "msg": "No Post Found"
        }
        ```

### 10. Like a Post Comment

- **URL**: `/api/posts/post/comment/like/:commentId`
- **Method**: `GET`
- **Headers**:

    - `Authorization: Bearer <your_token>`

- **Request Body**:

    ```json
    {
        "postId": "6530a3f29bde3f001d432fbc"
    }
    ```

- **Description**: Like or unlike a specific comment on a post based on current user's like status

- **Success Response**: `200`

    - **When Liking a Comment**:
        ```json
        {
            "msg": "Liked Post",
            "comments": [
                {
                    "_id": "6530a3f29bde3f001d432fbd",
                    "user": "user123",
                    "text": "Great post!",
                    "applauds": ["user456"]
                }
            ]
        }
        ```
    - **When Unliking a Comment**:
        ```json
        {
            "msg": "Unliked Post",
            "comments": [
                {
                    "_id": "6530a3f29bde3f001d432fbd",
                    "user": "user123",
                    "text": "Great post!",
                    "applauds": []
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

### 11. Update a Comment

- **URL**: `/api/posts/post/comment/:commentId`
- **Method**: `PATCH`
- **Headers**:

    - `Authorization: Bearer <your_token>`

- **Request Body**:

    ```json
    {
        "postId": "6530a3f29bde3f001d432fbc",
        "text": "Updated comment text"
    }
    ```

- **Description**: Updates the text of a specific comment on a post

- **Success Response**: `200`

    ```json
    {
        "msg": "Comment Updated Successfully",
        "comments": [
            {
                "_id": "6530a3f29bde3f001d432fbd",
                "user": "user123",
                "text": "Updated comment text",
                "replies": [],
                "applauds": []
            }
        ]
    }
    ```

- **Error Response**:
    - **Status Code**: `404`
        ```json
        {
            "msg": "No Post Found"
        }
        ```

### 12. Delete a Comment

- **URL**: `/api/posts/post/comment/:commentId`
- **Method**: `DELETE`
- **Headers**:

    - `Authorization: Bearer <your_token>`

- **Request Body**:

    ```json
    {
        "postId": "6530a3f29bde3f001d432fbc"
    }
    ```

- **Description**: Deletes a specific comment from a post

- **Success Response** : `200`

    ```json
    {
        "msg": "Comment Deleted Successfully",
        "comments": []
    }
    ```

- **Error Response**:
    - **Status Code**: `404`
        ```json
        {
            "msg": "No Post Found"
        }
        ```

### 13. Update a Reply

- **URL**: `/api/posts/post/comment/reply/:replyId`
- **Method**: `PATCH`
- **Headers**:

    - `Authorization: Bearer <your_token>`

- **Request Body**: `200`

    ```json
    {
        "postId": "6530a3f29bde3f001d432fbc",
        "commentId": "6530a3f29bde3f001d432fbd",
        "text": "Updated reply text"
    }
    ```

- **Description**: Updates the text of a specific reply within a comment on a post

- **Success Response**:

    ```json
    {
        "msg": "Reply Updated Successfully",
        "comment": {
            "_id": "6530a3f29bde3f001d432fbd",
            "user": "user123",
            "text": "Great post!",
            "replies": [
                {
                    "_id": "6530a3f29bde3f001d432fbe",
                    "user": "user456",
                    "text": "Updated reply text"
                }
            ],
            "applauds": []
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
    - **Status Code**: `404`
        ```json
        {
            "msg": "No Reply Found"
        }
        ```

### 14. Delete a Reply

- **URL**: `/api/posts/post/comment/reply/:replyId`
- **Method**: `DELETE`
- **Headers**:

    - `Authorization: Bearer <your_token>`

- **Request Body**:

    ```json
    {
        "postId": "6530a3f29bde3f001d432fbc",
        "commentId": "6530a3f29bde3f001d432fbd"
    }
    ```

- **Description**: Deletes a specific reply from a comment on a post

- **Success Response** : `200`

    ```json
    {
        "msg": "Reply Deleted Successfully",
        "comment": {
            "_id": "6530a3f29bde3f001d432fbd",
            "user": "user123",
            "text": "Great post!",
            "replies": [],
            "applauds": []
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
    - **Status Code**: `404`
        ```json
        {
            "msg": "No Replies Found"
        }
        ```
