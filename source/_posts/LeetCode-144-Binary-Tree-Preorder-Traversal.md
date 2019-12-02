---
title: LeetCode 144.Binary Tree Preorder Traversal
date: 2019-07-06 23:45:25
tags: LeetCode
keywords:
description:
---
# Question: [here](https://leetcode.com/problems/binary-tree-preorder-traversal/)
Given a binary tree, return the preorder traversal of its nodes' values.
简而言之，用**前序**输出二叉树，至于什么是前序preorder，中序inorder和后序postorder，click [here](https://en.wikipedia.org/wiki/Tree_traversal)
## Example:

    Input: [1,null,2,3]
      1
       \
        2
       /
      3
    Output: [1,2,3]
这一题用递归很简单，遍历就行，但因为遍历有两个常用的方法：一是递归(recursive)，二是使用栈实现的迭代版本(stack+iterative)。这两种方法都是O(n)的空间复杂度（递归本身占用stack空间或者用户自定义的stack），那但如何使空间复杂度为O（1）呢？

<!-- more -->
# Solution: Morris Traversal
参考了[这里](https://www.cnblogs.com/AnnieKim/archive/2013/06/15/MorrisTraversal.html)，和[这里](https://ghh3809.github.io/2018/08/06/morris-traversal/)，文章写的很好，可以看一看
这是一个神奇的算法，可以解决两个问题
1. 使用O(1)空间复杂度，即使用常数空间（同时时间复杂度是O(n)）；
2. 不破坏二叉树的形状（中间过程允许改变其形状）

要使用O(1)空间进行遍历，最大的难点在于，遍历到子节点的时候怎样重新返回到父节点（假设节点中没有指向父节点的p指针），由于不能用栈作为辅助空间。为了解决这个问题，Morris方法用到了线索二叉树（threaded binary tree）的概念。在Morris方法中不需要为每个节点额外分配指针指向其前驱（predecessor）和后继节点（successor），只需要利用叶子节点中的左右空指针指向某种顺序遍历下的前驱节点或后继节点就可以了。

虽然这一题是做前序，但我想主要讲一下**中序**遍历是如何实现的，因为morris traversal就是在中序基础上写的，前序和后序可以参考前面那篇文章。不想读文章的我也可以总结一下：**三种遍历在整体流程实现上是一模一样的，唯一不同在于何时去输出节点（前序与中序主要区别），或是否要反向print反向print是后序的特点**。文章里用的是C++，而我用的是Python，不过思路都是一样的。

首先要明白什么是中序遍历：核心：visit child before parent
1. 若节点还有左**子树**，就要先把左子树访问完
2. 没有左子树可访问时，访问该节点，并尝试访问右子树

![](https://imgur.com/lldvZuC.jpg)
In-order: 0,1,2,3,4,5,6
每一个节点都有“前驱”节点和“后继”节点。例如在示例的二叉树上，0是1的前驱节点，而2是1的后继节点。显然，中序遍历可以转化为对后继节点的计算过程。后继节点的计算方法为：

1. 对于存在右子树的节点A，其后继节点是其右子树中最左侧的节点；
2. 对于没有右子树的节点B，其后继节点是其自下而上的父节点中第一个将其作为左子树的节点。

节点A的后继计算非常简单。然而由于二叉树的信息中不包括父节点的信息，因此第2条操作起来非常困难，这也是为何之前采用了栈/队列的方式存储父节点的信息。**但是倒过来想，虽然节点1不知道节点2是它的后继节点，但是节点2知道节点1是它的前驱节点啊，所以我们可以通过在节点2时就去找它的前驱节点（节点1），找到后我们就可以暂时使用节点1右子树的链接，存储后继节点（节点2），以实现对后继节点的直接获取，同时不占用额外的空间**。这就是Morris遍历算法的主要思想。

根据上述分析，我们可以写出程序的主要计算过程：

1. 如果当前节点的左孩子为空，则输出当前节点并将其右孩子作为当前节点。
2. 如果当前节点的左孩子不为空，在当前节点的左子树中找到当前节点在中序遍历下的前继节点。
    - 如果前继节点的右孩子为空，将它的右孩子设置为当前节点。当前节点更新为当前节点的左孩子。
    - 如果前继节点的右孩子为当前节点，将它的右孩子重新设为空（恢复树的形状）。输出当前节点。当前节点更新为当前节点的右孩子。
    **从这我们也可以注意到此条路径会被遍历两遍，一遍用来标记，一遍用来恢复**
3. 重复以上1、2直到当前节点为空。
![](https://imgur.com/7UJKYGT.jpg)


以下是前序遍历代码，但是和中序除了输出位置不一样，其他没有任何差别。
# Final code:
```python
class Solution:
    def preorderTraversal(self, root: TreeNode) -> List[int]:
        res = []
        prev = None
        cur = root   #仅存放两个临时变量，O(1)空间复杂度
        while(cur):   #当前节点为空时，说明访问完成
            if not cur.left:   #左子树不存在时，访问+进入右节点
                res.append(cur.val)
                cur = cur.right
            else:   #左子树存在，寻找前驱节点。
                prev = cur.left
                while(prev.right and prev.right != cur): #注意寻找前驱节点时，会不断深入右子树。不加判断时，若前驱节点的右子树已指向自己，会引起死循环
                    prev = prev.right
                if not prev.right:  #前驱节点未访问过，存放后继节点
                    res.append(cur.val)
                    prev.right = cur
                    cur = cur.left
                else:   # prev.right == cur 前驱节点已访问过，恢复树结构
                    prev.right = None
                    cur = cur.right

        return res
```

