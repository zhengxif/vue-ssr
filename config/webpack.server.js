const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const baseConfig = require('./webpack.base');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const merge = require('webpack-merge');
const externals = require('webpack-node-externals');

module.exports = merge(baseConfig, {
    target: 'node', // 打包出的结果给node用
    entry: {
        server:  path.resolve(__dirname, '../src/server-entry'),
    },
    output: {
        libraryTarget: 'commonjs2', // 结果为 module.exports = server.bundle.js
    },
    externals: [externals()], // 第三方模块不需要打包，因为js是在node中运行的，默认可以使用第三方库
    plugins: [
        new VueSSRServerPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.ssr.html',
            template: path.resolve(__dirname, '../public/index.ssr.html'),
            excludeChunks: ['server'], // 要排除这个文件
        })
    ]

})