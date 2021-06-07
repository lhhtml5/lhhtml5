//这个数据db文件专门用来连接数据库
//1.引入mongoose模块
const mongoose =require("mongoose");
//2.连接数据库
mongoose.connect("mongodb://127.0.0.1:27017/atguigu",{

})
//当数据库连接成功以后会触发mongoose.connection的open事件
mongoose.connection.once("open",err=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("数据库连接成功");
})