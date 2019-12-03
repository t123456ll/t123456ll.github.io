---
title: HTML 学习笔记
date: 2019-12-02 20:12:02
tags: [HTML, 学习笔记]
keywords:
description:
---



教材：[W3school](https://www.w3school.com.cn/html/html_jianjie.asp), [MDN web doc](https://developer.mozilla.org/zh-CN/docs/learn/HTML/Introduction_to_HTML/Getting_started)

1. HTML hyper text markup language 超文本标记语言，是用来描述网页的一套语言。不是编程语言而是标记语言。标记语言是一套标记标签 markup tag。

2. markup tag 标记标签：

   成对出现，比如`` <b> 和 </b>``（没想到typora除了自动识别Markdown，也会识别HTML，可以使用``&lt; &gt;``  效果 &lt;p&gt;      &lt;/p&gt;），``<b>是开始标签，</b>是结束标签`` 

3. HTML 文档 = HTML 标签 + 纯文本 = 网页

4. ``<p>This is a paragraph.</p>``

   ``<h1>This is a heading.</h1>``

   ``<a href="http://......">This is a link.</a>`` 在href 属性中指定地址

   ``<img src="aaa.jpg" width="104" height="142" />`` 图像的名称和尺寸是以属性的形式提供的。注意，这是一个空元素void element, 即使是空元素，也需要加结尾/>

5. HTML 元素

   HTML元素是从开始标签到结束标签里所有的代码。某些元素有空内容。大多数元素可以拥有属性。元素之间可以嵌套。

   虽然对大小写不敏感，但推荐使用小写标签，然后每一个元素都要关闭，哪怕是空元素 ``<br />`` ``<img src="aaa.jpg" width="104" height="142" />``

6. HTML 属性

   属性可以为元素提供更多的信息。总是以名称=值（name=“value”）形式出现。总是在开始标签里规定。

   多个属性之间空格间隔，属性名称后紧跟=，属性值**一定**要使用“”包围（不然浏览器会误解）

   虽然对大小写不敏感，但推荐使用小写。始终为属性加引号，单双引号都可以，但里面出现双引号，外面就要使用单引号。

   布尔属性：属性值与属性名称相等，如disabled

   [例子](https://www.w3school.com.cn/html/html_attributes.asp)， [全局属性参考手册](https://www.w3school.com.cn/tags/html_ref_standardattributes.asp)

7. 当显示页面时，浏览器会移除*源代码中*多余的空格和空行。**所有连续的空格或空行都会被算作一个空格**。需要注意的是，HTML 代码中的所有连续的空行（换行）也被显示为一个空格

   如果想保留这些换行和空格，可以使用```<pre>This is    a paragraph.</pre>```

8. 超级链接:

   基本格式

```html
<a href="url">Link text</a>
```

​        target：在新窗口打开网页

```html
<a href="http://www.w3school.com.cn/" target="_blank">Visit W3School!</a>
```

​        name：命名锚，读者看不见，但可以用它实现界面跳转。使用 id 属性来替代 name 属性，命名锚同样有效。

```html
<a name="label">锚（显示在页面上的文本）</a>
```

然后，我们在同一个文档中创建指向该锚的链接：

```html
<a href="#label">有用的提示</a>
```

您也可以在其他页面中创建指向该锚的链接：

```html
<a href="http://www.w3school.com.cn/html/html_links.asp#tips">有用的提示</a>
```

9. **当同一个 HTML 元素被不止一个样式定义时，会使用哪个样式呢？**

   一般而言，所有的样式会根据下面的规则层叠于一个新的虚拟样式表中，其中数字 4 拥有最高的优先权。

   1. 浏览器缺省设置
   2. 外部样式表
   3. 内部样式表（位于 <head> 标签内部）
   4. 内联样式（在 HTML 元素内部）

   因此，内联样式（在 HTML 元素内部）拥有最高的优先权，这意味着它将优先于以下的样式声明：<head> 标签中的样式声明，外部样式表中的样式声明，或者浏览器中的样式声明（缺省值）。

10. 块级元素(block-level)和内联元素(inline)

    Block-level element: will appear on a new line eg. 

    Inline element: are contained within block-level elements and surround only small parts of the document’s content

```html
<em>first</em><em>second</em><em>third</em> inline element

<p>fourth</p><p>fifth</p><p>sixth</p>  block element
```

11. 元数据 <meta>元素

元数据就是描述数据的数据

```html
<meta charset="utf-8"> 字符集
```

utf-8包含了任何人类语言的大部分字符，没有出现在字符集里的字符会显示乱码。

```html
<meta name="author" content="Chris Mills">
<meta name="description" content="The MDN Learning Area aims to provide
complete beginners to the Web with all they need to know to get
started with developing web sites and applications.">
```

指定包含关于页面内容的关键字的页面内容的描述是很有用的，因为它可能或让你的页面在搜索引擎的相关的搜索出现得更多，SEO搜索引擎优化。description就是出现在搜索网页结果下面的一段描述。

许多meta元素不再使用了，比如key — 提供关键词给搜索引擎，根据不同的搜索词，查找到相关的网站 — 已经被搜索引擎忽略了， 因为作弊者填充了大量关键词到keyword， 错误地引导搜索结果。

其他类型元数据：

```html
<meta property="og:image" content="https://developer.cdn.mozilla.net/static/img/opengraph-logo.dc4e08e2f6af.png">
<meta property="og:description" content="The Mozilla Developer Network (MDN) provides
information about Open Web technologies including HTML, CSS, and APIs for both Web sites
and HTML5 Apps. It also documents Mozilla products, like Firefox OS.">
<meta property="og:title" content="Mozilla Developer Network">

```

在facebook（不仅仅，linkedin也支持）上链接网页时，所展示的图片，描述和标题

12. 在HTML里应用CSS和JavaScript

    HTML：网站内容

    CSS：网站样式

    JavaScript：网站的互动

    1. link元素经常位于文档的头部。这个link元素有2个属性，rel="stylesheet"表明这是文档的样式表，而 href包含了样式表文件的路径
    2. Script 元素放在文档末尾，这样可以确保在加载脚本之前浏览器已经解析了HTML内容（如果脚本加载某个不存在的元素，浏览器会报错）

```html
<link rel="stylesheet" href="my-css-file.css">

<script src="my-js-file.js"></script>

```

