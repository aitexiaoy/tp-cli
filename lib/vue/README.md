
## {{name}}

> {{description}}

## 开始

``` bash
# 安装依赖包
npm install

# 生成动态dll
npm run dll

# 开发运行
npm run dev

# 编译打包
npm run build
```

### 脚手架支持：

* element-ui 
* axios
* DllPlugin
* 支持scss,less。在vue文件中直接设置lang='less'会报错。现在还不知道原因
* eslint
* 多模板
* 支持一个静态服务器 直接打开编译后的dist目录`npm run server-static`

### 目录结构

template 中支持多页面模板以及单页面模板

###### 单页面模板
```
--template
    |--index.html
    |--index.js
    |--index.vue
```
输出：`index.html`

###### 多页面模板
```
--template
    |--index
        |--inedx.html
        |--index.js
        |--index.vue
    |--main
        |--main.html
        |--main.js
        |--main.vue
```
输出：`index.html`与`main.html`