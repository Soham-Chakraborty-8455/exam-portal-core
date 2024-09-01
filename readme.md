
# Examination Portal

This project is an Examination Portal built using Node.js and Express.js. The portal allows users to sign up, log in, take exams, and for teachers to upload question papers and set timers. The project uses PostgreSQL as the database and Sequelize as the ORM.

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)

## Project Description

This project is designed to provide a comprehensive platform for conducting online examinations. It includes functionalities for user authentication, exam management, student performance tracking, and much more. The backend is built with Node.js and Express.js to ensure scalability and maintainability.

## Features

- **User Authentication**: Sign up, log in, and log out functionality using sessions.
- **Exam Management**: Teachers can upload questions, set exam timings, and manage exams.
- **Student Portal**: Students can log in, choose subjects, take exams, and view their results.
- **Student Dashboard**: Student can analyze performance and provide study materials based on weak areas.
- **Exam Timer**: Student have to take the test with a timer with auto submission feature once the timer exhausts.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **PostgreSQL**: Relational database management system.
- **Sequelize**: Promise-based Node.js ORM for SQL databases.
- **Express-Session**: Middleware for managing sessions.
- **bcryptjs**: Library to salt and hash passwords.
- **Nodemon**: Utility that monitors for changes and automatically restarts the server.
- **Mongodb**: Storing and Managing session details.

## Project Structure

```
src/
│
├── controllers/
│   ├── authController.js
│   ├── examController.js
│   ├── performanceController.js
│   └── questionController.js
│
├── models/
│   ├── userModel.js
│   ├── examModel.js
│   ├── questionModel.js
│   └── performanceModel.js
│
├── routes/
│   ├── authRoutes.js
│   ├── examRoutes.js
│   ├── questionRoutes.js
│   └── performanceRoutes.js
│
├── services/
│   ├── questionService.js
│   ├── examService.js
│   └── performanceService.js
│
├── utils/
│   ├── db.js
│   └── session.js
│
└── middleware/
    ├── auth.js
    └── association.js
    
```

## Setup and Installation

### Prerequisites

- Node.js (v14.x or higher)
- PostgreSQL
- npm (Node Package Manager)

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/Soham-Chakraborty-8455/exam-portal-core.git
    cd examination-portal
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up the PostgreSQL database**

    Create a PostgreSQL database and update the connection details in `src/utils/db.js`.

4. **Run migrations (if any)**

    ```bash
    npx sequelize db:migrate
    ```

5. **Set up environment variables**

    Create a `.env` file in the root directory and add the necessary environment variables:

    ```
    DATABASE_URL=your-database-url
    SESSION_SECRET=your-session-secret
    mongoURI=your-mongo-connection-url
    PORT=backend-port-number
    ```

## Running the Application

### Development Mode

```bash
npm run start:dev
```

This will start the server using `nodemon`, which automatically restarts the server on file changes.

### Production Mode

```bash
npm start
```

## Authentication

Authentication is handled using sessions. Upon successful login, a session is created for the user, and a session cookie is stored in the user's browser. Protected routes require the user to be logged in.

Middleware is used to protect routes that require authentication.

## Database Schema

Here is a simplified view of the main tables:

### User Table

| Column       | Type   | Description                            |
|--------------|--------|----------------------------------------|
| id           | UUID   | Primary Key                            |
| name         | String | Full name of the user                  |
| email        | String | Unique email address                   |
| phone_number | String | Unique phone number                    |
| password     | String | Hashed password                        |
| type         | Enum   | Type of user (`Student` or `Teacher`)  |

### Exam Table

| Column       | Type     | Description                            |
|--------------|----------|----------------------------------------|
| exam_id      | UUID     | Primary Key                            |
| exam_name    | String   | Name of the exam                       |
| start_time   | DateTime | Start time of the exam                 |
| end_time     | DateTime | End time of the exam                   |

### Question Table

| Column       | Type     | Description                                       |
|--------------|----------|---------------------------------------------------|
| question_id  | UUID     | Primary Key                                       |
| exam_id      | UUID     | Foreign Key to Exam Table                         |
| question     | String   | The question text                                 |
| marks        | Integer  | Marks assigned to the question                    |
| negative     | Integer  | Negative marking value (positive, treated as -1)  |
| option       | JSON     | Available options in JSON format                  |
| answer       | String   | Correct answer                                    |

### Performance Table

| Column        | Type    | Description                          |
|---------------|---------|--------------------------------------|
| id            | UUID    | Primary Key                          |
| user_id       | UUID    | Foreign Key to User Table            |
| question_id   | UUID    | Foreign Key to Question Table        |
| exam_id       | UUID    | Foreign Key to Exam Table            |
| correct       | Boolean | Whether the answer was correct       |
| marked_option | String  | Option marked by the student         |
| marks         | Integer | Marks obtained for the question      |

Here is a README file with API documentation for your application:

---

## API Documentation

This document provides an overview of the API endpoints for your application, including authentication, exam management, performance tracking, and question management.

## Table of Contents

- [Authentication](#authentication)
  - [Sign Up](#sign-up)
  - [Login](#login)
  - [Logout](#logout)
- [Exam Management](#exam-management)
  - [Create Exam](#create-exam)
  - [Get Exam](#get-exam)
  - [Update Exam](#update-exam)
  - [Delete Exam](#delete-exam)
- [Performance Tracking](#performance-tracking)
  - [View All Performances](#view-all-performances)
  - [Calculate Total Marks](#calculate-total-marks)
  - [Create Performance Entry](#create-performance-entry)
- [Question Management](#question-management)
  - [Create Question](#create-question)
  - [Update Question](#update-question)
  - [Delete Question](#delete-question)

## Authentication

### Sign Up

- **URL**: `/api/auth/signup`
- **Method**: `POST`
- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "phone_number": "string",
    "password": "string",
    "type": "string" // Example: "Student" or "Teacher"
  }
  ```
- **Response**:
  - `201 Created`: User registered successfully.
  - `500 Internal Server Error`: Error creating user.

### Login

- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Description**: Authenticate user and create a session.
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  - `200 OK`: Login successful.
  - `401 Unauthorized`: Invalid email or password.
  - `500 Internal Server Error`: Error logging in.

### Logout

- **URL**: `/api/auth/logout`
- **Method**: `POST`
- **Description**: Log out the user and destroy the session.
- **Response**:
  - `200 OK`: Logout successful.
  - `500 Internal Server Error`: Error logging out.

## Exam Management

### Create Exam

- **URL**: `/api/exams`
- **Method**: `POST`
- **Middleware**: `authMiddleware`
- **Description**: Create a new exam.
- **Request Body**:
  ```json
  {
    // Exam details
  }
  ```
- **Response**:
  - `201 Created`: Exam created successfully.
  - `400 Bad Request`: Error creating exam.

### Get Exam

- **URL**: `/api/exams/:exam_id`
- **Method**: `GET`
- **Middleware**: `authMiddleware`
- **Description**: Get details of a specific exam.
- **Response**:
  - `200 OK`: Returns exam details.
  - `404 Not Found`: Exam not found.
  - `400 Bad Request`: Error retrieving exam.

### Update Exam

- **URL**: `/api/exams/:exam_id`
- **Method**: `PUT`
- **Middleware**: `authMiddleware`
- **Description**: Update an existing exam.
- **Request Body**:
  ```json
  {
    // Exam details to be updated
  }
  ```
- **Response**:
  - `200 OK`: Exam updated successfully.
  - `404 Not Found`: Exam not found.
  - `400 Bad Request`: Error updating exam.

### Delete Exam

- **URL**: `/api/exams/:exam_id`
- **Method**: `DELETE`
- **Middleware**: `authMiddleware`
- **Description**: Delete an existing exam.
- **Response**:
  - `200 OK`: Exam deleted successfully.
  - `404 Not Found`: Exam not found.
  - `400 Bad Request`: Error deleting exam.

## Performance Tracking

### View All Performances

- **URL**: `/api/performance`
- **Method**: `GET`
- **Middleware**: `authMiddleware`
- **Description**: View all performances for the authenticated user.
- **Response**:
  - `200 OK`: Returns all performances.
  - `400 Bad Request`: Error retrieving performances.

### Calculate Total Marks

- **URL**: `/api/performance/total-marks/:exam_id`
- **Method**: `GET`
- **Middleware**: `authMiddleware`
- **Description**: Calculate total marks for a specific exam.
- **Response**:
  - `200 OK`: Returns total marks.
  - `400 Bad Request`: Error calculating total marks.

### Create Performance Entry

- **URL**: `/api/performance/:exam_id`
- **Method**: `GET`
- **Middleware**: `authMiddleware`
- **Description**: Create a performance entry for a specific exam.
- **Response**:
  - `200 OK`: Performance entry created.
  - `400 Bad Request`: Error creating performance entry.

## Question Management

### Create Question

- **URL**: `/api/question`
- **Method**: `POST`
- **Middleware**: `authMiddleware`
- **Description**: Create a new question.
- **Request Body**:
  ```json
  {
    // Question detail
  }
  ```
- **Response**:
  - `201 Created`: Question created successfully.
  - `400 Bad Request`: Error creating question.

### Update Question

- **URL**: `/api/question/:question_id`
- **Method**: `PUT`
- **Middleware**: `authMiddleware`
- **Description**: Update an existing question.
- **Request Body**:
  ```json
  {
    // Question details to be updated
  }
  ```
- **Response**:
  - `200 OK`: Question updated successfully.
  - `404 Not Found`: Question not found.
  - `400 Bad Request`: Error updating question.

### Delete Question

- **URL**: `/api/question/:question_id`
- **Method**: `DELETE`
- **Middleware**: `authMiddleware`
- **Description**: Delete an existing question.
- **Response**:
  - `200 OK`: Question deleted successfully.
  - `404 Not Found`: Question not found.
  - `400 Bad Request`: Error deleting question.

---

