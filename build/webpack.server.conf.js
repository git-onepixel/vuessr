/**
 * @file webpack.server.conf
 */

const merge = require('webpack-merge');
const base = require('./webpack.base.conf.js');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

module.exports = merge(base, {
    target: 'node',

    entry: './src/entry/server.js',

    output: {
        filename: 'server-bundle.js',
        libraryTarget: 'commonjs2'
    },

    plugins: [
        new VueSSRServerPlugin()
    ]
});