# 🔗 LinksHub

A modern, production-ready Link-in-Bio platform built with the MERN stack. Create a personalized public profile, manage links, track analytics, customize profile themes, generate QR codes, and share everything from a single page.

![React](https://img.shields.io/badge/React-19-blue)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-success)
![Vite](https://img.shields.io/badge/Vite-Build-purple)

---

## ✨ Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- HTTP-only Cookie Sessions
- Protected Dashboard Routes

### 👤 Profile Management
- Custom Username
- Display Name
- Bio Section
- Theme Customization
- Public Profile Page

### 🔗 Link Management
- Create Links
- Edit Links
- Delete Links (Soft Delete)
- Restore Deleted Links
- Permanently Remove Links
- Drag & Drop Reordering

### 📊 Analytics
- Click Tracking
- Total Click Count
- Most Clicked Link
- Link Performance Overview

### 📱 Sharing
- Public Profile URL
- QR Code Generation
- One-click Copy Profile URL

---

## 🏗️ Tech Stack

### Frontend
- React 19
- Vite
- React Router
- TanStack React Query
- Axios
- Motion
- Tailwind CSS
- React Icons
- Sonner
- QRCode React
- Hello Pangea DnD

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Cookie Parser
- Morgan
- CORS

---

## 📂 Project Structure

```text
LinksHub
│
├── Client
│   ├── src
│   │   ├── app
│   │   ├── components
│   │   ├── features
│   │   │   ├── analytics
│   │   │   ├── auth
│   │   │   ├── links
│   │   │   └── profile
│   │   ├── layouts
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── public
│   ├── dist
│   ├── package.json
│   └── vite.config.js
│
├── Server
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── db
│   │   ├── middlewares
│   │   ├── models
│   │   ├── routes
│   │   ├── validators
│   │   └── app.js
│   │
│   ├── server.js
│   └── package.json
│
└── package.json
```

---

## 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/harshit403-pixel/LinksHub.git
cd LinksHub
```

### Backend Setup

```bash
cd Server
npm install
```

Create `.env`

```env
PORT=4000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

Run backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd Client
npm install
npm run dev
```

---

## ⚙️ Production

Build:

```bash
npm run build
```

Start:

```bash
npm start
```

---

## 📊 Analytics

- Total Click Tracking
- Most Clicked Links
- Link Performance Dashboard
- Click History Storage

---

## 🎨 Themes

- Lime
- Blue
- Purple
- Rose

---

## 🔄 Drag & Drop

Users can reorder links using drag-and-drop and instantly update their public profile layout.

---

## 🛡️ Security

- bcrypt Password Hashing
- JWT Authentication
- HTTP-only Cookies
- Protected Routes
- Input Validation

---

## 👨‍💻 Author

**Harshit Raghuwanshi**

GitHub: https://github.com/harshit403-pixel

⭐ If you like this project, consider giving it a star.
