console.log("Starting server...");

const Koa = require("koa");
const Router = require("@koa/router");
const bodyParser = require("koa-bodyparser");
const logger = require("pino")({
  prettyPrint: {
    levelFirst: true,
  },
});

const getCandidates = require("./pinyin/ime_engine.js");

// Koa init
const app = new Koa();
const router = new Router();

router.get("/", async (ctx, next) => {
  logger.info(`Received ${ctx.body}`);
  ctx.body = getCandidates(ctx.request.body.input);
});

router.get("/ping", async (ctx, next) => {
  ctx.body = "pong";
});

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (ctx) => {
  ctx.body = getCandidates(ctx.request.body.input);
});

// Socket-IO init
var server = require("http").createServer(app.callback());
const io = require("socket.io")(server);

logger.info("Server listening on :3000");

io.on("connection", (client) => {
  client.on("input", (data) => {
    logger.info(`Received ${data}`);
    client.emit("output", getCandidates(data));
  });

  client.on("input-raw", (data) => {
    logger.info(`Received ${data}`);
    client.emit(
      "output",
      getCandidates(data).map((e) => Buffer.from(e, "utf-8"))
    );
  });
});

// Let's do this
server.listen(3000);
