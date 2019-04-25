/**
 * webpack config
 */
const htmlPlugin = require('html-webpack-plugin');
const copyPlugin = require('copy-webpack-plugin');
const cleanPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
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
                use: [{
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        presets: ["env"],
                        plugins: [
                            "dynamic-import-webpack",
                            "transform-runtime",
                            "transform-object-rest-spread"
                        ]
                    }
                }]
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
        new cleanPlugin(),
        new htmlPlugin({
            chunksSortMode: 'none',
            template: 'index.html'
        }),
        new copyPlugin([{
            from: 'assets',
            to: 'assets'
        }], {
            ignore: [],
            toType: 'dir'
        })
    ]
}