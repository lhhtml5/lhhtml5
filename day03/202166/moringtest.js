/* 
谈一谈HTTP协议
  超文本传输协议
  协议是指计算机通信网络中两台计算机之间进行通信所必须共同遵守的规定或规则
  这个规则规定了客户端和服务器互相发送的报文格式
  客户端发送给服务器的称为“请求报文”，服务器发送给了客户端的称为“响应报文”
常见MIME类型：
  text/plain:普通文本
  text/css：css文件
  text/html:html文件
  application/javascript:js文件
  image/图片格式：图片
  video/视频格式：视频
  aduio/音频格式：音频
  application/x-www-form-urlencoded:form表单格式
  
  */
 /*
 谈谈请求方式
 GET:读取数据，不应该对数据产生任何副作用（查）
 POST:提交数据，表单的提交，文件的上传，一般用来创建一个资源（增）
 put:提交数据，修改数据内容（改）
 DELETE:请求删除某个资源（删）
 HEAD：和GET类型，只不过不返回响应体，只返回响应头（查询一些资源的信息）
 OPTIONS：预检请求，一般浏览器自动发送请求，检查服务端是否支持某个请求方法
 
 */
/*
谈一谈状态码
 HTTP响应状态代码（status)指示特定HTTP请求的状态。响应分为五类
  1xx：请求已经被服务端接收，继续处理中
  100：请求正常，可以继续请求
  101：需要切换协议
  102：服务端正在处理，但是还没有找打资源

  2xx:请求已被服务器接收，并且处理完成
  200:请求成功
  201：请求处理成功，并创建了新资源常见POST请求

  3xx:需要后续操作才能完成请求
  301：永久重定向
  302：临时重定向
  304：读取缓存

  4xx:客户端错误（服务器无法执行）
  400：请求中出现语法错误
  401：需要重新认证
  403：拒绝访问
  404：找不到资源

  5xx:服务端错误
   500：服务器执行过程中出现了错误
   503：服务器因为各种原因停止运行，无法处理请求
 
*/
/*
从url输出到渲染的过程
1.DNS解析
 把域名解析成ip地址去访问
 浏览器缓存，计算机缓存，路由器缓存，运营商缓存
2.TCP三次握手 
三次握手的意义在于，客户端和服务端双方都能确定对象的收发能力正常
客户端向服务端发送请求，服务端接收（客户端发送能力正常）
  发送一个syn字段包（K），syn是新连接的数据包
  服务端接收到请求，向客户端发送数据包，客户端接收（服务端接收能力和发送能力都正常）
  服务端发送一个ack+syn的数据包，ack=syn+1，表示确认
  客户端请求有效，然后并重新发送了一个新连接syn=k
  客户端向服务端发送请求，服务端接收（客户端接收能力正常）
  客户端发送一个ack=syn+1确认连接

3.客户端发送数据，把请求报文发送给服务端
4.客户端接收响应，服务端会生成响应报文发送给客户端
5.解析响应来的文件（渲染页面）
   1.构建DOM树：解析html结构为浏览器可以理解的DOM树结构
   2.构建cssom树（样式树）
   3.构建渲染树（render Tree）:合并DOM树和样式树，计算每一个节点位置和样式
   4.分层：页面有很多复杂的效果，为了实现效果会进行分层绘制（有滚动条的，3d的，半透明等等都需要分层）
   5.图层绘制：生成多个绘制指令
   6.栅格化：把图层不是一次性直接绘制，而是分为了多个图块
   7.合成及显示：把图块放在渲染的线程上开始绘制，并显示在浏览器中
6.断开连接：TCP四次挥手
  TCP是双向的，所有需要在2个方向分别关闭，每个方向的关闭又需要请求和确认，所有一共4次
  客户端发送释放信号给服务端（Fin数据包：表示释放信号）
  服务端接受到释放信号，并给出回应，确认收到释放信号，但是数据可能没有传输完毕，等待传输（ask数据包，确认接收释放信号）
  服务端发送释放信号给客户端，并表示数据发送完毕（Fin数据包：释放信号）
  客户端发送确认信息给服务端表示收到释放信号（ack数据包：确认接收释放信号）
 */