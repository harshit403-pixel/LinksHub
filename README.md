
# 🔗 LinksHub

A modern, production-ready Link-in-Bio platform inspired by Linktree and Bento, featuring AI-powered bios, analytics, Linktree import, QR sharing, and deep profile customization.

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
- Persistent Login Sessions

---

### 👤 Profile Management
- Custom Username
- Display Name
- Bio Section
- Profile Picture Upload
- Theme Customization
- Public Profile Page
- Responsive Profile Layout
- Share Profile Modal
- Profile QR Code
- One-click Profile Sharing

---

### 🤖 AI Features
- AI Bio Generator powered by Gemini
- Generate Multiple Bio Suggestions
- Multiple Bio Tones:
  - Professional
  - Creative
  - Minimal
  - Funny

---

### 🔗 Link Management
- Create Links
- Edit Links
- Delete Links (Soft Delete)
- Restore Deleted Links
- Permanently Remove Links
- Drag & Drop Reordering
- Bulk Link Import
- Import Links Directly from Linktree
- Duplicate Link Detection During Import
- Automatic Favicon Detection
- Automatic Link Preview Metadata Generation:
  - Preview Title
  - Preview Description
  - Preview Image

---

### 🎨 Public Profile Experience
- Bento-style Profile Layout
- Dynamic Platform Icons:
  - GitHub
  - LinkedIn
  - Instagram
  - YouTube
  - X (Twitter)
  - Discord
  - Spotify
  - WhatsApp
  - HackerRank
  - LeetCode
  - CodeChef
  - Codeforces
- Animated Link Cards
- Hover Preview Cards
- Theme-aware UI Colors
- Fully Responsive Design

---

### 📊 Analytics
- Total Click Tracking
- Total Links Counter
- Average Clicks Per Link
- Champion (Most Clicked) Link
- Traffic Distribution Pie Chart
- Link Ranking Chart
- Link Performance Dashboard
- Click History Storage

---

### 📱 Sharing
- Public Profile URL
- QR Code Generation
- One-click Copy Profile URL
- Native Share API Support (Mobile)
- Share Modal with QR Preview

---

### ✨ User Experience
- Beautiful Animations with Motion
- Toast Notifications
- Loading States
- Empty States
- Responsive Modals
- Smooth Transitions
- Optimistic UI Updates

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
- Multer
- Cloudinary

### AI & Utilities
- Google Gemini API
- Cheerio
- Link Preview JS

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
│   │   │   ├── ai
│   │   │   ├── analytics
│   │   │   ├── auth
│   │   │   ├── links
│   │   │   └── profile
│   │   ├── layouts
│   │   ├── routes
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── public
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
│   │   ├── services
│   │   ├── utils
│   │   ├── validators
│   │   └── app.js
│   │
│   ├── server.js
│   └── package.json
│
└── package.json
````

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

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

GEMINI_API_KEY=
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

Create `.env`

```env
VITE_API_URL=http://localhost:4000/api
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

## 🎨 Themes

* 🟢 Lime
* 🔵 Blue
* 🟣 Purple
* 🌹 Rose

---

## 🛡️ Security

* bcrypt Password Hashing
* JWT Authentication
* HTTP-only Cookies
* Protected Routes
* Input Validation
* Secure File Uploads
* Duplicate Link Protection

---

## 🚀 Future Improvements

* Custom Domains
* Device Analytics
* Country Analytics
* Link Scheduling
* Pinned Links
* Social Icons Section
* Custom Backgrounds
* Themes Marketplace
* Profile Visitor Count
* Export as Digital Business Card
* Email Verification
* Two Factor Authentication

---

## 👨‍💻 Author

**Harshit Raghuwanshi**

GitHub: https://github.com/harshit403-pixel

⭐ If you like this project, consider giving it a star!

```
```
