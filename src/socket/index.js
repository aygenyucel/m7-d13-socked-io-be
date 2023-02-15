let onlineUsers = [];

export const newConnectionHandler = (newClient) => {
  console.log("NEW CONNECTION::::::::", newClient.id);

  newClient.emit("welcome", { message: `Hello ${newClient.id}` });

  newClient.on("setUsername", (username) => {
    console.log("UserName:", username);

    onlineUsers.push({ username: username, socketId: newClient.id });

    newClient.emit("loggedIn", onlineUsers);

    newClient.broadcast.emit("updateOnlineUsersList", onlineUsers);
  });
};
