'use strict'

const path = require('path');

function return_build_path(type){
    let _path='dist'+(type?'_'+type:'');
    return {
              // Template for index.html

              index: path.resolve(__dirname, '../'+_path+'/index.html'),
              login: path.resolve(__dirname, '../'+_path+'/login.html'),
              admin: path.resolve(__dirname, '../'+_path+'/admin.html'),
      
              // Paths
      
              assetsRoot: path.resolve(__dirname, '../'+_path),
              assetsSubDirectory: 'static',
              assetsPublicPath: '/',
      
              // *************************************************************
              /**
               * Source Maps
               */
              productionSourceMap: false,
              // https://webpack.js.org/configuration/devtool/#production
              devtool: '#source-map',
              // Gzip off by default as many popular static hosts such as
              // Surge or Netlify already gzip all static assets for you.
              // Before setting to `true`, make sure to:
              // npm install --save-dev compression-webpack-plugin
              productionGzip: true,
              productionGzipExtensions: ['js', 'css', 'json'],
              // Run the build command with an extra argument to
              // View the bundle analyzer report after build finishes:
              // `npm run build --report`
              // Set to `true` or `false` to always turn it on or off
              bundleAnalyzerReport: process.env.npm_config_report
    }
}

module.exports = {
    dev: {
        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        // Various Dev Server settings

        host: '0.0.0.0', // can be overwritten by process.env.HOST
        // host: 'localhost', // can be overwritten by process.env.HOST

        port: 18989, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: true,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: 1000, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

        disableHostCheck: true,

        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'cheap-module-eval-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: false,

        cssSourceMap: false,
    },

    build: return_build_path(),
    //独立部署的
    longnan: return_build_path('longnan'),
    //中卫
    zhongwei: return_build_path('zhongwei'),

}