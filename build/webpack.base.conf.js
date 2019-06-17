/**
 * @file webpack.base.conf
 */

const path = require('path');
const webpack = require('webpack');

module.exports = {
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: '[name].[chunkhash:8].js',
        chunkFilename: 'pages/[name].[chunkhash:8].js'
    },

    resolve: {
        extensions: ['.js', '.vue']
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }, 
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
};