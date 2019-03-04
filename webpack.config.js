/**
 * webpack config
 */
const htmlPlugin = require('html-webpack-plugin');
const copyPlugin = require('copy-webpack-plugin');
const cleanPlugin = require('clean-webpack-plugin');

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
            //css loader
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
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
        new cleanPlugin(['dist']),
        new htmlPlugin({
            chunksSortMode: 'none',
            template: './src/index.html'
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