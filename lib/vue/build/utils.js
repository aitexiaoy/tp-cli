

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// glob是webpack安装时依赖的一个第三方模块，还模块允许你使用 *等符号, 例如lib/*.js就是获取lib文件夹下的所有js后缀名的文件
const glob = require('glob');
// 页面模板
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 用于做相应的merge处理
const merge = require('webpack-merge');
// 取得相应的页面路径，因为之前的配置，所以是src文件夹下的pages文件夹
const PAGE_PATH = path.resolve(__dirname, '../template');
const packageConfig = require('../package.json');
const config = require('../config');

exports.assetsPath = function (_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production' ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory
    return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
    // eslint-disable-next-line no-param-reassign
    options = options || {}
    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }
    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }
    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]
        if (loader) {
            loaders.push({
                loader: `${loader}-loader`,
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
            return [MiniCssExtractPlugin.loader].concat(loaders)
        } 
    

        return ['vue-style-loader'].concat(loaders)
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', {
            indentedSyntax: true
        }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
    const output = []
    const loaders = exports.cssLoaders(options)

    for (const extension in loaders) {
        if (Object.prototype.hasOwnProperty.bind(loaders, extension)){
            const loader = loaders[extension]
            output.push({
                test: new RegExp(`\\.${extension}$`),
                use: loader
            })
        }
    }

    return output
}

exports.createNotifierCallback = () => {
    const notifier = require('node-notifier')

    return (severity, errors) => {
        if (severity !== 'error') return

        const error = errors[0]
        const filename = error.file && error.file.split('!').pop()

        notifier.notify({
            title: packageConfig.name,
            message: `${severity}: ${error.name}`,
            subtitle: filename || '',
            icon: path.join(__dirname, 'logo.png')
        })
    }
}

// 多入口配置
// 通过glob模块读取pages文件夹下的所有对应文件夹下的js后缀文件，如果该文件存在
// 那么就作为入口处理
exports.entries = function () {
    const entryFiles = glob.sync(`${PAGE_PATH}/**/*.js`)
    const map = {}
    entryFiles.forEach((filePath) => {
        const files = filePath.split('/');
        const filename = files[files.length - 1].replace('.js', '');
        map[filename] = filePath;
    })
    return map
}

// 多页面输出配置
// 与上面的多页面入口配置相同，读取pages文件夹下的对应的html后缀文件，然后放入数组中
exports.htmlPlugin = function () {
    const entryHtml = glob.sync(`${PAGE_PATH}/**/*.html`)
    const arr = []
    const fileNames = [];
    entryHtml.forEach((filePath) => {
        const files = filePath.split('/');
        const filename = files[files.length - 1].replace('.html', '');
        const obj = {
            path: filePath,
            name: filename
        }
        fileNames.push(obj);
    })

    fileNames.forEach((obj) => {
        let conf = {
            // 模板来源
            template: obj.path,
            // 文件名称
            filename: `${obj.name}.html`,
            // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
            inject: true,
            excludeChunks: (function (){
                const arr2 = [];
                fileNames.forEach((item) => {
                    if (item.name != obj.name){
                        arr2.push(item.name);
                    }
                })
                return arr2;
            }())
        }
        if (process.env.NODE_ENV === 'production') {
            conf = merge(conf, {
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                },
                chunksSortMode: 'dependency'
            })
        }
        arr.push(new HtmlWebpackPlugin(conf))
    })
    return arr
}
