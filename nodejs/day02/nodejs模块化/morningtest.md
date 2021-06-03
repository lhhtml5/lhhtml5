谈一谈定义模块
默认情况下模块内部代码对于外部来说都是不可可见的，可以通过两种方式向外部
暴露变量和函数
两种方法暴露如下
 module.exports
  默认是一个对象{}，是真正暴露的对象，也就是module.exports指向的对象是谁，就暴露谁
 expots
  是module.exports的一个引用，指向的是module.exports默认对象
谈一谈模块引入和模块标识
 引入模块 使用require方法
 模块的标识 就是require中的参数
 引入模块类型
   自定义模块 需要添加路劲信息（当前文件夹需要添加./）可以省略文件后缀名（按照顺序默认添加 1.js 2.json 3.node)
   node内部模块 直接书写模块名称即可
   第三方模块（jQuery \ vue等） 首先需要npm下载，然后在直接写当前模块名称
书写git命令
 初始化仓库 git init 
 提交到暂存区 git add .
 提交到本地仓库 git commit -m "xx"
 撤销暂存区的提交 git restore .
 撤销工作区的改动 git restore --staged .
 对比工作区和暂存区差异 git diff
 对比暂存区和仓库的差异 git diff -cached
 查看历史版本 git log /git log --online 
 回滚其他版本 git reset --hard / --mixed  /--soft commitID
 查看分支  git branch
 创建并切换分支 git checkout  -b branchName
 切换分支  git checkout branchName
 删除分支  git branch -d branchName
 合并分支  git merge branchName
 本地仓库关联远程仓库 git remote add origin "地址"
 本地仓库提交到远程仓库 git push -u origin master
 本地仓库拉取远程仓库的更新 git pull origin master
 本地仓库拉起远程仓库的其他分支 git fetch origin Dev：Dev  
