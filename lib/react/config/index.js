

const path = require('path');
const glob = require('glob');

const PAGE_PATH = path.resolve(__dirname, '../template');

function return_buildnpath(){
    const npath = 'dist'
    const entryHtml = glob.sync(`${PAGE_PATH}/**/*.html`)
    const result = {
        assetsRoot: path.resolve(__dirname, `../${npath}`),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: false, // Source Maps 生产的时候置为false
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',
        productionGzip: true, // 是否开启压缩 compression-webpack-plugin
        productionGzipExtensions: ['js', 'css', 'json'], // 要压缩的文件
        bundleAnalyzerReport: process.env.npm_config_report // 是否开启可视化的包分析器
    }
    entryHtml.forEach((filePath) => {
        const files = filePath.split('/');
        const filename = files[files.length - 1].replace('.html', '');
        result[filename] = path.resolve(__dirname, `../${npath}/${filename}.html`)
    })
 
    return result
}

module.exports = {
    dev: {
        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        // Various Dev Server settings

        host: '0.0.0.0', // can be overwritten by process.env.HOST
        // host: 'localhost', // can be overwritten by process.env.HOST

        port: 10010, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: false,
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

    build: return_buildnpath(),
}
