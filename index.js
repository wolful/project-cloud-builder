const https = require('https');
const fs = require('fs');
const Koa = require('koa');
const router = require('koa-route');
const websockify = require('koa-wss');
const path = require('path');
const stringHash = require('string-hash');
const spawn = require('child_process').spawn;

const getRepoName = require('./utils').getRepoName;

const enforceHttps = require('koa-sslify').default;
const static = require('koa-static');

// https key and cert
// or you can delete is if use http
const httpsOptions = { 
  cert: fs.readFileSync('/etc/letsencrypt/live/${yourdomain}/fullchain.pem'),
  key: fs.readFileSync('/etc/letsencrypt/live/${yourdomain}/privkey.pem'),
};

const staticPath = './';
const app = websockify(new Koa(), {}, httpsOptions);

app.use(enforceHttps());

app.use(static(path.join(__dirname, staticPath)));

app.use(async(ctx) => {
  ctx.body = 'This resource not found';
});

app.ws.use(router.all('/cloud-build/wss', (ctx, next) => {
  const ws = ctx.websocket;
  ws.on('message', function incoming(message) {
    const repoName = getRepoName(message);
    if (!repoName) {
      ws.send(`This repo url is invalid, please make sure your url again!`);
      return;
    }
    const hash = stringHash(`${message}-${Date.now().toString()}`);
    const mainSh = spawn("sh", ["main.sh", hash, message, repoName]);
    ws.send(`server receive url: ${message} and hash = ${hash}, repoName = ${repoName}, start to building...`);

    const tail = spawn("tail", ["-f", `log/${hash}.log`, "-n", 30]);
    tail.stdout.on('data', (data) => {
      ws.send(`${data.toString('utf-8')}`);
    });
  });
}));

console.log('server start...');
app.listen(8090);
