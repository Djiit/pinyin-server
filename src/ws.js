const WebSocket = require("ws");

const getCandidates = require("./pinyin/ime_engine.js");

const wss = new WebSocket.Server({ port: 3000, path: "/input" });

wss.on("connection", function connection(ws) {
  console.log("connected");
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
    ws.send(JSON.stringify(getCandidates(message)));
  });
});
