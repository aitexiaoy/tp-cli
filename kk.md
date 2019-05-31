从vue-cli老项目中升级webpack到4.0，在引入less的时候报错,单独引入less文件就没问题。
```
Failed to compile.

./src/page/main/main.vue?vue&type=style&index=0&id=6bb0c168&scoped=true&lang=less& (./node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js!./node_modules/_vue-loader@15.7.0@vue-loader/lib/loaders/stylePostLoader.js!./node_modules/_less-loader@5.0.0@less-loader/dist/cjs.js!./node_modules/_css-loader@2.1.1@css-loader/dist/cjs.js??ref--9-1!./node_modules/_postcss-loader@3.0.0@postcss-loader/src??ref--9-2!./node_modules/_less-loader@5.0.0@less-loader/dist/cjs.js??ref--9-3!./node_modules/_vue-loader@15.7.0@vue-loader/lib??vue-loader-options!./src/page/main/main.vue?vue&type=style&index=0&id=6bb0c168&scoped=true&lang=less&)
Module build failed (from ./node_modules/_less-loader@5.0.0@less-loader/dist/cjs.js):


exports = module.exports = require("../../../node_modules/_css-loader@2.1.1@css-loader/dist/runtime/api.js")(false);
      ^
Unrecognised input
      in /Users/yangpeng/Desktop/pt-cli/lib/vue/src/page/main/main.vue?vue&type=style&index=0&id=6bb0c168&scoped=true&lang=less& (line 1, column 8)
```

代码
```html
<style scoped lang="less">
.page-main{
    background-color: red;
}
</style>
```
版本
```json
    "less": "^3.9.0",
    "less-loader": "^4.1.0",
```
配置
在`webpack.base.conf.js`中
```js
module: {
    rules:{
        test: /.less/,
        use: ['vue-style-loader','css-loader','less-loader']
    }
}
```

最后解决：
在`webpack.base.conf.js`中去掉对less-loader的配置