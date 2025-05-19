# 🛡️ RBAC Web App

A secure, role-based access control application built with a focus on backend-driven logic (Single Source of Truth). Designed to manage users, enforce permissions, and provide secure authentication and user onboarding.

---

## 👥 Roles & Permissions

This app uses **Role-Based Access Control (RBAC)** with three distinct roles:

- **Admin**
  - Full access to all features.
  - Can invite and delete users.
  - Can remove all data fields.

- **Editor**
  - Can edit specific fields.
  - Cannot invite or delete users.

- **User**
  - Read-only access.
  - Can view data but cannot make changes.

> All permission checks are handled on the **server side** using middleware, ensuring security even if frontend is bypassed.

---

## 🔐 Authentication

- Authentication is handled using **JWT (JSON Web Tokens)**.
- After login, tokens are stored and automatically included in requests using **Axios interceptors**.
- Each request is verified on the backend to ensure the user has a valid token and appropriate permissions.

---

## ✉️ User Invitation & Activation

- Only admins can send invitations.
- Invites are sent via email using **Nodemailer**.
- The email contains a secure activation token.
- After clicking the link and completing setup, the user’s status changes from `invited` to `active`.

---

## 🔁 Forgot Password

- Users can reset their password through a secure **"Forgot Password"** flow.
- Reset links are sent via email, allowing users to create a new password safely.



1. Clone the project.
2. Navigate into both the `server` and `client` directories.
3. npm run dev
