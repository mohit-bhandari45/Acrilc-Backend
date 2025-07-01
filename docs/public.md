# 📘 API Routes Documentation

## Base URL: `http://localhost:8000/public`

---

## Table of Contents

1. [Featured](#1-featured)

    - [Get Featured Artists](#get-featured-artists)
    - [Get Featured Arts](#get-featured-arts)
    - [Get Featured Markets](#get-featured-markets)

2. [Portfolio](#2-portfolio)

    - [Get Portfolio by Username or URL](#get-portfolio-by-username-or-url)

3. [Posts](#3-posts)

    - [Get Posts by Author](#get-posts-by-author)

4. [Marketplace](#4-marketplace)

    - [Get Marketplace Projects by Author](#get-marketplace-projects-by-author)

5. [Password Reset](#5-password-reset)

    - [Forgot Password](#forgot-password)
    - [Reset Password](#reset-password)

---

## Common Error Response

- **Status Code**: `500`

    ```json
    {
        "msg": "Internal Server Error"
    }
    ```

---

## 1. Featured

### Get Featured Artists

- **URL**: `/featured/artists`
- **Method**: `GET`
- **Description**: Retrieves a list of all artists.
- **Success Response**:

    ```json
    {
        "msg": "Artists found",
        "data": [
            /* array of user objects */
        ]
    }
    ```

---

### Get Featured Arts

- **URL**: `/featured/arts`
- **Method**: `GET`
- **Description**: Retrieves arts grouped by their `forte` (category).
- **Success Response**:

    ```json
    {
        "msg": "Arts found",
        "data": {
            "digital": [
                /* array of posts */
            ],
            "painting": [
                /* array of posts */
            ]
        }
    }
    ```

---

### Get Featured Markets

- **URL**: `/featured/markets`
- **Method**: `GET`
- **Description**: Retrieves featured marketplace projects.
- **Success Response**:

    ```json
    {
        "msg": "Projects found",
        "data": [
            /* array of projects */
        ]
    }
    ```

---

## 2. Portfolio

### Get Portfolio by Username or URL

- **URL**: `/portfolio/{identifier}`
- **Method**: `GET`
- **Description**: Retrieves a user either by `username` or `portfolioURL`.
- **Path Parameter**:

    - `identifier` – Either the username or the portfolio URL.

- **Success Response**:

    ```json
    {
        "msg": "Got user",
        "data": {
            /* user object */
        }
    }
    ```

- **Error Responses**:

    - Status Code: `400`

        ```json
        {
            "msg": "No user found!"
        }
        ```

---

## 3. Posts

### Get Posts by Author

- **URL**: `/user/{userId}/featured-posts`
- **Method**: `GET`
- **Query Params**:

    - `page` – (optional) Page number (default: `1`)

- **Description**: Retrieves paginated posts created by a user.
- **Success Response**:

    ```json
    {
        "msg": "Got All posts",
        "data": [
            /* array of posts */
        ]
    }
    ```

- **If No Posts Found**:

    ```json
    {
        "msg": "No Posts Found!",
        "data": []
    }
    ```

---

## 4. Marketplace

### Get Marketplace Projects by Author

- **URL**: `/user/{userId}/featured-market`
- **Method**: `GET`
- **Query Params**:

    - `page` – (optional) Page number (default: `1`)

- **Description**: Retrieves paginated marketplace projects created by a user.
- **Success Response**:

    ```json
    {
        "msg": "Got All Projects",
        "data": [
            /* array of projects */
        ]
    }
    ```

- **If No Projects Found**:

    ```json
    {
        "msg": "No Projects Found!",
        "data": []
    }
    ```

---

## 5. Password Reset

### Forgot Password

- **URL**: `/password/forgot`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Request Body**:

    ```json
    {
        "email": "user@example.com"
    }
    ```

- **Description**: Sends a password reset email if the user exists.
- **Success Response**:

    ```json
    {
        "msg": "Password reset link sent"
    }
    ```

- **Error Response**:

    - Status Code: `404`

        ```json
        {
            "msg": "User not found"
        }
        ```

---

### Reset Password

- **URL**: `/password/reset-password/{token}`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Request Body**:

    ```json
    {
        "newPassword": "yourNewSecurePassword"
    }
    ```

- **Path Parameter**:

    - `token`: Token received in the email

- **Description**: Resets the user password using the token.
- **Success Response**:

    ```json
    {
        "msg": "Password reset successful"
    }
    ```

- **Error Response**:

    - Status Code: `400`

        ```json
        {
            "msg": "Invalid or expired token"
        }
        ```
