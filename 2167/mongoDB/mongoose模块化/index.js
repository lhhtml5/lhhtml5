//引入数据库模块
require("./db/db.js");

const teacherModel = require("./schema/schema.js");
teacherModel.findOne({
    age:19
})
.then(data=>{
    console.log(data);
}).catch(err=>{
    console.log(err);
})