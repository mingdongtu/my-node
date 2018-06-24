const http = require('http');
const conf = require('./config/defaultConfig');
const chalk = require('chalk')
const path = require('path')
const route = require('./helper/route')



const server = http.createServer((req, res) => {  //等号左边是返回的值
  const filePath = path.join(conf.root, req.url)
   route(req,res,filePath);



})
// 监听端口
server.listen(conf.port, conf.hostname, () => {
  const addr = `http://${conf.hostname} : ${conf.port}`;
  console.info(`Server started at ${chalk.green(addr)}`)
})