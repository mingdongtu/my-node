const http = require('http');
const conf = require('./config/defaultConfig');
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const server = http.createServer((req,res)=>{  //等号左边是返回的值
 const filePath = path.join(conf.root,req.url)
 fs.stat(filePath,(err,stats) =>{
          if(err){   //文件不存在
            res.statusCode = 404;
            res.setHeader('Content-Type','text/plain') ;
            res.end(`${filePath} is not a directory or file`);
            return
          }
          if(stats.isFile()){  //文件存在
            res.statusCode = 200;
            res.setHeader('Content-Type','text/plain') ;
            fs.createReadStream(filePath).pipe(res)  
          }else if(stats.isDirectory()){
                 fs.readdir(filePath,(err,files)=>{
                  res.statusCode = 200;
                  res.setHeader('Content-Type','text/plain') ;
                  res.end(files.join(','))  ;
                 })
          }
 })
//  res.statusCode = 200;
//  res.setHeader('Content-Type','text/plain') ;
//  res.end(filePath)
})
// 监听端口
server.listen(conf.port,conf.hostname,()=>{
         const addr = `http://${conf.hostname} : ${conf.port}`;
         console.info(`Server started at ${chalk.green(addr)}`)
})