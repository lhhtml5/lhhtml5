function add(...test){
    return rest.reduce((p,i)=>{
           return p+i;
    })
}
/*默认情况下模块内部代码对于外部来说都是不可见的
可以通过两种方法暴露
  -module.exports
     -默认是一个对象{}，是真正暴露的对象，也就是module.
     exports指向对象是谁，就暴露谁
     -exports
     -是module.exports的一个引用，指向的是module.exports
     默认对象*/
     module.exports.add =add;