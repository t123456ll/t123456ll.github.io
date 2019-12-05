---
title: 如何上传博客源代码到Github分支
date: 2019-12-05 15:59:05
tags: [Github, Hexo, 学习笔记]
keywords: [Github, Hexo, 学习笔记]
description: 网上有很多相互抄来抄去的文章，错误一大堆，无法复现，找了很久，终于发现一个正确的方法，故自己总结再分享之。
---

环境：本篇文章是建立在使用Mac，默认已经有github账号，和博客仓库，并且使用hexo + github page的基础上，介绍一种简单的上传博客源代码的方法。

Precondition: This article is based on using a Mac, at least already has a github account, and a blog repository, and using hexo + github page, introduces a simple method to upload blog source code to your github repository.

为什么这么做：很多人有疑问，我不是已经上传了（hexo d）网站到github page上去了吗？为什么还需要再传一次？首先，使用hexo d命令上传的是根据网站源码已经编译好的，网站的静态HTML文件，所以当有访问请求时，会直接来访问github page的服务器来读取这些文件，从而显示你的个人网站。所以网站源码和HTML文件是不同的。所以你也就有理由去把这部份网站源码给保存下来了，以防本地代码的丢失。

**Why**: Many people have questions, haven't I uploaded the (hexo d) website to the github page? Why do I need to upload it again? First, the hexo d command uploads the static HTML files of the website that have been compiled according to the source code of the website, so when there is an access request, it will directly visit the server on the github page to read these files, thereby displaying your personal website . So the website source code is different from the HTML file. That is why you need to save the source code of your website to prevent the loss of local source code.

如何做：两种方法，一种先在github建好分支，然后clone，第二种，在本地建立git分支，关联你的github仓库，然后上传，我这里介绍最后一种

先到终端，切换到你博客的文件夹

<img src="https://imgur.com/qvCVwzq.jpg" style="zoom:50%;" />

然后初始化git，再查看一下git 状态，发现这些都没有上传，就一顿add，commit操作

```
git add .
git commit -m 'source code'
```

<img src="https://imgur.com/3kcuIrN.jpg" style="zoom:50%;" />

然后创建一个新分支，取一个名字比如 ‘source’。切换到这个分支。查看一下，现在本地已经有两个分支了。

```
git branch source
git checkout source
git branch
```

<img src="https://imgur.com/2chLshU.jpg" style="zoom:50%;" />

然后开始关联你的github。我们注意到没有关联前，是没有远程仓库信息的，关联后就有了origin（代表远程仓库）

<img src="https://imgur.com/980ALyq.jpg" style="zoom:50%;" />

<img src="https://imgur.com/H4cFrVW.jpg" style="zoom:50%;" />

在这里获取你仓库的HTTPS地址，使用下面语句进行关联

```
git remote add origin https://github.com/your/your.github.io.git
```



关联好后就可以推送当前分支了，注意一定要在你刚刚创建的新分支 ‘source’上

```
git push -u origin source
```

回到github上查看，发现新的分支已经自动出来了，里面就是你网站的源代码。

<img src="https://imgur.com/PzvOmgn.jpg" style="zoom:50%;" />

当然我们也可以添加一下.gitignore，这样上传的时候git就不会去上传.gitignore里提到的这些文件。