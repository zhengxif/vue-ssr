const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const baseConfig = require('./webpack.base');
const merge = require('webpack-merge');

module.exports = merge(baseConfig, {
    target: 'node', // 打包出的结果给node用
    entry: {
        server:  path.resolve(__dirname, '../src/server-entry'),
    },
    output: {
        libraryTarget: 'commonjs2', // 结果为 module.exports = server.bundle.js
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.ssr.html',
            template: path.resolve(__dirname, '../public/index.ssr.html'),
            excludeChunks: ['server'], // 要排除这个文件
        })
    ]

})