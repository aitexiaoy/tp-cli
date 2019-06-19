

const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const utils = require('./utils');
const config = require('../config');

const config_product = config.build;

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
    test: /\.(js|jsx)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('src'), resolve('test')],
    options: {
        formatter: require('eslint-friendly-formatter'),
        emitWarning: !config.dev.showEslintErrorsInOverlay
    }
})

if (!fs.existsSync(path.resolve(__dirname, './vendor-manifest.json'))){
    throw new Error('不存在vendor-manifest.json 请先执行 npm run dll')
}

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: utils.entries(),
    output: {
        path: config_product.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config_product.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@': resolve('src'),
        }
    },
    module: {
        ...(config.dev.useEslint ? [createLintingRule()] : []),
        rules: [
        {
            test: /\.(js|jsx)$/,
            loader:"babel-loader",
            include: [resolve('src'),resolve('template')],
            exclude: /node_modules/
        },
        {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
        },
        {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: utils.assetsPath('media/[name].[hash:7].[ext]')
            }
        },
        {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
        },
        ]
    },
    node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },
    plugins: [
        // new webpack.DllReferencePlugin({
        //     // eslint-disable-next-line import/no-unresolved
        //     manifest: require('./vendor-manifest.json')
        // }),
    ],
}
