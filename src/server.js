const Koa = require("koa");
const bodyParser = require("koa-bodyparser");

const getCandidates = require("./pinyin/ime_engine.js");

const app = new Koa();

app.use(bodyParser());
app.use(async (ctx) => {
  ctx.body = getCandidates(ctx.request.body.input);
});

app.listen(3000);
