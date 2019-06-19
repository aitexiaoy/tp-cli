

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const config = require('../config')
const utils = require('./utils')

const config_product = config.build;

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    module: {
        rules: utils.styleLoaders({
            sourceMap: config_product.productionSourceMap,
            extract: true,
            usePostCSS: true
        })
    },
    devtool: config_product.productionSourceMap ? config_product.devtool : false,
    output: {
        path: config_product.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: utils.assetsPath('css/[name].[contenthash].css'),
            chunkFilename: utils.assetsPath('css/[id].[contenthash].css'),
        }),

        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            cssProcessorOptions: config_product.productionSourceMap
                ? { safe: true, map: { inline: false } }
                : { safe: true }
        }),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin

        // keep module.id stable when vendor modules does not change
        new webpack.HashedModuleIdsPlugin(),
        // enable scope hoisting
        new webpack.optimize.ModuleConcatenationPlugin(),

        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: config_product.assetsSubDirectory,
                ignore: ['.*']
            }
        ])

    ].concat(utils.htmlPlugin()),

    optimization: {
        splitChunks: {
            chunks: 'async', // 默认只作用于异步模块，为`all`时对所有模块生效,`initial`对同步模块有效
            minSize: 30000, // 合并前模块文件的体积
            minChunks: 1, // 最少被引用次数
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~', // 自动命名连接符
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    minChunks: 1, // 敲黑板
                    priority: -10// 优先级更高
                },
                default: {
                    test: /[\\/]src[\\/]js[\\/]/,
                    minChunks: 2, // 一般为非第三方公共模块
                    priority: -20,
                    reuseExistingChunk: true
                }
            },
            // runtimeChunk: {
            //     name: 'manifest'
            // }
        }
    }
})

if (config_product.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')
    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                `\\.(${ 
                    config_product.productionGzipExtensions.join('|') 
                })$`
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}
// 开启可视化的打包后的文件分析器
if (config_product.bundleAnalyzerReport) {
    const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
