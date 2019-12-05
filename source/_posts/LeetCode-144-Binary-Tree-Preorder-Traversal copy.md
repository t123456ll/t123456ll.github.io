---
title: LeetCode 144.Binary Tree Preorder Traversal (English version)
date: 2019-12-05 23:45:25
tags: [LeetCode, BinaryTree, MorrisTraversal]
keywords: [LeetCode144, BinaryTree, MorrisTraversal]
description: This is a magical algorithm that can solve two problems: 1. Use O (1) space complexity, that is, use constant space (while time complexity is O (n)); 2. Do not change the shape of the binary tree (intermediate process allows to change its shape)
---
这里是英文版，中文版[这里](https://t123456ll.github.io/%E4%BA%8C%E5%8F%89%E6%A0%91%E7%9A%84%E6%B7%B1%E5%BA%A6%E9%81%8D%E5%8E%86%EF%BC%88%E5%89%8D%E5%BA%8F%EF%BC%8C%E4%B8%AD%E5%BA%8F%EF%BC%8C%E5%90%8E%E5%BA%8F%EF%BC%89%E5%92%8C%E5%B9%BF%E5%BA%A6%E9%81%8D%E5%8E%86%EF%BC%88%E5%B1%82%E6%AC%A1%E9%81%8D%E5%8E%86%EF%BC%89%E4%BB%A5%E5%8F%8A%20Morris%20Traversal.html)

## Question: [here](https://leetcode.com/problems/binary-tree-preorder-traversal/)

Given a binary tree, return the preorder traversal of its nodes' values.
what's preorder，inorder and postorder，click [here](https://en.wikipedia.org/wiki/Tree_traversal)

## Example:

    Input: [1,null,2,3]
      1
       \
        2
       /
      3
    Output: [1,2,3]
This problem is very simple to use recursion, traversal all of them. but because there are two common methods for traversal: one is recursive, and the other is iterative version using stack implementation (stack + iterative). These two methods are both O (n) space complexity (recursion itself occupies stack space or user-defined stack), but how to make the space complexity O (1)?

<!-- more -->

# Solution: Morris Traversal
reference is [here](https://www.cnblogs.com/AnnieKim/archive/2013/06/15/MorrisTraversal.html) and [here](https://ghh3809.github.io/2018/08/06/morris-traversal/), you can take a look first. BUT both of them are chinese😂

This is a magical algorithm that can solve two problems

1. Use O (1) space complexity, that is, use constant space (while time complexity is O (n));
2. Do not change the shape of the binary tree (intermediate process allows to change its shape)

To traverse using O (1) space, the biggest difficulty is how to return to the parent node again when traversing to the child node (assuming that the node does not have a pointer pointing to the parent node), because the stack cannot be used as an auxiliary space. To solve this problem, the Morris method uses the concept of a [threaded binary tree](https://en.wikipedia.org/wiki/Threaded_binary_tree). In the Morris method, there is no need to assign additional pointers to each node to its predecessor and successor. You only need to use the left and right null pointers in the leaf nodes to point to the predecessor or successor in a certain order, that is enough.

Although this question focuses on **pre-order traversal**, I want to mainly talk about how **in-order traversal** is implemented, because morris traversal is written based on in-order. If you don't want to read the [article](https://www.cnblogs.com/AnnieKim/archive/2013/06/15/MorrisTraversal.html) I mentioned before, I can summarize for you: **The three kinds of traversal are exactly the same in the overall process implementation, the only difference is when to output the node (the main difference between the preorder and the in order), or whether to print node in reverse , backward print is the characteristic of the post orde**r. This article uses C ++, and I use Python, but the idea is the same.

First of all, understand what is in-order traversal: the core: visit child before parent

1. If the node still has **left subtree**, you must first visit the **left subtree**
2. When no left subtree is accessible, visit the node and try to access the right subtree

![](https://imgur.com/lldvZuC.jpg)**Translation:** Orange: node.  Brown: root node.  Green: leaf node. 

​                      Yellow: None.   Arrow: point to the "successor" node

In-order: 0,1,2,3,4,5,6

Each node has a "predecessor" node and a "successor" node. For example, on the example binary tree, 0 is a predecessor node of 1, and 2 is a successor node of 1. Obviously, the in-order traversal can be transformed into the calculation process of subsequent nodes. The calculation method for subsequent nodes is:

1. For node A in which the right subtree exists, its successor is the leftmost node in its right subtree;
2. For node B without a right subtree, its successor is the first of its bottom-up parent nodes to use it as the left subtree.

The subsequent calculation of node A is very simple. However, since the information of the binary tree does not include the information of the parent node, the operation of the second item is very difficult, which is why the stack / queue method was used to store the information of the parent node. **But think about it the other way, although node 1 does not know that node 2 is its successor, node 2 knows that node 1 is its predecessor, so we can find its predecessor (node 1) when we at node 2 currently. Once found, we can temporarily use node 1's right subtree to store the successor node (node 2) to achieve direct access to the successor node without taking up extra space**. This is the main idea of the Morris traversal algorithm.

Based on the above analysis, we can write the main calculation process of the program:

1. If the left child of the current node is empty, output the current node and use its right child as the current node.
2. If the left child of the current node is not empty, find the previous node of the current node in the in order traversal in the left subtree of the current node.
   1) If the right child of the previous node is empty, set its right child to the current node. The current node is updated to the left child of the current node.
   2) If the right child of the previous node is the current node, reset its right child to empty (restore the shape of the tree). Output the current node. The current node is updated to the right child of the current node.
   **From this we can also notice that this path will be traversed twice, once for marking and once for restoration**
3. Repeat steps 1 and 2 above until the current node is empty.
   ![](https://imgur.com/7UJKYGT.jpg)

```python
def inorderTraversal(self, root):
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



# Final code:

The following code is pre-order. we can notice that there is not difference between in-ofrder except the position of print.

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

