# User Management System

A user management system with **role-based access control (RBAC)** built using **Node.js**, **Express**, **MongoDB**, and **React**.

## Features

- **Admin auto-creation on startup**
  - **Login**: `admin`
  - **Password**: `admin`

-  **Three roles with specific permissions**:
  - **Admin**:
    - Can edit all fields
    - Can invite users via email
    - Can delete users
    - Can assign roles
  - **Editor**:
    - Can edit specific fields of all users
  - **User**:
    - Can edit only their own information

-  **Invite users via email** using **Nodemailer**
-  **JWT authentication**
- **Password reset (Forgot password)** via email
  - **Middleware-based permission checks** for:
  - Role actions (invite, delete, update)
  - Field-level updates
  - Token validation and user role recognition

##  Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: React.js (with TypeScript)


##  Setup Instructions

1. Clone the project.
2. Navigate into both the `server` and `client` directories.
3. npm run dev
