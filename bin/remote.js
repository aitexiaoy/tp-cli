const download = require('download-git-repo');
const path=require('path');

/**
 * 
 */
module.exports = function (remoteUrl,target) {
  target = path.join(target || '.', '.download-temp');
  // 默认master分支
  if(!remoteUrl.match('#')){
    remoteUrl=`${remoteUrl}#master`;
  }
  return new Promise((resolve, reject) =>{
    // 这里可以根据具体的模板地址设置下载的url，注意，如果是git，url后面的branch不能忽略
    download(remoteUrl,target, { clone: true }, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(target);
      }
    })
  })
}
