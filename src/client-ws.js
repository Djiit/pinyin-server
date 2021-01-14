const WebSocket = require("ws");

const ws = new WebSocket("ws:/localhost:3000/input");

ws.on("message", (data) => console.log(JSON.parse(data)));

setInterval(() => {
  console.log("send");
  ws.send("ni");
}, 2000);
