## 📚 API Documentation

### Base URL

```
http://localhost:8000
```

---

## 📂 Endpoints

### 1. Get Featured Artists

- **URL**: `/public/featured/artists`
- **Method**: `GET`
- **Description**: Returns all user records (can be enhanced to return only users marked as featured).
- **Success Response**:

```json
{
    "msg": "Arts found",
    "data": [
        {
            "_id": "665e1d2c3abc1234567890",
            "username": "artbyram",
            "email": "ram@example.com",
            "bio": "Digital painter and sketch artist",
            "createdAt": "2025-06-18T08:30:00.000Z"
        }
    ]
}
```

---

### 2. Get Featured Art

- **URL**: `/public/featured/arts`
- **Method**: `GET`
- **Description**: Returns all art post records (can be enhanced to return only posts marked as featured).
- **Success Response**:

```json
{
    "msg": "Arts found",
    "data": {
        "digital": [
            {
                "_id": "665e1e9a25d789abcdef1234",
                "title": "Sunset Bliss",
                "imageUrl": "https://example.com/art/sunset.jpg",
                "artistId": "665e1d2c3abc1234567890",
                "description": "Acrylic on canvas",
                "createdAt": "2025-06-18T09:00:00.000Z",
                "forte": "digital"
            }
        ],
        "sketch": [
            {
                "_id": "665e1e9a25d789abcdef5678",
                "title": "Nature Lines",
                "imageUrl": "https://example.com/art/sketch.jpg",
                "artistId": "665e1d2c3abc1234567890",
                "description": "Graphite on paper",
                "createdAt": "2025-06-18T10:00:00.000Z",
                "forte": "sketch"
            }
        ]
    }
}
```

---

### 3. Get Featured Market

- **URL**: `/public/featured/markets`
- **Method**: `GET`
- **Description**: Returns all marketplace.
- **Success Response**:

```json
{
    "msg": "Projects found",
    "data": [{
        author: "60f6f9c2d4f1b23456789abc",
        image: "https://example.com/project1.jpg",
        title: "Urban Skyline Photography",
        yearOfMaking: "2023",
        description: "A breathtaking collection of urban skyline photos shot during twilight.",
        pricingOptions: {
        basic: 100,
        premium: 250,
        deluxe: 500
        },
        additionalInfo: "Includes free digital prints for premium and deluxe packages.",
        forte: "Photography",
        keywords: "urban, skyline, photography, twilight, cityscape",
        contactInfo: "email@example.com",
        showContactInfo: true,
        status: "published"
    },
    {
        author: "60f6f9c2d4f1b23456789abc",
        image: "https://example.com/project2.jpg",
        title: "AI-Powered Resume Builder",
        yearOfMaking: "2024",
        description: "A smart resume builder that uses AI to tailor content based on job roles.",
        pricingOptions: {
        basic: 50,
        premium: 150,
        deluxe: 300
        },
        additionalInfo: "Includes LinkedIn optimization with premium package.",
        forte: "Software Development",
        keywords: "AI, resume, builder, job, automation",
        contactInfo: "resume.ai@example.com",
        showContactInfo: false,
        status: "draft"
    }]
}
```

---

## ❌ Error Response

- **Status Code**: `500`

```json
{
    "msg": "Server error. Please try again!"
}
```

---

## 📁 Folder Structure

```
src/
├── models/
│   ├── user.ts
│   └── post.ts
├── handlers/
│   └── featured.ts
├── routes/
│   └── featured.ts
├── index.ts
└── ...
```

---

## 🔮 Future Improvements

- Add filtering for `featured: true` field in both endpoints.
- Add pagination support (`limit`, `cursor`, etc.).
- Add user authentication for modifying data.
- Add Swagger or Postman docs.

---
