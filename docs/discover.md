# API Routes Documentation

## Base URL: `http://localhost:8000`

## Table of Contents

1. [Discover](#discover)
    - [Get Trending Fortes](#1-get-trending-fortes)
    - [Search Posts by Text](#2-search-posts-by-text)
    - [Search Posts by Forte](#3-search-posts-by-forte)

---

## Common Error Response

- Status Code: 500
    ```json
    {
        "msg": "Internal Server Error"
    }
    ```

## Discover

### 1. Get Trending Fortes

- **URL**: `/api/discover/trending`
- **Method**: `GET`
- **Description**: Returns a list of trending fortes with calculated scores based on recent activity, applauds, comments, and replies.
- **Success Response**:
    ```json
    [
        {
            "forte": "Poetry",
            "postCount": 12,
            "totalApplauds": 45,
            "totalComments": 23,
            "totalReplies": 10,
            "recentPostCount": 5,
            "score": 200
        }
    ]
    ```

---

### 2. Search Posts by Text

- **URL**: `/api/discover`
- **Method**: `GET`
- **Query Parameters**:
    - `text` (required): Text to search
    - `limit` (optional): Number of results (default: 10)
    - `cursor` (optional): Used for pagination (fetches posts created before this timestamp)
- **Example**:
    ```
    /api/discover?text=Explore&limit=10&cursor=2023-08-01T10:30:00Z
    ```
- **Success Response**:
    ```json
    {
        "msg": "",
        "posts": [
            {
                "_id": "...",
                "title": "...",
                "forte": "..."
            }
        ]
    }
    ```

### 3. Search Posts by forte

- **URL**: `/api/discover/forte
- **Method**: `GET`
- **Query Parameters**:
    - `forte` (required): forte to search
- **Example**:
    ```
    /api/discover/forte?forte="AI"
    ```
- **Success Response**:
    ```json
    {
        "msg": "",
        "posts": [
            {
                "_id": "...",
                "title": "...",
                "forte": "..."
            }
        ]
    }
    ```