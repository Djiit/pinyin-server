const io = require("socket.io-client");

const socket = io("ws://localhost:3000/", {});

socket.on("connect", () => {
  console.log(`connect ${socket.id}`);
});

socket.on("disconnect", () => {
  console.log(`disconnect`);
});

socket.on("output", console.log);

setInterval(() => {
  socket.emit("input", "ni");
}, 2000);
