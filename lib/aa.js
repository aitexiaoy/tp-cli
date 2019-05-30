// node 文件模块
const fs = require('fs');
const path =require('path')
const handlebars=require('handlebars')

const meta={
    name:'12345',
    description:'00099991'
}
const filePackage = path.resolve(__dirname, path.join('../', `README.md`))
const content = fs.readFileSync(filePackage).toString();
const result = handlebars.compile(content)(meta);
console.log(result)