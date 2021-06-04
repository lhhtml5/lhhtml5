const http = require("http");
const server = http.createServer((request,response)=>{
    //回调函数有2个参数，一个是请求对象request,
    //一个是响应对象response
    console.log("客户端请求");
    //在response对象上有一个setHeader方法 可以设置响应头
    response.setHeader("Conntent-Type","text/plain;charset=utf-8");
    //response的end方法就是返回响应，参数就是响应的内容
    response.end("666");
})
let port ="3000";
let host ="127.0.0.1";
//给当前创建的服务添加端口号和主机地址，第3个参数是回调函数
server.listen(port,host,()=>{
    console.log("服务器启动，请访问："+`http://${host}:${port}`);
})