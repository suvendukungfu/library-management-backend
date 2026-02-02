# Library Management System API

A complete, production-ready CRUD backend application tailored for a **Library Management System**. Built with **Node.js, Express.js, and MongoDB**, strictly following **Object-Oriented Programming (OOP)** principles and a **Clean Layered Architecture**.

## 💡 The Concept: "Digital Librarian"

This system is designed as a central brain for a library's digital operations, solving two core problems: **Inventory** and **Access**.

### 1. The Roles (Actors)
- **🦸‍♂️ The Librarian (Admin)**: Holds the keys. They can **Add** new books, **Update** records, and **Remove** inventory.
- **👤 The Member (User)**: The reader. They can **Search**, **Filter**, and **Browse** the catalog but cannot modify it.

### 2. Smart Cataloging
Instead of a static list, this API implements:
- **Search**: Find books instantly by Title or Author.
- **Filtering**: Drill down by Category (e.g., "Fiction") or Year.
- **Pagination**: Efficiently handles large datasets.

## 🚀 Features

- **Object-Oriented Design**: All layers (Controllers, Services, Repositories) are implemented as classes.
- **Layered Architecture**: Separation of concerns (`Controller` -> `Service` -> `Repository` -> `Model`).
- **Authentication**: Secure JWT-based auth with User and Admin roles.
- **CRUD Operations**: Full management for Books.
- **Advanced Querying**: Search (keywords), Filter (category, year), Sort, and Pagination.
- **Validation**: Strict input validation using `express-validator`.
- **Error Handling**: Centralized error handling with custom `ApiError` class.
- **Security**: Helmet headers, CORS enabled, Password Hashing (bcrypt).

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Auth**: JSON Web Tokens (JWT) + bcrypt
- **Validation**: express-validator
- **Utils**: dotenv, cors, helmet, morgan

## 📂 Folder Structure

```
src/
 ├── config/           # Database and Env configurations
 ├── controllers/      # Request/Response handling (Class-based)
 ├── services/         # Business Logic Layer (Class-based)
 ├── repositories/     # Data Access Layer (Class-based)
 ├── models/           # Mongoose Schemas & Interfaces
 ├── routes/           # API Routes definitions
 ├── middlewares/      # Auth, Error, Validation middlewares
 ├── utils/            # Helpers (ApiError, ApiResponse, Pagination)
 └── app.ts            # App Entry Point
```

## 🔧 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository_url>
   cd library-management-api
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   - Create a `.env` file in the root directory.
   - Copy the following default values:
     ```env
     PORT=3000
     MONGO_URI=mongodb://localhost:27017/library_management
     JWT_SECRET=your_super_secret_key
     JWT_EXPIRES_IN=1d
     NODE_ENV=development
     ```

4. **Run the Application**
   - **Development Mode**:
     ```bash
     npm run dev
     ```
   - **Build & Run**:
     ```bash
     npm run build
     npm start
     ```

## 📡 API Endpoints

### Authentication
| Method | Endpoint          | Description             | Auth Required |
|:-------|:------------------|:------------------------|:--------------|
| POST   | `/api/v1/auth/register` | Register a new user     | ❌            |
| POST   | `/api/v1/auth/login`    | Login user & get Token  | ❌            |
| GET    | `/api/v1/auth/me`       | Get current user profile| ✅            |

### Books (Inventory)
| Method | Endpoint       | Description                 | Auth Required   |
|:-------|:---------------|:----------------------------|:----------------|
| GET    | `/api/v1/books`         | Get all books (Search/Filter/Sort) | ❌ |
| GET    | `/api/v1/books/:id`     | Get single book by ID              | ❌ |
| POST   | `/api/v1/books`         | Create a new book                  | ✅ (Admin) |
| PUT    | `/api/v1/books/:id`     | Update a book                      | ✅ (Admin) |
| DELETE | `/api/v1/books/:id`     | Delete a book                      | ✅ (Admin) |

## 🧪 Sample API Requests

**1. Create Book (Admin)**
*Header: `Authorization: Bearer <token>`*
```json
POST /api/v1/books
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "isbn": "978-0132350884",
  "category": "Technology",
  "publishedYear": 2008,
  "copies": 5
}
```

**2. Search & Filter Books**
```
GET /api/v1/books?search=Clean&category=Technology&sort=publishedYear:desc&page=1&limit=5
```

## 🔮 Future Improvements

- **Unit Testing**: Add Jest/Supertest for automated testing.
- **Rate Limiting**: Prevent abuse using `express-rate-limit`.
- **File Uploads**: Add cover image upload for books using `multer`.
- **Advanced Permissions**: Granular ACL (Access Control List).

---
**Author**: Suvendu Sahoo
