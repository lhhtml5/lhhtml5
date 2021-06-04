const fs = require("fs");
const path = require("path");
const readFilePath = path.resolve(__dirname,"01.txt");
const writeFilePath = path.resolve(__dirname,"02.txt");
//流式读取数据 创建可读流
const rs = fs.createReadStream(readFilePath);
const ws = fs.createWriteStream(writeFilePath,{
    flag:"a"
});
//pipe会持续性消费可读流数据将可读流数据写入到可写流中
//自动关闭可写流
rs.pipe(ws);
//监听可读流
rs.on("end",(err)=>{
    console.log("读取完成");
})