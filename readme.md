# Acrilic Backend

A Node.js backend for the Acrilic application, built with Express, TypeScript, MongoDB, and Redis. This project supports user authentication, real-time communication with Socket.IO, email services, and more.

## 📦 Tech Stack

- **Node.js**
- **Express**
- **TypeScript**
- **MongoDB** with Mongoose
- **Socket.IO**
- **Redis**
- **JWT Authentication**
- **Multer** (file uploads)
- **Nodemailer** (email)
- **Prettier + ESLint** for code formatting
- **Husky + Lint-Staged** for Git hooks

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/acrilic-backend.git
cd acrilic-backend
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://localhost:6379
```

---

## 🛠️ Scripts

| Command        | Description                       |
|----------------|-----------------------------------|
| `yarn dev`     | Run in development mode           |
| `yarn build`   | Compile TypeScript to JavaScript  |
| `yarn start`   | Start the production server       |
| `yarn lint`    | Run ESLint checks                 |
| `yarn lint:fix`| Fix linting issues automatically  |
| `yarn format`  | Format code using Prettier        |
| `yarn seed`    | Seed the database                 |

---

## 🧪 Linting & Formatting

This project uses ESLint and Prettier:

```bash
yarn lint
yarn format
```

Husky and lint-staged are used to auto-fix issues before committing.

---

## 📂 Folder Structure

```
acrilic-backend/
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── index.ts
├── dist/
├── .env
├── package.json
└── tsconfig.json
```

---

## 📜 License

This project is licensed under the MIT License.
