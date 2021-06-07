//查看当前Mongo中所有的数据库
//show databases

//使用或创建一个数据库
//use atguigu

//查看当前所在的数据库
//db
//新增一条数据
//db.student.insert({name:"小龙女"，age：612，sex:"女"})
//新增多条数据
//db.student.insert([{name:"杨过"，age：600，sex:"男"},{name:"尹志平",age:702,sex:"男"}])
//查找当前集合所有的数据
//db.student.find()

//查找当前集合 所有年龄为xxx的数据
//db.student.find({age:xxx})

//查找当前集合 年龄小于等于600岁的
//db.student.find({age:{$lte:600}})

//查找当前集合 年龄大于等于600岁的
//db.student.find({age:{$gte:600}})

//查找当前集合 年龄符合 600 612的
//db.student.find({$in:[600,612]})

//查找当前集合 以xxx为开头（正则表达式）
//db.student.find({name:/^xxx/})

//查找符合where条件的
/*db.student.find({$where:function(){
    return this.age>600 || this.age<40
}})*/
//查找符合条件的数据 并限制显示的字段 只显示name和age
//db.student.find({},{name:1,age:1})
//查找符合条件的数据 并限制显示的字段 不显示age
//db.student.find({},{age:0})

//修改某个符合条件的数据
//db.student.updateOne({sex:男},{$set:{age:2}})
//修改所有符合条件的数据
//db.student.updateMany({sex:"男"},{$set:{age:4}})

//删除某个符合条件的数据
//db.student.deleteOne({age:xxx})
