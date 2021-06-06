const http = require("http");
const fs = require("fs");
const path = require("path");
const setver=http.createServer((request,response)=>{
    console.log("客户端请求");
 //获取文件地址
 const filePath = path.resolve(__dirname,"01.mp4");
 const rs = fs.createReadStream(filePath);
 response.setHeader("Content-Type","video/mp4;charset=utf-8");
 //response本身是可写流
 rs.pipe(respones);
})
let port ="3000";
let host ="127.0.0.1";
//给当前创建的服务添加端口号和主机地址，第3个参数是一个回调函数
server.listen(port,host,()=>{
    console.log("服务器启动，请访问"+`http://${host}:${port}`);
})