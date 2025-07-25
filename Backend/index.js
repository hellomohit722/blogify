const express = require('express');
const path = require('path');
const userRoutes = require('./routes/user');
const blogRoutes = require('./routes/blog');
const HomeRoutes = require('./routes/Home');
const ChatBotRoutes = require('./routes/ChatBot');
const { checkForAuthenticationCookie } = require('./middleware/auth');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./db/Connect');
// const http = require('http');
// const { Server } = require('socket.io');

require('dotenv').config();

connectDB();

const app = express();
// const server = http.createServer(app); 
const port = process.env.PORT || 3000;

// Socket.io setup
// const io = new Server(server, {
//   cors: {
//     // origin: "http://localhost:5173", 
//     origin: "https://blogify-frontend-lyart.vercel.app", 
//     credentials: true,
//   },
// });

// io.on('connection', (socket) => {
//   // Owner creates the room
//   socket.on("owner-join-room", (roomId) => {
//     socket.join(roomId);
//     socket.emit("joined-room", roomId);
//   });

//   // Non-owner tries to join an existing room
//   socket.on("user-join-room", ({roomId,user}) => {
//     const roomExists = io.sockets.adapter.rooms.has(roomId);

//     if (!roomExists) {
//       socket.emit("room-not-found");
//     } else {
//       socket.join(roomId);
//       socket.to(roomId).emit("user-joined", user);
//       socket.emit("joined-room", roomId);
//     }
//   });

//   socket.on("leave-room", (roomId) => {
//     socket.leave(roomId);
//   });

//   socket.on("end-room", (roomId) => {
//     io.to(roomId).emit("room-ended");

//     const socketsInRoom = io.sockets.adapter.rooms.get(roomId);
//     if (socketsInRoom) {
//       socketsInRoom.forEach((socketId) => {
//         const s = io.sockets.sockets.get(socketId);
//         if (s) s.leave(roomId);
//       });
//     }
//   });

//   socket.on("send-body", ({ roomId, body }) => {
//     socket.to(roomId).emit("receive-body", body);
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use(express.static(path.resolve('./public')));
app.use(checkForAuthenticationCookie());

app.use('/user', userRoutes);
app.use('/', HomeRoutes);
app.use('/blog', blogRoutes);
app.use('/chatbot', ChatBotRoutes);

app.listen(port,()=>{
  console.log(`Server is running on port ${port}`);
});
// server.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
