const io = require("socket.io")(3000);
const getCandidates = require("./pinyin/ime_engine.js");

io.on("connection", (client) => {
  client.on("input", (data) => {
    client.emit("output", getCandidates(data));
  });
});
