let express = require('express');
let app = express();

let Vue = require('vue');
let fs = require('fs');

// vue 提供服务端渲染的包
let VueServerRenderer = require('vue-server-renderer');
// 创建vue实例
let vm = new Vue({
    template: '<div>hello world</div>'
})
let template = fs.readFileSync('./index-test.html', 'utf8');

// 创建渲染函数
let render = VueServerRenderer.createRenderer({
    template,
});
app.get('/', (req, res) => {
    render.renderToString(vm, function (err, html) {
        res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
        </head>
        <body>
            ${html}
        </body>
        </html>
        `);
    })
})
app.listen(3000);
