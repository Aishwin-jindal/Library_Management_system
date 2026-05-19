# Project Report: Library Management System

## 1. Introduction
The Library Management System is a comprehensive web-based application designed to manage the core operations of a modern library. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js), this project digitizes the management of books, user registrations, and reading progress, providing a seamless experience for both readers and library administrators.

## 2. System Requirements
- **Hardware Requirements:**
  - Processor: Intel Core i3 or higher
  - RAM: 4GB minimum
  - Storage: 256GB SSD or HDD
- **Software Requirements:**
  - OS: Windows 10/11, macOS, or Linux
  - Environment: Node.js (v16+)
  - Database: MongoDB (Local or Atlas)
  - Browser: Google Chrome, Mozilla Firefox, or Safari

## 3. Technology Stack (MERN)
- **Frontend (View):** React.js (Vite), Vanilla CSS for custom, premium styling
- **Backend (Controller):** Node.js, Express.js
- **Database (Model):** MongoDB, Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT), Google OAuth 2.0
- **File Upload:** Multer (for profile pictures)

## 4. System Architecture
The project strictly follows the **MVC (Model-View-Controller)** architectural pattern:
- **Model (M):** Defines data structures and business logic (Mongoose schemas in `backend/src/models/`). Includes User and Book models.
- **View (V):** The React frontend (`frontend/src/pages/`) responsible for rendering the UI and handling user interactions.
- **Controller (C):** Express route handlers (`backend/src/controllers/`) that process incoming requests, interact with models, and return responses.

## 5. ER Diagram Description
The database consists of two primary entities for this evaluation phase:
1.  **User Entity**:
    - `_id` (Primary Key)
    - `name` (String)
    - `email` (String, Unique)
    - `password` (String, Hashed)
    - `profilePic` (String, URL)
    - `role` (Enum: user, admin)
    - `isGoogleUser` (Boolean)
2.  **Book Entity**:
    - `_id` (Primary Key)
    - `title` (String)
    - `author` (String)
    - `coverImage` (String, URL)
    - `price` (Number)
    - `category` (String)
    - `status` (Enum: Available, Issued)
    - `summary` (String)

## 6. Implementation Details (Mandatory Requirements Fulfilled)
- **Minimum 5 Web Pages:**
  1. `Login Page`: Standard credential and Google Login.
  2. `Signup Page`: User registration with `multer` for profile picture upload.
  3. `Dashboard / Home Page`: Displays statistics, recently added books, and user profile data.
  4. `Books Directory`: A catalog showing all available and issued books.
  5. `Book Details Page`: In-depth view of a specific book including summary and status.
- **Security Features:**
  - Passwords are cryptographically hashed using `bcryptjs` before storage.
  - API endpoints are secured using `jsonwebtoken` (JWT) authentication middleware.
  - Implemented `@react-oauth/google` for seamless "Login by Google account".
- **Data Storage:** MongoDB is utilized for highly scalable and flexible JSON-like document storage.

## 7. Conclusion
This Library Management System successfully fulfills all constraints and requirements of Backend Project Evaluation-III. It demonstrates a strong understanding of full-stack JavaScript development, RESTful API design, database modeling, and secure authentication mechanisms.
