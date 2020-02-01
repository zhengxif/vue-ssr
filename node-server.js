let express = require('express');
let app = express();
let path = require('path');
let Vue = require('vue');
let fs = require('fs');

// vue 提供服务端渲染的包
let VueServerRenderer = require('vue-server-renderer');

// let serverBundle = fs.readFileSync('./dist/server.bundle.js', 'utf8');

// 这样是为了更改代码，服务端不需要重启
let serverBundle = require('./dist/vue-ssr-server-bundle.json');
let clientManifest = require('./dist/vue-ssr-client-manifest');

let template = fs.readFileSync('./dist/index.ssr.html', 'utf8');

// 创建渲染函数
let render = VueServerRenderer.createBundleRenderer(serverBundle, {
    template,
    clientManifest
});


app.get('/', (req, res) => {
    // 最后把渲染成功的字符串扔给客户端, 只是返回一个字符串，并没有vue实际功能
    let context = {url: req.url};
    render.renderToString(context, function (err, html) {
        res.send(html);
    })
})
app.use(express.static(path.resolve(__dirname, 'dist')));

// 如果访问的路径不存在，默认渲染index.ssr.html, 并且把路由重定向到当前的请求路径
app.get('*', (req, res) => {
    let context = {url: req.url};
    render.renderToString(context, function (err, html) {
        res.send(html);
    })
})

app.listen(3000);
