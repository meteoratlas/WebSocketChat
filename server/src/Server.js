const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", socket => {
  console.log("new user connected");
  socket.emit("onUserJoined", "Welcome!");
  socket.broadcast.emit("sendMessage", "A new user has joined the chat.");

  socket.on("onSendMessage", (msg, callback) => {
    io.emit("sendMessage", msg);
    callback();
  });
  socket.on("disconnect", () => {
    io.emit("sendMessage", "A user has left the chat.");
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
