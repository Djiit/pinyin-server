console.log("Starting server...");

const io = require("socket.io")(3000);
const getCandidates = require("./pinyin/ime_engine.js");

console.log("Server listening on :3000");

io.on("connection", (client) => {
  client.on("input", (data) => {
    console.log(`Received ${data}`);
    client.emit("output", getCandidates(data));
  });
});
