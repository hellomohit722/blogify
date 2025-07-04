# Blog-App# 🧠 blogAI – AI-Powered Blogging Platform

blogAI is a full-stack blogging platform built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to create and view blog posts and also user can comment on the blogs through a clean user interface and modular backend.

---

## 🌐 Live Demo: https://blogaifrontend.vercel.app

---

## 🛠 Tech Stack

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB (Mongoose)
- Cloudinary : storage of photis
- open ai 
- Deployment: Vercel

---

## ✨ Features

- ✍ Create and publish blog posts
- 📰 View all posts on homepage
- 🧭 RESTful API , Context API architecture
- 📁 Clean folder structure (frontend/backend separated)
- 💡 Easily extendable for login, comments
- 🤖 AI integration for summaries and key points
- 🔐 JWT Authentication for login/signup
- 📤 Cloudinary image upload support
- 💬 Comments under blog posts

---

## 🧩 Folder Structure

blogAI/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── server.js
│   └── .env.example
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── README.md

---

## 🚀 Getting Started (Local Setup)

### 📦 Prerequisites
- Node.js (v18+ recommended)
- npm
- MongoDB (local or Atlas)
- Cloudaniary (Image upload)

---

### 🔧 Backend Setup

1. Open terminal:
   cd backend

2. Install dependencies:
   npm install

3. Create a .env file in the backend/ directory:

PORT=3000
MONGO_URI=""
OPENAI_API_KEY=""

CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

4. Start the server:
   npm run dev

> Backend runs on http://localhost:5000

---

### 💻 Frontend Setup

1. Navigate to frontend folder:
   cd ../frontend

2. Install dependencies:
   npm install

3. Start frontend server:
   npm run dev

> Frontend runs on http://localhost:5173

---

## 📸 Screenshots
![image](https://github.com/user-attachments/assets/b4452af1-7463-4034-90c5-f245730bb5c7)

![image](https://github.com/user-attachments/assets/225d351f-33bd-4eb1-a24f-806a7769a69a)


## 🧠 Future Enhancements

- 📑 Rich text/Markdown editor
- 🔎 Search and filter functionality
- 🤖 AI content suggestions using OpenAI API

---
