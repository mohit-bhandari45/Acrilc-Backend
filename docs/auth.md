# API Routes Documentation

## Base URL: `http://localhost:8000`

## Table of Contents

1. [Authentication](#authentication)
    - [Signup](#1-signup)
    - [Login](#2-login)
2. [Post Routes](#post-routes)
    - [Creating a Post](#1-creating-a-post)
    - [Get Posts by Author](#2-get-posts-by-author)
    - [Get Posts of Fellow Artist](#get-posts-of-fellow-artist)

## Common Error Response

- Status Code: 500
    ```json
    {
        "msg": "Internal Server Error"
    }
    ```

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