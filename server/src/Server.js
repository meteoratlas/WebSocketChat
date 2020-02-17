const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");
const moment = require("moment");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", socket => {
  console.log("new user connected");
  socket.emit("onUserJoined", "Welcome!");
  socket.broadcast.emit("sendMessage", {
    message: "A new user has joined the chat.",
    timestamp: moment().format("h:mm:ss a, MMMM Do YYYY")
  });

  socket.on("onSendMessage", (msg, callback) => {
    io.emit("sendMessage", msg);
    callback();
  });
  socket.on("disconnect", () => {
    io.emit("sendMessage", {
      message: "A user has left the chat.",
      timestamp: moment().format("h:mm:ss a, MMMM Do YYYY")
    });
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
