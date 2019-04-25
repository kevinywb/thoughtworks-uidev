/**
 * webpack config
 */
const path = require('path');
const htmlPlugin = require('html-webpack-plugin');
const apiMocker = require('mocker-api')

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: 'main.js'
    },
    module: {
        rules: [
            //babel loader
            {
                test: /\.js$/,
                include: /src/,
                use: ['babel-loader']
            },
            //css loader
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            //less loader
            {
                test: /\.less$/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        localIdentName: '[name]-[local]-[hash:base64:6]'
                    }
                }, 'less-loader']
            },
            //img loader
            {
                test: /\.(png|jpg|gif|jpeg|svg|woff|tff)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 500
                    }
                }]
            }
        ]
    },
    plugins: [
        new htmlPlugin({
            chunksSortMode: 'none',
            template: 'index.html'
        })
    ],
    devServer: {
        before(app) {
            apiMocker(app, path.resolve(__dirname, '../mock/index.js'), {})
        },
        port: 80,
        proxy: {
            '/api': {
                target: 'http://localhost:80',
                secure: false
            }
        }
    }
}