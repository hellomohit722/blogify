🧠 blogAI – AI-Powered Blogging Platform
=======================================

blogAI is a full-stack blogging platform built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It enables users to create, view, and comment on blog posts through a clean user interface and a modular backend. It also features AI-powered content summaries using OpenAI.

🌐 Live Demo  
👉 Click here to try blogAI: [https://blogaifrontend.vercel.app](https://blogify-frontend-lyart.vercel.app/)

🛠 Tech Stack
-------------
- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB (via Mongoose)
- Image Storage: Cloudinary
- AI Integration: OpenAI API
- Authentication: JWT (JSON Web Token)
- Deployment: Vercel

✨ Features
----------
- ✍ Create and publish blog posts
- 📰 View all blog posts on the homepage
- 💬 Add comments under blog posts
- 🔐 JWT-based login/signup authentication
- 📤 Upload blog images using Cloudinary
- 🤖 AI-generated summaries and key points via OpenAI
- 🧭 RESTful API and Context API architecture
- 📁 Clean, modular folder structure (frontend/backend)


🚀 Getting Started (Local Setup)
--------------------------------

📦 Prerequisites
----------------
- Node.js (v18+)
- npm
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)
- OpenAI API key

🔧 Backend Setup
----------------
1. Navigate to the backend folder:
   cd backend

2. Install dependencies:
   npm install

3. Create a .env file in the backend/ directory with the following content:

   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   OPENAI_API_KEY=your_openai_api_key

   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

4. Start the backend server:
   npm run dev

> Backend runs on http://localhost:5000

💻 Frontend Setup
-----------------
1. Navigate to the frontend folder:
   cd ../frontend

2. Install frontend dependencies:
   npm install

3. Start the frontend development server:
   npm run dev

> Frontend runs on http://localhost:5173


📸 Screenshots
--------------

![image](https://github.com/user-attachments/assets/b4452af1-7463-4034-90c5-f245730bb5c7)

![image](https://github.com/user-attachments/assets/225d351f-33bd-4eb1-a24f-806a7769a69a)


🧠 Future Enhancements
----------------------
- 📝 Integrate rich text/Markdown editor
- 🔍 Add blog search and filter functionality
- 🤖 AI-based blog generation and content suggestions
- 📊 Dashboard with user engagement analytics
- 🏷 Add support for tags, categories, and author profiles

🧾 License
----------
This project is open-source and available under the MIT License.

🙌 Acknowledgments
------------------
- OpenAI (https://openai.com/)
- Cloudinary (https://cloudinary.com/)
- MongoDB Atlas (https://www.mongodb.com/atlas)
- Vercel (https://vercel.com/)

💬 Contact
----------
For any suggestions, feedback, or collaboration, feel free to reach out via GitHub or LinkedIn!
