# 🔐 Authentication Module

A full-stack authentication module built with **React (Frontend)**, **Node.js + Express (Backend)**, and **MongoDB (Database)**.  
This module supports **user registration, login, and protected routes** using **JWT authentication** with **server-side input validation (Joi)**.  

---

## 🚀 Features
- User Registration with validation
- User Login with JWT authentication
- Protected Profile route (requires valid JWT)
- Password hashing with **bcrypt**
- Server-side validation with **Joi**
- Responsive UI with clean components
- Modular backend structure (controllers, routes, models, middlewares)

---
### 📂 Project Structure
```text
authentication_module/
│
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── validators/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md


## ⚙️ Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/ananth127/authentication_module.git
cd authentication_module

2. Backend Setup
cd backend
npm install
Create a .env file inside backend/:

PORT=5000
MONGO_URI=mongodb://localhost:27017/auth_module
JWT_SECRET=your_jwt_secret

Run backend:
npm start

3. Frontend Setup
cd ../frontend
npm install
npm start

Frontend will run at http://localhost:5173 (Vite default).
Backend will run at http://localhost:5000.
```
