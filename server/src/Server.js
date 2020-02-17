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
  //   console.log("new user connected");

  socket.on("onSendMessage", (msg, callback) => {
    io.emit("sendMessage", msg);
    callback();
  });

  socket.on("onUserNameSubmit", ({ username, room }) => {
    socket.join(room);
    console.log("New user: " + username);
    socket.emit("onUserJoined", `Welcome, ${username}!`);

    socket.broadcast.to(room).emit("sendMessage", {
      message: `${username} has joined the chat.`,
      timestamp: moment().format("h:mm:ss a, MMMM Do YYYY")
    });
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
