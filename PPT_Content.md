# Presentation Slides: Library Management System

## Slide 1: Title Slide
- **Title**: Library Management System
- **Subtitle**: Backend Project Evaluation-III
- **Presented By**: [Your Name/Roll Number]
- **Technology**: MERN Stack

## Slide 2: Project Overview
- **Goal**: Digitize and streamline library operations.
- **Key Features**:
  - Secure User Authentication
  - Book Catalog & Search
  - Dashboard Analytics
  - Profile Image Uploading
- **Architecture**: MVC (Model-View-Controller)

## Slide 3: Tech Stack (MERN)
- **MongoDB**: NoSQL database for flexible data storage.
- **Express.js**: Backend web application framework.
- **React.js**: Frontend library for building the UI (View).
- **Node.js**: JavaScript runtime environment for the backend.
- **Additional Tools**: Vite, Multer, JSON Web Tokens, Google OAuth.

## Slide 4: Mandatory Requirements Fulfilled
- **✅ Minimum 5 Web Pages**: Home/Dashboard, Signup, Login, Book Directory, Book Details.
- **✅ Security**: JWT for secure API routing & Google OAuth 2.0 integration.
- **✅ Database**: MongoDB for `Users` and `Books` collections.
- **✅ Profile Upload**: `multer` middleware implemented for image uploads during Signup.
- **✅ Architecture**: Strict adherence to the MVC pattern.

## Slide 5: System Architecture (MVC)
- **Model**: Mongoose schemas defining `User` and `Book` entities in MongoDB.
- **View**: React components handling state and rendering data to the user.
- **Controller**: Express routing functions processing logic (Authentication, CRUD operations).

## Slide 6: Database Schema (ER Diagram)
- **User**: `_id`, `name`, `email`, `password` (hashed), `profilePic`, `role`.
- **Book**: `_id`, `title`, `author`, `price`, `coverImage`, `category`, `status`.

## Slide 7: Security & Authentication
- **Custom Auth**: Passwords hashed with `bcryptjs`. Stateless authentication via `jsonwebtoken` (JWT) stored in LocalStorage.
- **Google Auth**: Implemented using `@react-oauth/google` on frontend and `google-auth-library` on backend to verify Identity Tokens securely.

## Slide 8: Future Enhancements
- Implement Book Issuing and Returning logic.
- Add Admin Panel for adding/editing books and managing users.
- Integrate automated email notifications for due dates.
- Add payment gateway for late fees.

## Slide 9: Q&A
- **Thank You!**
- Any questions?
