console.log("Starting server...");

const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const getCandidates = require("./pinyin/ime_engine.js");

const app = new Koa();
var server = require("http").createServer(app.callback());
const io = require("socket.io")(server);

console.log("Server listening on :3000");

io.on("connection", (client) => {
  client.on("input", (data) => {
    console.log(`Received ${data}`);
    client.emit("output", getCandidates(data));
  });

  client.on("input-raw", (data) => {
    console.log(`Received ${data}`);
    client.emit(
      "output",
      getCandidates(data).map((e) => Buffer.from(e, "utf-8"))
    );
  });
});

app.use(bodyParser());
app.use(async (ctx) => {
  ctx.body = getCandidates(ctx.request.body.input);
});

server.listen(3000);
