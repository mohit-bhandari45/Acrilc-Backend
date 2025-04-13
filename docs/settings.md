# API Routes Documentation

## Table of Contents

1. [Base URL](#base-url)
2. [Authentication](#authentication)
3. [Profile Routes](#profile-routes)
    - [Get Own Profile](#1-get-own-profile)
    - [Get User Profile by ID](#2-get-user-profile-by-id)
4. [Signup Continuation Screens Routes](#signup-continuation-screens-routes)
    - [Set Username](#1-set-username)
    - [Add Profile Picture](#2-add-profile-picture)
    - [Set Preferences Details](#3-set-preferences-details)
5. [General Settings Routes](#general-settings-routes)
    - [Get Personal General Details](#1-get-personal-general-details)
    - [Update Personal General Details](#2-update-personal-general-details)
    - [Update Profile Picture](#4-update-profile-picture)
    - [Delete Profile Picture](#5-delete-profile-picture)
6. [Preferences Routes](#preferences-routes)
    - [Get Preferences Details](#1-get-preferences-details)
    - [Update Preferences Details](#2-update-preferences-details)
7. [Account & Settings](#account-and-settings-routes)
    - [Change Email](#1-change-email)
    - [Change Password](#2-change-password)

---

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
    ```json
    {
        "msg": "User Found",
        "data": {
            "_id": "507f1f77bcf86cd799439011",
            "username": "jane_doe",
            "fullName": "Jane Doe",
            "profilePicture": "https://i.ibb.co/example.jpg",
            "socialLinks": { "twitter": "https://twitter.com/jane_doe" },
            "bio": "Lover of code and coffee",
            "preferences": ["Woolen", "Ceramic"]
            ...
        }
    }
    ```

### 2. Get User Profile by ID

- **URL**: `/api/user/:userId`
- **Method**: `GET`
- **Headers**:
    - `Authorization: Bearer <your_token>`
- **Path Parameters**:
    - `userId`: The MongoDB ObjectId of the user whose profile is being retrieved.
- **Request Body**: None
- **Response Body**:
    ```json
    {
        "msg": "User Found",
        "data": {
            "_id": "507f1f77bcf86cd799439011",
            "username": "john_doe",
            "fullName": "John Doe",
            "profilePicture": "https://i.ibb.co/example2.jpg",
            "socialLinks": { "linkedin": "https://linkedin.com/in/john_doe" },
            "bio": "Passionate developer",
            "preferences": ["Ceramic"]
            ...
        }
    }
    ```

## Signup Continuation Screens Routes

### 1. Set Username

- **URL**: `/api/user/username`
- **Method**: `POST`
- **Headers**:
    - `Authorization: Bearer <your_token>`
- **Request Body**:
    ```json
    {
        "username": "example@45"
    }
    ```
- **Response Body**:
    ```json
    {
        "msg": "Username Set",
        "data": "example@34"
    }
    ```

### 2. Add Profile Picture

- **URL**: `/api/user/profile-pic`
- **Method**: `POST`
- **Headers**:
    - `Authorization: Bearer <your_token>`
    - `Content-Type: multipart/form-data`
- **Request Body**: Form field: `image` (File upload, e.g., `.jpg`, `.png`).
- **Response Body**:
    ```json
    {
        "msg": "Profile Pic Added",
        "data": "https://i.ibb.co/VYsfQqMY/2.jpg"
    }
    ```

### 3. Set Preferences Details

- **URL**: `/api/user/preferences`
- **Method**: `POST`
- **Headers**:
    - `Authorization: Bearer <your_token>`
- **Request Body**:
    ```json
    {
        "preferences": ["Woolen Craft", "Ceramic"]
    }
    ```
- **Response Body**:
    ```json
    {
        "msg": "Preferences Added Successfully",
        "data": ["Woolen Craft", "Pottery"]
    }
    ```

## General Settings Routes

### 1. Get Personal General Details

- **URL**: `/api/user/`
- **Method**: `GET`
- **Headers**:
    - `Authorization: Bearer <your_token>`
- **Response Body**:
    ```json
    {
        "msg": "Preferences Added Successfully",
        "data": {
            "username": "example@34",
            "fullName": "example rawat",
            "bio": "This is example",
            "story": "This is example in long",
            "profilePicture": "",
            "socialLinks": {
                "Instagram": "https://instagram.com/sophieturner",
                "Twitter": "https://twitter.com/sophieturner"
            },
            "visibility": "public",
            "preferences": ["Woolen", "Ceramic"]
        }
    }
    ```

### 2. Update Personal General Details

- **URL**: `/api/user/`
- **Method**: `PUT`
- **Headers**:
    - `Authorization: Bearer <your_token>`
- **Request Body**:
    ```json
    {
        "fullName": "Jane Updated",
        "username": "jane_updated",
        "bio": "Updated bio: Code, coffee, and more!",
        "story": "This is the new story to talk about and I am very happy to see you with me",
        "socialLinks": {
            "Instagram": "https://instagram.com/sophieturner",
            "Twitter": "https://twitter.com/sophieturner"
        },
        "visibility": "private"
    }
    ```
    - `Authorization: Bearer <your_token>`
- **Response Body**:
    ```json
    {
        "msg": "User Updated"
    }
    ```

### 4. Update Profile Picture(Problem for now)

- **URL**: `/api/user/profile-pic`
- **Method**: `PUT`
- **Headers**:
    - `Authorization: Bearer <your_token>`
- **Request Body**: Form field: `image` (File upload, e.g., `.jpg`, `.png`).
- **Response Body**:
    ```json
    {
        "msg": "Profile Pic Updated",
        "data": "https://i.ibb.co/VYsfQqMY/2.jpg"
    }
    ```

### 5. Delete Profile Picture

- **URL**: `/api/user/profile-pic`
- **Method**: `DELETE`
- **Headers**:
    - `Authorization: Bearer <your_token>`
- **Response Body**:
    ```json
    {
        "msg": "Profile Pic Deleted"
    }
    ```

## Account and Settings Routes

### 1. Change Email

- **URL**: `/api/user/change-email`
- **Method**: `POST`
- **Headers**:
    - `Authorization: Bearer <your_token>`
- **Response Body**:
    ```json
    {
        "msg": "Verification email sent. Please check your inbox."
    }
    ```

### 2. Change Password

- **URL**: `/api/user/change-password`
- **Method**: `POST`
- **Headers**:
    - `Authorization: Bearer <your_token>`
- **Response Body**:
    ```json
    {
        "msg": "Password Changed Successfully"
    }
    ```
