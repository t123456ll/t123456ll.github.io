---
title: HTTP学习笔记
date: 2019-11-06 00:23:42
tags: HTTP
keywords: HTTP
description:
---

教材：图解HTTP

分享一下自己做的笔记。share my note about studying HTTP

<!--more-->

1. TCP/IP协议：

   四层：应用层，传输层，网络层，数据链路层。

   应用层 application layer：FTP, DNS, HTTP

   传输层 transport layer：TCP, UDP

   网络层 network layer ：处理数据包 Packet，路由选择 routing

   数据链路层 data link layer: hardware part, control OS, network interface card.

2.  Encapsulate :

![Imgur](https://imgur.com/D3PXQ1p.jpg)

3. TCP/IP 协议介绍：

   HTTP: generate requirement message, address requirement message

   TCP: Three-way handshaking, ACK, SYN.

   ​         Message ----split into----> segment 

   ​         several segments -----re-organize----> Message

   IP: routing 

   ARP: address resolution protocol, IP address -> MAC address

   DNS: domain name system. Domain name -> IP address

4. URI & URL

   URI: Uniform (统一的格式) Resource (各种资源，图片，文字等，或是整个集合) Identifier (标识资源)

   URL: Uniform Resource Locator(标识资源地点)

   URL $\subseteq$ URI

5. HTTP是不保存状态的协议 (stateless): 不保存过往请求和响应，不记录client

   简单高效，但是存在问题：用户登陆一个购物网站，你需要记录用户的登录状态，哪怕切换到别的网页。

   解决方法: 1. 在报文中加入参数管理登录状态。2. **cookie**

   

6. HTTP 协议支持的一些方法

   ![image-20191104162543231](https://imgur.com/1TV03lX.png)

7. 多部分对象集合

   MIME (multipurpose Internet Mail Extension) 让我们在发送邮件时，可以添加文件，图片等附件

   HTTP也有相似的功能。

8. 获取部分的范围请求

   当下载中断时，需要从中断部分重新开始下载，而不是全部在发一遍，这时候就需要用到 获取部分的范围请求 (Range request)。用到首部字段 range 标记 byte 范围

9. 内容协商 content negotiation

   根据协商返回最适合的内容。如根据浏览器语言设置返回中文界面还是英文界面。

10. 返回结果里的HTTP状态码

    ![image-20191104165812216](https://imgur.com/9P4CRtW.png)

    可能一提专业名称大家都没反应过来这是啥，但是大家一定知道404 Not Found，这就是状态码的一种，标识服务器上找不到资源或者是服务器无理由拒绝请求。

11. 一台web服务器可以搭建多个有独立域名的web网站

    因为在物理层面上只有一台服务器，所以表面域名不同，但是IP地址是相同的。所以在发送HTTP请求时，需要在host里完整指明主机名或者域名的URI

12. 数据转发程序：代理，网关，隧道

    代理：

    1）是否使用缓存：缓存代理 Caching Proxy，接收第一次资源请求时，将资源副本（缓存）保存在代理服务器上。如果下次还有相同请求，直接发送副本，就不用从源服务器上再次获取资源了。

    2）是否修改报文：透明代理 Transparent Proxy，不对报文进行修改。

    网关：

    和代理很像，可以使用网关提高通行安全（在客户端和网关的通信间进行加密）

    隧道：
    本身不会解析HTTP请求，但是会使用SSH等加密手段确保通信等安全。

13. 缓存

    可以有效减少对源服务器资源请求的次数。

    有效期：[LRU Cache](https://leetcode.com/problems/lru-cache/)

    位置：缓存服务器，客户端（临时网络文件）

14. HTTP首部

    HTTP/1.1规范47种首部字段，共四类：general header fields, request header fields, response header fields, Entity header fields.

    非规范首部字段有: cookie, set-cookie, content-deposition

    general header fields: Both of requirement message and response message will use this part

    a. cache-control: 

15. 为cookie服务的首部字段：

    Set-cookie: 开始状态管理所使用的cookie信息

    cookie: 服务器接收到的cookie信息

16. 其他首部字段：

    X-Frame-Options: 控制网站内容在其他网站frame标签内显示的问题，防止点击劫持

    X-XSS-Protection: 针对跨站脚步攻击(XSS)的一种策略

    DNT (do not track)：拒绝个人信息被收集，防止精准投放

    P3P: 保护用户隐私。

17. HTTP 的缺点

    1. 不验证用户身份：可能遭遇伪装 lack of authentication

       解决方法：查明对手证书SSL

    2. 使用明文传输：可能会被窃取 Clear (plain) text transmission

       使用抓包工具 Wireshark就可以进行解析

       解决方法：通信加密（Secure Socket Layer + Transport Layer Security），内容加密

    3. 无法证明报文完整性：被篡改也不知道 

       解决方法MD5和SHA-1等散列值校验方法

       使用数字签名 Digital Signature

18. HTTPS = HTTP + 加密 + 认证 + 完整性保护

    HTTPS只是将HTTP的通信接口用SSL和TLS协议代替了

    ![image-20191104205811275](https://imgur.com/C3vantT.png)

19. SSL的加密方式 公开密钥加密（public key cryptography）

    加密方式是公开的，密钥是保密的，如果使用一把密钥进行加密时，仍然有密钥被窃取的风险

    对称密钥Symmetric-key algorithm

    所以使用两把密钥进行公开密钥加密：使用一对非对称密钥，一把叫private key，一把叫public key

    HTTPS采用两种方式的混合加密

20. 验证访问用户的身份 authentication

    你说你是ueno并不能代表你就是ueno，所以就需要核对一些只有访问者自己才知道的信息（取快递时问你电话号码）。

    HTTP使用的认证方式：

    1. Basic认证：[here](https://juejin.im/entry/5ac175baf265da239e4e3999)

       过程：客户端发送访问请求 --> 服务器返回401要求身份验证 --> 客户端发送用户名：密码以base64编码处理 --> 服务器返回成功200

       缺点：1. 因为base64不是加密编码，所以还是会有信息被盗的风险。2. 无法实现认证注销

    2. DIGEST认证：采用质询码nonce进行认证。nonce随机产生

    3. SSL客户端验证：使用客户端证书client certificate 进行的验证

       过程：事先分发证书，客户端发送访问请求 --> 服务器发送 certificate request报文 --> 客户端发送 client certificate --> 服务器验证

    4. 基于表单 credential 的认证：各种网站的登录界面

21. Session and Cookie

    过程：客户端发送用户ID和密码 --> 服务器身份验证，然后将 Session ID 和用户认证状态绑定，向客户端返回响应时会把 Session ID 放在 Set Cookie里 ---> 客户端接收后，保存Cookie到本地，里面的Session ID也就自动保存了，下次就自动发送给服务器，然后服务器端就可以验证 Session ID

22. 密码加盐 salt（减少密码特征，防止用密码特征库破解），再hash，可以用来保存用户名和密码。

23. Ajax (Asynchronous JavaScript and XML) 利用JavaScript and DOM 实现局部网页更新

    why：Facebook的内容更新，不可能每次都更新整个页面。所以需要Ajax进行局部更新

    ![Imgur](https://imgur.com/idjqEtS.jpg)

24. Comet 通过延迟应答，实现服务器端向客户端发送更新。可以实现实时更新，但是为了维持连接会消耗更多资源<img src="https://imgur.com/812yZOs.jpg" alt="image-20191105122357111" style="zoom:40%;" />

25. SPDY协议

    为了在协议级别消除HTTP的瓶颈，在TCP/IP的应用层与运输层之间加入会话层进行运作

    <img src="https://imgur.com/bEOH1BZ.jpg" alt="image-20191105122619686" style="zoom:40%;" />

26. 使用浏览器进行全双工通信的WebSocket

    可以调用WebSocket API实现协议下的全双工通信。

27. HTML (HyperText Markup Language)

    CSS (Cascading Style Sheets)

    DOM (Document Object Model)

    CGI (Common Gateway Interface)

    XML (eXtensible Markup Language): 用标签分割而成的树形结构，更容易对数据进行读取

    JSON (JavaScript Object Notation): 



