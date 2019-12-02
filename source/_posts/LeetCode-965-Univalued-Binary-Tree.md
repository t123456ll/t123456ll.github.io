---
title: LeetCode 965 Univalued Binary Tree
date: 2019-08-06 10:54:06
tags: LeetCode
keywords:
description:
---
# Question: [here](https://leetcode.com/problems/univalued-binary-tree/)
A binary tree is univalued if every node in the tree has the same value.
Return true if and only if the given tree is univalued.
简而言之，判断问二叉树的每个节点的值是不是都是一样的。
## Example:
Input: [1,1,1,1,1,null,1]
Output: true
这题和上次的100很像，但100是比较两个二叉树的，这题是比较自身的值是否一致。所以大致思路会延续上次100，但会有细微不同。

<!-- more -->
# Solution: 
这一篇是当时接着100写的，也算是刚入leetcode坑时代码讲解之一。所以写的很细，也会指出一些新手（自己）常犯的错误。

## 递归 Recursion
当使用递归刷题时，就不可避免的会用到函数的互相调用，[这里](https://blog.csdn.net/CLHugh/article/details/75000104)是是讲class内部函数调用的，可以看看

**递归有两大部分：终点（递归出口，逻辑边界）和自身调用部分（递归表达式，规律等）
写好一个递归算法要把握三个方面：1.提取重复逻辑 2.合适的退出条件3.控制逻辑边界。**
（copy上次的，拿过来再强调一下）

### 终点：
1.    合适的退出条件：
发现左支或右支与当前节点的值不同，return 0
注意： 这里自己写很容易写错成（root.val != root.right）,思考题：为什么这样写是不对的？正确答案应该怎么写？
答案：正确写法：（root.val != root.right.val）
root.right是右支，而不是右支节点值。root.val 肯定是一直都不会等于root.right的，即treeNode != val。
2.    控制逻辑边界
当两个二叉树都为空时，即递归到了叶子结点时，return 1。
```python
if not root: return True
```
### 自身调用部分：
3.    提取重复逻辑：
这题的重复逻辑就是不断的判断左支或右支与当前节点的值是否相同，因为该逻辑可以直接写在if的判断语句中，所以当if判断完成后直接就是return，中间没有额外的计算操作。
**所以这一题的重点就是在与如何写if判断语句，也就是下面的when**

**When何时用这部分**:我觉得要是理不清怎么写，一定要先把左支和右支分开写，至少条理会清楚点。If判断语句也不要写太长。我当时第一次左右放一起写就导致忘记某些特殊case。
错误示范： 
```python
if root.left and root.right and (root.left.val != root.val or root.right.val != root.val):
    return False
```
正确示范：
```python
if root.right and root.val != root.right.val:
    return False
if root.left and root.val != root.left.val:
    return False
```
何时对自身进行调用：即不是叶子结点，也没有遇到不同值时，也就是else


**How这部分怎么计算**: 基本没什么计算部分，省略


**What返回什么**:
return 1: 当递归到了叶子结点时
return 0:值不一样时
return result: 用and逻辑连接左右两支的递归返回结果。

# Final Code
```python
class Solution(object):
    def isUnivalTree(self, root):
        """
        :type root: TreeNode
        :rtype: bool
        """
        return self.univalued(root)

    def univalued(self, root):
        if not root: return True
        if root.left and root.val != root.left.val:
            return False
        if root.right and root.val != root.right.val:
            return False
        else:
            result = self.univalued(root.left) and self.univalued(root.right)
            return result
```
# Reference
[这里](https://blog.csdn.net/fuxuemingzhu/article/details/85385974#_46)和[这里](https://blog.csdn.net/chlele0105/article/details/38759593)是用BFS和DFS解决二叉树问题


