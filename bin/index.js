#!/usr/bin/env node
 // 处理用户输入的命令
const program = require('commander');
// 下载模板
const download = require('download-git-repo');
// 问题交互
const inquirer = require('inquirer');
// node 文件模块
const fs = require('fs');
// 填充信息至文件
const handlebars = require('handlebars');
// 动画效果
const ora = require('ora');
// 字体加颜色
const chalk = require('chalk');
// 显示提示图标
const symbols = require('log-symbols');
const path = require('path');
// 命令行操作
var shell = require("shelljs");

const getRemoteTem = require('./remote.js')

var copy = require('recursive-copy');

// 复制文件
function copyFiles(from, to) {
  return new Promise((resolve, reject) => {
    copy(from, to, function (error, results) {
      if (error) {
        reject();
      } else {
        resolve();
      }
    })
  })
}


// 删除文件
function deleteFiles(fileName) {
  return new Promise((resolve, reject) => {
    try {
      if (fs.existsSync(fileName)) {
        fs.unlinkSync(fileName);
      }
      resolve();
    } catch (error) {
      // 处理错误
      reject(error);
    }
  })

}

/**
 * 创建新的工程文件成功
 */
function getNewProjectSuccess(answers, fileName) {
  const filePackage = `${fileName}/package.json`;
  const fielReadme = `${fileName}/readme.md`;
  const meta = {
    name: answers.name,
    description: answers.description,
    author: answers.author,
    projectVersion: answers.projectVersion
  }
  if (fs.existsSync(filePackage)) {
    const content = fs.readFileSync(filePackage).toString();
    const result = handlebars.compile(content)(meta);
    fs.writeFileSync(filePackage, result);
  }
  if (fs.existsSync(fielReadme)) {
    const content = fs.readFileSync(fielReadme).toString();
    const result = handlebars.compile(content)(meta);
    fs.writeFileSync(fielReadme, result);
  }
}

function npmInstallAuto(fileName) {
  return inquirer.prompt([{
    type: 'confirm',
    name: 'ifInstall',
    message: '现在立即去安装依赖吗？🍓',
    default: true
  }]).then((answers) => {
    if (answers.ifInstall) {
      inquirer.prompt([{
        type: 'list',
        name: 'installWay',
        message: '选择一种安装工具',
        choices: ['npm', 'cnpm']
      }]).then(ans => {
        let spinner = logStart('安装中')
        // 命令行操作安装依赖
        shell.exec(`cd  ${fileName} && ${ans.installWay} install --verbose`, function (error, stdout, stderr) {
          if (error) {
            logFaild(spinner, '自动安装命令执行失败,请手动安装！！！', error);
          } else {
            logSuccess(spinner, '依赖安装成功！！！');
          }
        });
      })
    } else {
      console.log(symbols.success, chalk.green(`请执行 cd  ${fileName} && npm install`));
    }
  })
}

function logFaild(spinner, msg, error) {
  spinner.fail();
  console.log(symbols.error, chalk.red(`${msg}:${error}`));
}

function logSuccess(spinner, msg) {
  spinner.succeed();
  console.log(symbols.success, chalk.green('工程模板已经复制成功了'));
}

function logStart(msg) {
  const spinner = ora(`${msg}...`);
  spinner.start();
  return spinner
}

program.version('1.0.1', '-v, --version').command('init <name>').action((name) => {
  if (!fs.existsSync(name)) {
    inquirer.prompt([{
      name: 'projectType',
      message: '选择创建的项目类型:',
      type: 'list',
      choices: ['vue', 'react', 'npm', 'remote-origin']
    }]).then(a => {
      const commonAnswer = [{
          name: 'description',
          message: '添加一个描述:'
        },
        {
          name: 'author',
          message: '添加作者:'
        },
        {
          name: 'projectVersion',
          message: '项目的版本号:',
          default: '1.0.0'
        }
      ]
      // 从远程下载模板
      if (a.projectType === 'remote-origin') {
        commonAnswer.push({
          name: 'gitAddreaa',
          message: '请输入远程仓库地址(默认master分支,自定义分支请在git地址后加`#[分支名]`如.git#master):',
        })
      }

      inquirer.prompt(commonAnswer).then(answers => {
        answers = {
          ...a,
          name
        }
        const fileName = path.resolve(process.cwd(), path.join('.', name))
        if (a.projectType === 'remote-origin') {
          if (answers.gitAddreaa) {
            const spinner = logStart('开始从远程下载文件');
            getRemoteTem(answers.gitAddreaa, fileName).then(target => {
              getNewProjectSuccess(answers, fileName);
              logSuccess(spinner, '下载成功了');
              npmInstallAuto(fileName);
            }).catch(error => {
              logFaild(spinner, '下载失败', error);
              deleteFiles(fileName);
              return
            })
          } else {
            console.log(symbols.error, chalk.red('必须输入远程地址'));
            return
          }
        } else {
          const spinner = logStart('创建文件夹');
          // 复制文件夹
          copyFiles(`${path.resolve(__dirname,'../lib')}/${answers.projectType}/`, `${fileName}`).then(() => {
            getNewProjectSuccess(answers, fileName);
            logSuccess(spinner, '工程模板已经复制成功了');
            npmInstallAuto(fileName);
          }).catch(error => {
            logFaild(spinner, '复制文件错误', error);
            deleteFiles(fileName);
            return
          })
        }
      })
    })
  } else {
    // 错误提示项目已存在，避免覆盖原有项目
    console.log(symbols.error, chalk.red('项目已存在'));
    return
  }
});
program.parse(process.argv);
