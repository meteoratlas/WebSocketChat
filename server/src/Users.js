const users = [];
const usersTyping = new Set();

const addUser = ({ id, username, room }) => {
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();
  if (!username || !room) {
    return { error: "Username and room are required." };
  }
  const existing = users.find(user => {
    return user.room === room && user.username === username;
  });
  if (existing) {
    return { error: "Username must be unique." };
  }
  const user = { id, username, room };
  users.push(user);
  return { user };
};

const removeUser = id => {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = id => {
  return users.find(user => user.id === id);
};

const updateUserTyping = (username, isTyping) => {
  isTyping ? usersTyping.add(username) : usersTyping.delete(username);
};

const getUsersInRoom = room => {
  room = room.trim().toLowerCase();
  return users.filter(user => user.room === room);
};

const getUsersTyping = () => {
  return Array.from(usersTyping);
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  updateUserTyping,
  getUsersTyping
};
