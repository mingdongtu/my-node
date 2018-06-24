

const fs = require('fs')
const promisify = require('util').promisify  //去掉回调
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir)

module.exports = async function(req,res,filePath){
         //需要把整个封装到async 方法上
  try {  //回调成功调执行的代码
    const stats =await stat(filePath);  //接受filePath作为参数，成功后返回stats
      //  await 用于等待异步完成 ，并且只能在async方法中使用
      if (stats.isFile()) {  //文件存在
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        fs.createReadStream(filePath).pipe(res)
      } else if (stats.isDirectory()) {
        fs.readdir(filePath, (err, files) => {  //异步函数 readdir
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');
          res.end(files.join(','));
        })
      }
  
   
  } catch (ex){   //回调失败的时候
        res.statusCode = 404;
        res.setHeader('Content-Type','text/plain');
        res.end(`${filePath} is not a directory or file`);
  } 
}