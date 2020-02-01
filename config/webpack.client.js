const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const baseConfig = require('./webpack.base');
const merge = require('webpack-merge');

module.exports = merge(baseConfig, {
    entry: {
        client: path.resolve(__dirname, '../src/client-entry'),
    },
    plugins: [
        new VueSSRClientPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../public/index.html')
        })
    ]

})