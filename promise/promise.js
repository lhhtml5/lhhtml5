//封装一个myPromise的类
//exector是默认回调函数
function myPromise(exector){
  //给实例化对象扩展两个属性值 status value
   const _this = this;
   _this.status = "pending";
   _this.value = undefined;
   _this.callFn = {};
//封装resolve和reject函数
function resolve(value){
  if(_this.status !== "pending")return;
  _this.status = "resolved";
  _this.value = value;
   //保证then中函数为异步代码
  setTimeout(() => {
    _this.callFn.onResolved && _this.callFn.onResolved(value);
  });
}

function reject(reason){
  if(_this.status !=="pending")return;
  _this.status = "rejected";
  _this.value = reason;
  //保证then中函数为异步代码
  setTimeout(() => {
    _this.callFn.onRejected && _this.callFn.onRejected(reason);
  });
}
//当构造函数被实例化的时候exector直接触发
  exector(resolve,reject);
}

myPromise.prototype.then = function(onResolved,onRejected){
    const _this = this;
    //用户在使用then的时候可能不使用第2个参数，所以需要处理
    onRejected = typeof onRejected !=="function"?function(reason){
      //处理第2个参数直接返回失败的信息
      throw reason;
    }:onRejected;
    //用户在使用then的时候可能不使用第2个参数，所以需要处理
    onResolved = typeof onResolved !=="function"?function(value){
      return value;
    }:onResolved;

    //then方法返回一个promise对象
    return new myPromise((resolve,reject)=>{
      //封装onResolved,onRejected个函数给实例化对象
      _this.callFn.onResolved=function(value){
        //onResolved调用可能会报错，如果出错则直接返回一个失败的promise对象
        try{
          const re = onResolved(value);
          //判断onResolved返回值是promise对象
          if (re instanceof myPromise){
              //如果re是promise对象则re成功调用resolve
              re.then((data)=>{
                   resolve(data);
              },(reason)=>{
                reject(reason);
              });
          }else{
            resolve(re);
          }
        }catch(e){
          //当then中的方法出错，则直接调用reject返回失败的promise
           reject(e);
        }
      
      };
      _this.callFn.onRejected=function(reason){
        try{
          const  re = onRejected(reason);
          if(re instanceof myPromise){
            re.then((value)=>{
              resolve(value);
            })
          }else{
            resolve(re);
          }
        }catch(e){
          reject(e);
        }
      };
    })
 
}
//catch处理
myPromise.prototype.catch = function(onRejected){
  return this.then(undefined,onRejected);
}
//finally处理
myPromise.prototype.finally = function(onResolved){
  //finally的返回值主要是看调用fianlly方法的promise对象
  return this.then((value)=>{
      const re = onResolved();
      if(re instanceof myPromise){
          return re.then(()=>{
              return value;
            })
      }else{
        return value;
      }
  },(reason)=>{
    const re = onResolved();
    if(re instanceof myPromise){
       re.then(()=>{
         //就算re是成功的 finally也会返回失败
         throw reason;
       })
    }else{
      //只要报错则它会让你直接返回失败的promise对象
      throw reason;
    }
  })
}
//resolve静态方法
myPromise.resolve = function(value){
  return new myPromise((resolve,reject)=>{
   if(value instanceof myPromise){
     //根据value的promise的情况 调用resolve或reject
          value.then((value)=>{
            resolve(value);
          },(reason)=>{
            reject(reason);
          })
   }else{
     resolve(value);
   }
  })
}
//reject静态方法
myPromise.reject = function(){
  return new myPromise((resolve,reject)=>{
    //无论reject的参数是什么都是失败promise对象的值
    reject(reason);
  })
}
//all静态方法
myPromise.all=function(promises){
  return new myPromise((resolve,reject)=>{
    //声明一个空数组，存放每一个promise的值
    const promiseArr= [];
    //获取promise的总长度
    const promiseL = promises.length;
    //声明一个成功计数器
    let promsieCount = 0;
    promises.forEach((promise,index)=>{
      promise.then((value)=>{
        promsieCount++;
        promiseArr[index]=value;
        if(promsieCount===promiseL){
          resolve(promiseArr);
        }
      },(reason)=>{
        //只要有一个失败 直接返回失败
        reject(reason)
      })
    })
  })
}
//allSettled静态方法
myPromise.allSettled = function (promises){
  //一定返回一个promise对象
  return new myPromise((resolve,reject)=>{
     //获取总长度
     const promisel =promises.length;
     //声明一个成功计算器
     let promiseCount = 0;
     //用来存放组成的对象
     const promiseArr =[];
     promises.forEach((promise,index)=>{
         promise.then((value)=>{
           //无论成功还是失败都要累加
           promiseCount++;
           promiseArr[index]={
             status:"resolved",
             value
           };
           if(promiseCount === promisel){
             resolve(promiseArr);
           }
         },(reason)=>{
          promiseCount++
          promiseArr[index]={
            status:"rejected",
            reason
          }
          if(promiseCount === promisel){
            resolve(promiseArr);
          }
        })
     })
  })
}