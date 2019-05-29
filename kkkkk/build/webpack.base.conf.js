'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const webpack = require("webpack")
const os = require('os')

const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
})

var config_product=null;

if(process.env.ALONE !==''){
  config_product=config[process.env.ALONE];
}
else{
  config_product=config.build;
}

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

function createHappyPlugin(id, loaders) {
  return new HappyPack({
    id: id,
    loaders: loaders,
    threadPool: happyThreadPool,
    // make happy more verbose with HAPPY_VERBOSE=1
    verbose: process.env.HAPPY_VERBOSE === '1'
  })
}

// inject happypack accelerate packing for vue-loader @17-08-18
Object.assign(vueLoaderConfig.loaders, {
  js: 'happypack/loader?id=happy-babel-vue',
})


module.exports = {
  context: path.resolve(__dirname, '../'),
  entry:utils.entries(),

  output: {
    path: config_product.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ?
      config_product.assetsPublicPath :
      config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      // 'jquery': 'jquery'
    }
  },
  module: {
    noParse: /node_modules\/(element-ui\.js)/,
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        // exclude: /node_modules/,
        // include: [resolve('src')],
        // loader: 'happypack/loader?id=vue-loader-vue',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        // loader:'babel-loader?cacheDirectory=true',
        loader: 'happypack/loader?id=happy-babel-js',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
        // exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        // include: [resolve('src'),resolve('public')],
        // exclude: /node_modules/,
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        // include: [resolve('src'),resolve('public')],
        // exclude: /node_modules/,
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        // include: [resolve('src'),resolve('public')],
        // exclude: /node_modules/,
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader",
        // include: [resolve('src'),resolve('public')],
      }
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
    // new webpack.optimize.CommonsChunkPlugin('common.js'),
    createHappyPlugin('happy-babel-js', ['babel-loader?cacheDirectory=true']),
    createHappyPlugin('happy-babel-vue', ['babel-loader?cacheDirectory=true']),
    // new HappyPack({
    //   loaders: [{
    //     path: 'vue-loader',
    //     query: {
    //       loaders: {
    //         scss: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
    //       }
    //     }
    //   }]
    // }),

    new webpack.DllReferencePlugin({
      // context: path.resolve(__dirname, '..'),
      manifest: require('./vendor-manifest.json')
    }),

    // new webpack.ProvidePlugin({
    //   jQuery: "jquery",
    //   $: "jquery"
    // }),
  ],

}
