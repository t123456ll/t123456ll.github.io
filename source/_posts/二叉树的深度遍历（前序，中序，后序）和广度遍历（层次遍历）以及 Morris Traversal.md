---
title: 二叉树的深度遍历（前序，中序，后序）和广度遍历（层次遍历）以及 Morris Traversal
date: 2019-12-03 15:33:03
tags: [Algorithm算法, 二叉树]
keywords: [Algorithm算法, 二叉树]
description: 二叉树是一种非常重要的数据结构，很多其它数据结构都是基于二叉树的基础演变而来的。对于二叉树，有深度遍历(DFS)和广度遍历(BFS)，深度遍历有前序(preorder)、中序(inorder)以及后序(postorder)三种遍历方法，广度遍历即我们平常所说的层次遍历。因为树的定义本身就是递归定义，因此采用递归的方法去实现树的三种遍历不仅容易理解而且代码很简洁，而对于广度遍历来说，需要其他数据结构的支撑，比如堆或者队列。
---


二叉树是一种非常重要的数据结构，很多其它数据结构都是基于二叉树的基础演变而来的。对于二叉树，有深度遍历(DFS)和广度遍历(BFS)，深度遍历有前序(preorder)、中序(inorder)以及后序(postorder)三种遍历方法，广度遍历即我们平常所说的层次遍历。因为树的定义本身就是递归定义，因此采用递归的方法去实现树的三种遍历不仅容易理解而且代码很简洁，而对于广度遍历来说，需要其他数据结构的支撑，比如堆或者队列。

那么什么是前序，中序，后序，广度遍历呢：

Binary tree is a very important data structure. Many other data structures have evolved based on the basics of binary trees. For binary trees, there are depth first search (DFS) and breadth first search (BFS). DFS has three traversal methods: preorder, inorder, and postorder. BFS is the what we usually call level traversal. Because the definition of the tree itself is recursive, using the recursive method to implement the three types of traversal of the tree is not only easy to understand, but the code is very concise. For breadth traversal, it needs the support of other data structures, such as the heap or queue.

So what is preorder, middle order, postorder, breadth traversal:

<!-- more -->

比如有如下一颗树 we have a following tree：

```
    1
   / \
  2   5
 / \   \
3   4   6
```

1. 前序 pre-order：123456

   根结点 ---> 左子树 ---> 右子树

   Root node ---> left node ---> right node

2. 中序 in-order：324156

   左子树 ---> 根结点 ---> 右子树

   Left node ---> root node ---> right node

3. 后序 post-order：342651

   左子树 ---> 右子树 ---> 根结点

   Left node ---> right node ---> root node

4. 广度 level-order：125346

### 深度遍历

前序，中序，后序都可以通过递归来实现，而且代码比较简洁。但是还可以通过Morris traversal 来实现，至于什么是Morris traversal 请看我的[博文](https://t123456ll.github.io/LeetCode-144-Binary-Tree-Preorder-Traversal.html#more)

The pre-order, in-order and post-order can be implemented by recursion, and the code is relatively concise. But it can also be achieved through Morris traversal. As for what is Morris traversal, please see my [blog post](https://t123456ll.github.io/LeetCode-144-Binary-Tree-Preorder-Traversal.html#more)

#### **前序遍历 Pre-order traversal：**

递归实现 Recursion: 

```python
def preorderTraversal1(self, root):
        if not root:
            return 
        print(root.val)
        self.flatten(root.left)
        self.flatten(root.right)
```

Morris Traversal 版：

```python
def preorderTraversal2(self, root):
        cur = root
        while(cur):
            if not cur.left:
                print(cur.val)
                cur = cur.right
            else:
                prev = cur.left
                while prev.right and prev.right != cur:
                    prev = prev.right
                if not prev.right:
                    prev.right = cur
                    print(cur.val)
                    cur = cur.left
                if prev.right == cur:
                    prev.right = None
                    cur = cur.right
```

#### **中序遍历 In-order traversal：**

递归实现 Recursion

```python
def inorderTraversal1(self, root):
        if not root:
            return 
        self.flatten(root.left)
        print(root.val)
        self.flatten(root.right)
```

Morris Traversal 版：

```python
def inorderTraversal2(self, root):
        cur = root
        while(cur):
            if not cur.left:
                print(cur.val)
                cur = cur.right
            else:
                prev = cur.left
                while prev.right and prev.right != cur:
                    prev = prev.right
                if not prev.right:
                    prev.right = cur
                    cur = cur.left
                if prev.right == cur:
                    prev.right = None
                    print(cur.val)
                    cur = cur.right
```

#### **后序遍历 Post-order traversal：**

递归实现 Recursion

```python
def postorderTraversal1(self, root):
        if not root:
            return 
        self.flatten(root.left)
        self.flatten(root.right)
        print(root.val)
```

Morris Traversal 版有，但我懒，大家可以自行谷歌 Using google, I am too lazy to write.

由此我们可以发现，对于递归版的前序中序后序遍历，以及morris版的前序和中序，区别只在于输出节点的位置不同。

From this we can find that for the recursive version of the pre-order, in-order and post-order traversal, and the morris version of the pre-order and in-order, the only difference is where return the node.

### 广度遍历 BFS:

以下两段代码都能实现广度遍历，但区别是：

第一段代码的每一个while loop都是对**每一个节点**的操作，第二段代码的每一个while loop都是对**每一层节点**的操作。

The following two pieces of code can achieve breadth traversal, but the difference is: Each while loop of the first piece of code is an operation on **each node**, and each while loop of the second piece of code is an operation on **each layer of nodes**.

```python
def BFS(self, root):
        cur = root
        queue = []
        queue.append(root)
        while queue:
            cur = queue.pop(0)
            print(cur.val)
            if cur.left: queue.append(cur.left)
            if cur.right: queue.append(cur.right)
```

```python
def levelTraversal(self, root):
        cur = root
        queue = []
        queue.append(root)
        while queue:
            size = len(queue)
            for _ in range(size):
                cur = queue.pop(0)
                print(cur.val)
                if cur.left: queue.append(cur.left)
                if cur.right: queue.append(cur.right)
```

## Reference

二叉树遍历（前序、中序、后序、层次遍历、深度优先、广度优先）[here](https://blog.csdn.net/My_Jobs/article/details/43451187)
