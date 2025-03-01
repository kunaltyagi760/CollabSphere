const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const Message = require("./models/Message");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

connectDB();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));
// app.use("/api/post", require("./routes/post"));

const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Track online users
let onlineUsers = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (userId) => {
    onlineUsers[userId] = socket.id;
  });

  socket.on("send_message", async ({ senderId, receiverId, message }) => {
    const newMessage = new Message({ sender: senderId, receiver: receiverId, message });
    await newMessage.save(); // Store message in MongoDB

    io.to(onlineUsers[receiverId]).emit("receive_message", newMessage);
  });

  socket.on("disconnect", () => {
    Object.keys(onlineUsers).forEach((userId) => {
      if (onlineUsers[userId] === socket.id) {
        delete onlineUsers[userId];
      }
    });
    console.log("User disconnected:", socket.id);
  });
});


app.listen(process.env.PORT, () => console.log(`Server running on port http://localhost:${process.env.PORT}`));
