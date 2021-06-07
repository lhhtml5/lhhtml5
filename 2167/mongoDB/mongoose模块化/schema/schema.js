const mongoose = require("mongoose");
//创建Schema对象，方便未来对某个集合的值进行约束
const teacherSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true//必填项
    },
    age:Number,
    sex:String,
    hobby:[String],
    createTime:{
        type:Date,
        dafalut:Date.now
    }
});
//直接把这个schema所约束的集合给创建了
const teacherModel = mongoose.model("teacher",teacherSchema);
//把创建集合暴露出去
module.exports = teacherModel;