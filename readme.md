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
- [License](#license)

## Project Description

This project is designed to provide a comprehensive platform for conducting online examinations. It includes functionalities for user authentication, exam management, student performance tracking, and much more. The backend is built with Node.js and Express.js to ensure scalability and maintainability.

## Features

- **User Authentication**: Sign up, log in, and log out functionality using sessions.
- **Exam Management**: Teachers can upload questions, set exam timings, and manage exams.
- **Student Portal**: Students can log in, choose subjects, take exams, and view their results.
- **Admin Dashboard**: Admins can analyze student performance and provide study materials based on weak areas.
- **JWT Authentication**: Used for secure API requests and session management.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **PostgreSQL**: Relational database management system.
- **Sequelize**: Promise-based Node.js ORM for SQL databases.
- **Express-Session**: Middleware for managing sessions.
- **bcryptjs**: Library to hash passwords.
- **Nodemon**: Utility that monitors for changes and automatically restarts the server.

## Project Structure

```
src/
│
├── controllers/
│   ├── authController.js
│   ├── studentController.js
│   ├── examController.js
│   └── teacherController.js
│
├── models/
│   ├── user.js
│   ├── exam.js
│   └── index.js
│
├── routes/
│   ├── authRoutes.js
│   ├── studentRoutes.js
│   ├── examRoutes.js
│   └── teacherRoutes.js
│
├── services/
│   ├── authService.js
│   ├── studentService.js
│   ├── examService.js
│   └── teacherService.js
│
├── utils/
│   ├── database.js
│   └── session.js
│
└── middleware/
    └── auth.js
```

## Setup and Installation

### Prerequisites

- Node.js (v14.x or higher)
- PostgreSQL
- npm (Node Package Manager)

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/your-username/examination-portal.git
    cd examination-portal
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up the PostgreSQL database**

    Create a PostgreSQL database and update the connection details in `src/utils/database.js`.

4. **Run migrations (if any)**

    ```bash
    npx sequelize db:migrate
    ```

5. **Set up environment variables**

    Create a `.env` file in the root directory and add the necessary environment variables:

    ```
    DATABASE_URL=your-database-url
    SESSION_SECRET=your-session-secret
    ```

## Running the Application

### Development Mode

```bash
npm run dev
```

This will start the server using `nodemon`, which automatically restarts the server on file changes.

### Production Mode

```bash
npm start
```

## API Endpoints

Here are some of the key API endpoints:

### Authentication

- **POST** `/auth/signup`: Create a new user.
- **POST** `/auth/login`: Log in with an existing user.
- **POST** `/auth/logout`: Log out the current user.

### Students

- **GET** `/students/exams`: Fetch available exams.
- **POST** `/students/exams/start`: Start an exam.
- **GET** `/students/performance`: View performance data.

### Teachers

- **POST** `/teachers/exams/upload`: Upload a new exam.
- **POST** `/teachers/exams/timer`: Set a timer for an exam.

### Admin

- **GET** `/admin/analysis`: Analyze student performance.

## Authentication

Authentication is handled using sessions. Upon successful login, a session is created for the user, and a session cookie is stored in the user's browser. Protected routes require the user to be logged in.

Middleware is used to protect routes that require authentication.

## Database Schema

Here is a simplified view of the main tables:

### User Table

| Column          | Type    | Description                     |
| --------------- | ------- | ------------------------------- |
| id              | UUID    | Primary Key                     |
| name            | String  | Full name of the user           |
| email           | String  | Unique email address            |
| phone_number    | String  | Unique phone number             |
| password        | String  | Hashed password                 |
| type            | Enum    | Type of user (`Student` or `Teacher`) |

### Exam Table

| Column    | Type    | Description       |
| --------- | ------- | ----------------- |
| id        | UUID    | Primary Key       |
| questions | JSON    | Questions for the exam |
| start_time | DateTime | Start time of the exam |
| end_time   | DateTime | End time of the exam |

### Performance Table

| Column      | Type   | Description                          |
| ----------- | ------ | ------------------------------------ |
| id          | UUID   | Primary Key                          |
| test_id     | UUID   | Foreign Key to Exam Table            |
| performance | JSON   | Performance details                  |
| score       | Integer| Score obtained                       |
| materials   | BLOB   | Study materials for improvement      |
