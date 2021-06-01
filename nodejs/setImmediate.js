/*
setImmediate()方法：
 -立即执行计时器
 -当浏览器执行完同步代码后会立即执行这个函数
*/
/*setImmediate(()=>{
    console.log(2);
}) */
/*process.nextTick():
         -立即执行函数
         -当浏览器执行完同步代码后会立即执行这个函数
         -如果你希望异步任务尽可能快的执行，那就使用
         process.nextTick要优于所有的异步代码执行 */
console.log(1);
setImmediate(()=>{
    console.log(2);
})
process.nextTick(()=>{
    console.log(4);
})
console.log(3);