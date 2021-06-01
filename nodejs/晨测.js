/*
js事件轮询机制：
 代码分类
  同步代码（初始化代码）：设置定时器，绑定事件，执行for等待。。。
  异步代码 （回调执行代码）：定时器回调，事件回调，ajax回调。。。
  js先执行同步代码在执行异步代码
 js事件轮询模型
  主线程 浏览器的管理模块（DOM事件管理，Ajax管理，定时器管理）
  回调队列
 模型的运转流程
  执行初始化代码，将异步回调函数交给对应模块管理
  当异步回调函数需要被执行的时候，将回调函数添加到回调队列中
  当同步代码执行完毕之后，会遍历调用回调队列中的回调函数执行
谈一谈nodejs事件轮询
  js是单线程的，nodejs做到非阻塞是因为在nodejsn内部使用了第三方
  库libuv,nodejs会把IO，文件读取等异步操作交由他处理，而nodejs主
  线程可以继续去处理其他的事情

  libuv会开启不同的线程去处理这些延时操作，处理完后，会把异步操作
  的回调函数方法nodejs的轮询队列中，nodejs会在适当的时候处理轮询
  队列中的回调函数，从而实现非阻塞

  node的事件轮询分为六个阶段，每个阶段都有一个FIFO（先进先出）队列
  来执行回调，事件轮询会依次进入每一个回调队列，当该队列已经用尽
  或达到回调限制，事件循环将移动到下一个阶段。
  六个阶段
   1.timers:用来处理setTimeout()和setInterval()的回调函数
   2.pending callbacks阶段：这个阶段用来处理系统操作的回调函数（可以忽略）
   3.idle prepare阶段：此阶段是仅供nodejs内部操作调用，忽略
   4.poll阶段：这个阶段主要来处理如IO操作，网络请求等异步操作
   当poll阶段的回调函数队列不为空的时候，则处理队列中的回调函数，
   直到队列为空或者达到上限的时候，就跳过此阶段，处理下一阶段。
   当poll阶段的回调函数队列为空的时候，系统会在此阶段等待新的
   回调函数入队，再进行处理，但是如果timers阶段有回调函数需要执行，
   或者check阶段有setlmmediate需要执行，则立马进入下一个阶段
   5.check阶段：这个阶段用来处理setlmmediate的回调函数
   6.close callbacks阶段：这个阶段用来处理如socket的close事件
 
*/ 
/*
书写git命令
 初始化仓库 git init
 提交到暂存区 git add
 提交到本地仓库 git commit -m“”
 撤销暂存区的提交 git restore .
 撤销工作区的改动 git restore --staged .
 对比工作区和暂存区差异 git diff
 对比工作区和仓库的差异 git diff --cached
 查看历史版本 git log
 回滚其他版本 git reset --hard/--mixed/--soft commitID
 查看分支 git branch
 创建并切换分支 git checkout -b branchName
 切换分支 git checkout branchName
 删除分支 git branch -d branchName
 合并分支 git merge branchName
 本地仓库关联远程仓库 git remote add origin "地址"
 本地仓库提交到远程仓库 git push -u origin master
 本地仓库拉取远程仓库的更新 git pull origin master
 本地仓库拉起远程仓库的其他分支 git fetch origin dev:dev
*/ 
/*
谈一谈宏任务和微任务
  异步代码有优先级关系。有的优先级高先执行，有的优先级低后执行
  异步代码分为宏任务（macrotask）和微任务（microtask）
    宏任务：包括整体代码script,setTimout,setInterval等等
    微任务：Promise.then/catch/fanally,process.nextTick,
    queueMicrotask(nodejs语义化方法，就是微任务的意思)
  js引擎执行异步代码。会优先执行微任务，在执行宏任务
   微任务优先级高，优先级最高的是process.nextTick,其他微任务，
   按代码顺序依次执行
   宏任务优先级低：顺序看nodejs的事件轮询机制
  过程如下：
   1.执行栈 选择最先进入队列的宏任务（一般都是script）,执行其同步
   代码直至结束，在执行同步的时候如果有设置异步代码，会把微任务放入微任务队列
   把宏任务交给对应的模块管理
   2.检查是否存在微任务，有则会执行至微任务队列为空；
   3.执行宏任务中的异步代码（setTimeout等回调）

*/ 