# API Routes Documentation

## Base URL: `http://localhost:8000`

## Table of Contents

1. [Storyboard Routes](#storyboard-routes)
    - [Create Storyboard](#1-create-storyboard)
    - [Update Storyboard](#2-update-storyboard)
    - [Get All Storyboards](#3-get-all-storyboards)
    - [Get Specific Storyboard](#4-get-specific-storyboard)
    - [Delete Storyboard](#5-delete-storyboard)

## Common Error Response

- **Status Code**: 500
    ```json
    {
        "msg": "Internal Server Error"
    }
    ```

## Storyboard Routes

### 1. Create Storyboard

- **URL**: `/api/story/:postId`
- **Method**: `PATCH`
- **Description**: Create a new storyboard for a post.
- **Headers**: `Content-Type: application/json`
- **Request Body**:
    ```json
    {
        "title": "Storyboard Title",
        "description": "A detailed description of the storyboard",
        "media": [
            {
                "url": "https://example.com/image.jpg",
                "type": "image"
            }
        ]
    }
    ```
- **Success Response**:

    - Status Code: 200

    ```json
    {
        "msg": "StoryBoard created",
        "data": {
            "title": "Storyboard Title",
            "description": "A detailed description of the storyboard",
            "media": [
                {
                    "url": "https://example.com/image.jpg",
                    "type": "image"
                }
            ]
        }
    }
    ```

- **Error Response**:
    - Status Code: 404
    ```json
    {
        "msg": "Post Not Found"
    }
    ```

### 2. Update Storyboard

- **URL**: `/api/story/:storyboardId`
- **Method**: `PATCH`
- **Description**: Update an existing storyboard's title, description, or media.
- **Headers**: `Content-Type: application/json`
- **Request Body**:
    ```json
    {
        "title": "Updated Storyboard Title",
        "description": "Updated description of the storyboard",
        "media": [
            {
                "url": "https://example.com/updated-image.jpg",
                "type": "image"
            }
        ]
    }
    ```
- **Success Response**:

    - Status Code: 200

    ```json
    {
        "msg": "Storyboard updated successfully!",
        "data": {
            "title": "Updated Storyboard Title",
            "description": "Updated description of the storyboard",
            "media": [
                {
                    "url": "https://example.com/updated-image.jpg",
                    "type": "image"
                }
            ]
        }
    }
    ```

- **Error Response**:
    - Status Code: 404
    ```json
    {
        "msg": "Storyboard Not Found!"
    }
    ```

### 3. Get All Storyboards

- **URL**: `/api/user/:userId`
- **Method**: `GET`
- **Description**: Get all storyboards for a user.
- **Headers**: `Content-Type: application/json`
- **Response Body**:

    - **Success Response**:
        - Status Code: 200
        ```json
        {
            "msg": "StoryBoards found",
            "data": [
                {
                    "title": "Storyboard Title 1",
                    "description": "Description for storyboard 1",
                    "media": [
                        {
                            "url": "https://example.com/image1.jpg",
                            "type": "image"
                        }
                    ]
                },
                {
                    "title": "Storyboard Title 2",
                    "description": "Description for storyboard 2",
                    "media": [
                        {
                            "url": "https://example.com/image2.jpg",
                            "type": "image"
                        }
                    ]
                }
            ]
        }
        ```

- **Error Response**:
    - Status Code: 500
    ```json
    {
        "msg": "Internal Server Error"
    }
    ```

### 4. Get Specific Storyboard

- **URL**: `/api/story/:storyboardId`
- **Method**: `GET`
- **Description**: Get details of a specific storyboard.
- **Headers**: `Content-Type: application/json`
- **Response Body**:

    - **Success Response**:
        - Status Code: 200
        ```json
        {
            "msg": "Storyboard Found",
            "data": {
                "title": "Storyboard Title",
                "description": "Description for specific storyboard",
                "media": [
                    {
                        "url": "https://example.com/image.jpg",
                        "type": "image"
                    }
                ]
            }
        }
        ```

- **Error Response**:
    - Status Code: 404
    ```json
    {
        "msg": "Storyboard Not Found"
    }
    ```

### 5. Delete Storyboard

- **URL**: `/api/story/:storyboardId`
- **Method**: `DELETE`
- **Description**: Delete a specific storyboard.
- **Headers**: `Content-Type: application/json`
- **Success Response**:

    - Status Code: 200

    ```json
    {
        "msg": "Storyboard Deleted Successfully"
    }
    ```

- **Error Response**:
    - Status Code: 404
    ```json
    {
        "msg": "Post Not Found"
    }
    ```

---

## Notes

- Make sure to upload your files under the `media` key when creating or updating a storyboard.
- All responses are in JSON format, and any error details will include a `msg` field describing the error.
