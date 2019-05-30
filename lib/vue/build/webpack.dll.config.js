/**
 *  功能：通过npm run dll 命令生成dll文件
 *  作者：taoacat
 *  日期：2019/5/30
 */

const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const fs = require('fs');
const { JSDOM } = require('jsdom');

const { dependencies } = require('../package.json')
const packages = Object.keys(dependencies)

// 取得相应的页面路径，因为之前的配置，所以是src文件夹下的pages文件夹
var PAGE_PATH = path.resolve(__dirname, '../template');

//vendor 动态的文件名
const file_name = 'vendor.' + (new Date()).getTime() + '.dll.js';

function set_html_vendor() {
  //删除已有的vendor文件
  var vendor_file = glob.sync(path.resolve(__dirname, '../static/js/') + '*/*.dll.js');
  vendor_file.map(file => [
    fs.unlink(file, function (err) {
      if (err) {
        throw err;
      }
    })
  ])

  //找到所有的html模板
  var entryFiles = glob.sync(PAGE_PATH + '/*/*.html');
  entryFiles.map(item_path => {
    fs.readFile(item_path, function (err, data) {
      if (err) {
        throw err;
      }
      var data_string = data.toString();
      //转成dom对象方便读取
      var {
        document
      } = (new JSDOM(data_string)).window;
      //更改路径
      document.querySelector('#vendor_script').src = '/static/js/' + file_name;
      //将修改完成的写入到文件中
      fs.writeFile(item_path, '<!DOCTYPE html>\n<html lang="en">\n' + document.querySelector('html').innerHTML + '\n</html>', function (err) {
        if (err) {
          throw err;
        }
      })
    })
  })
}

set_html_vendor();

module.exports = {
  model:'production',
  entry: {
    vendor: packages
  },
  output: {
    path: path.join(__dirname, '../static/js'),
    filename: file_name,
    library: '[name]_library' // vendor.dll.js中暴露出的全局变量名
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name]-manifest.json'),
      name: '[name]_library'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
