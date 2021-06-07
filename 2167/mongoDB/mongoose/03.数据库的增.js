//引入模块
const mongoose = require("mongoose");
//连接数据库
mongoose.connect("mongodb://127.0.0.1:27017/atguigu",{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
//连接成功触发open事件
mongoose.connection.once("open",err=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("数据库连接成功");
})

//创建Schema对象，方便未来对某个集合的值进行约束
const leadership = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    age:Number,
    sex:String,
    hobby:[String],
    createTime:{
        type:Date,
        default:Date.now  
    }
})
//4.创建model对象（集合）
//两个参数：集合的名字 集合的约束对象
const leaderModel = mongoose.model("leader",leadership);
//初始化集合的内容（也可以不初始化，直接增）
new leaderModel({
    name:"胡子",
    age:24,
    sex:"男",
    hobby:["唱","跳"],
    createTime:Date.now()
}).save((err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("leader初始化成功");
})
//增加多个文档
leaderModel.create([{
    name:"王四",
    age:22,
    sex:"女",
    hobby:["篮球","rap"],
    createTime:Date.now()
},{
    name:"旺旺",
    age:25,
    sex:"男",
    bobby:["篮球","网球"],
    createTime:Date.now()
},{
    name:"旺仔",
    age:21,
    bobby:["排球","游泳"],
    createTime:Date.now()
}],err=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("数据添加成功");
})

