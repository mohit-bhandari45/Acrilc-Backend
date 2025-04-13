# API Routes Documentation

## Base URL: `http://localhost:8000`

## Table of Contents

1. [Collection Routes](#collection-routes)
    - [Get All Collections](#1-get-all-collections)
    - [Add a Collection](#2-add-a-collection)
    - [Update a Collection](#3-update-a-collection)
    - [Delete a Collection](#4-delete-a-collection)
    - [Get Collection Posts](#5-get-collection-posts)
    - [Remove Post from Collection](#6-remove-post-from-collection)

## Common Error Response

- **Status Code: 500**
    ```json
    {
        "msg": "Internal Server Error"
    }
    ```

## Collection Routes

### 1. Get All Collections

- **URL**: `/api/collections`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Success Response**:
    ```json
    {
        "msg": "Collections Found",
        "data": [
            {
                "_id": "613b32a1f3f99b001a2b4c21",
                "title": "My Favorite Videos",
                "userId": "613b32a1f3f99b001a2b4c20",
                "visibility": "public",
                "posts": []
            }
        ]
    }
    ```

### 2. Add a Collection

- **URL**: `/api/collections`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
    ```json
    {
        "title": "My New Collection",
        "visibility": "private",
        "posts": []
    }
    ```
- **Success Response**:
    ```json
    {
        "msg": "Collection Created",
        "data": {
            "_id": "613b32a1f3f99b001a2b4c21",
            "title": "My New Collection",
            "userId": "613b32a1f3f99b001a2b4c20",
            "visibility": "private",
            "posts": []
        }
    }
    ```

### 3. Update a Collection

- **URL**: `/api/collections/:collectionId`
- **Method**: `PUT`
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
    ```json
    {
        "title": "Updated Collection Title",
        "visibility": "public"
    }
    ```
- **Success Response**:
    ```json
    {
        "msg": "Collection updated"
    }
    ```

### 4. Delete a Collection

- **URL**: `/api/collections/:collectionId`
- **Method**: `DELETE`
- **Headers**: `Authorization: Bearer <token>`
- **Success Response**:
    ```json
    {
        "msg": "Collection Deleted"
    }
    ```

### 5. Get Collection Posts

- **URL**: `/api/collections/:collectionId`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Success Response**:
    ```json
    {
        "msg": "All Posts",
        "data": [
            {
                "_id": "613b32a1f3f99b001a2b4c25",
                "title": "Sample Post",
                "content": "This is a sample post content",
                "author": "613b32a1f3f99b001a2b4c20"
            }
        ]
    }
    ```

### 6. Remove Post from Collection

- **URL**: `/api/collections/:collectionId/remove-post`
- **Method**: `PUT`
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:

    ```json
    {
        "postId": "613b32a1f3f99b001a2b4c25"
    }
    ```

- **Success Response**:
    ```json
    {
        "msg": "Post Deleted"
    }
    ```
