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
    - [Update a Post](#2-updating-a-post)
    - [Get Posts of a User](#3-get-posts-of-a-user)
    - [Get Single Post](#4-get-single-post)
    - [Delete a Post](#5-delete-a-post)
    
    - [Applaud a Post Comment](#12-applaud-a-post-comment)
    - [Reply to a Post Comment](#13-reply-to-a-post-comment)
    - [Update a Reply](#14-update-a-reply)
    - [Delete a Reply](#15-delete-a-reply)
    - [Applaud in a Reply](#16-applaud-in-a-reply)

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
        "data": {
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

### 2. Updating a Post

- **URL**: `/api/posts/:postId`
- **Method**: `PATCH`
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
        "msg": "Post Updated Successfully",
        "data": {
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
- **Error Response** `404`:
    ```json
    {
        "msg": "Post Not Found"
    }
    ```

### 3. Get Posts of a User

- **URL**: `/api/posts/user/:userId`
- **Method**: `GET`
- **Headers**:

    - `Authorization: Bearer <your_token>`

- **Success Response**: `200`
    ```json
    {
        "msg": "Got All Posts" or "No Posts found!",
        // if post is there
        "data": [
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

### 4. Get Single Post

- **URL**: `/api/posts/:postId`
- **Method**: `GET`
- **Headers**:

    - `Authorization: Bearer <your_token>`

- **Success Response**: `200`
    ```json
    {
        "msg": "Post Found",
        "data": {
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
- **Error Response** `404`:
    ```json
    {
        "msg": "Post Not Found"
    }
    ```

### 5. Delete a Post

- **URL**: `/api/posts/:postId`
- **Method**: `DELETE`
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

### 12. Applaud a Post Comment

- **URL**: `/api/posts/post/:postId/comment/:commentId/applaud`
- **Method**: `GET`
- **Headers**:

    - `Authorization: Bearer <your_token>`

- **Description**: Applaud or unApplaud a specific comment on a post based on current user's applaud status

- **Success Response**: `200`

    - **When Applauding a Comment**:
        ```json
        {
            "msg": "Applauded Post",
            "data": {
                "_id": "6530a3f29bde3f001d432fbd",
                "user": "user123",
                "text": "Great post!",
                "applauds": ["user456"]
            }
        }
        ```
    - **When UnApplauding a Comment**:
        ```json
        {
            "msg": "UnApplauded Post",
            "data": {
                "_id": "6530a3f29bde3f001d432fbd",
                "user": "user123",
                "text": "Great post!",
                "applauds": ["user456"]
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
    - **Status Code**: `404`
        ```json
        {
            "msg": "Comment Not found"
        }
        ```

### 13. Reply to a Post Comment

- **URL**: `/api/posts/post/:postId/comment/:commentId/reply`
- **Method**: `POST`
- **Headers**:

    - `Authorization: Bearer <your_token>`

- **Request Body**:

    ```json
    {
        "text": "Thanks for the comment!"
    }
    ```

- **Description**: Add a reply to a specific comment on a post

- **Success Response**: `200`

    ```json
    {
        "msg": "Replied Successfully",
        "data": {
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

### 14. Update a Reply

- **URL**: `/api/posts/post/:postId/comment/:commentId/reply/:replyId`
- **Method**: `PATCH`
- **Headers**:

    - `Authorization: Bearer <your_token>`

- **Request Body**: `200`

    ```json
    {
        "text": "Updated reply text"
    }
    ```

- **Description**: Updates the text of a specific reply within a comment on a post

- **Success Response**:

    ```json
    {
        "msg": "Reply Updated Successfully",
        "data": {
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

### 15. Delete a Reply

- **URL**: `/api/posts/post/:postId/comment/:commentId/reply/:replyId`
- **Method**: `DELETE`
- **Headers**:

    - `Authorization: Bearer <your_token>`

- **Description**: Deletes a specific reply from a comment on a post

- **Success Response** : `200`

    ```json
    {
        "msg": "Reply Deleted Successfully",
        "data": {
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

### 16. Applaud in a Reply

- **URL**: `/api/posts/post/:postId/comment/:commentId/reply/:replyId/applaud`
- **Method**: `GET`
- **Headers**:

    - `Authorization: Bearer <your_token>`

- **Description**: Deletes a specific reply from a comment on a post

- **Success Response** : `200`

    ```json
    {
        "msg": "Applauded Successfully in the Reply",
        "data": {
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
            "msg": "No Reply Found"
        }
        ```
