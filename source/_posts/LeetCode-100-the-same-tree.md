---
title: LeetCode 100.the same tree
date: 2019-07-04 23:55:59
tags: LeetCode
keywords: 
description:
---
# Question: [here](https://leetcode.com/problems/same-tree/)
Given two binary trees, write a function to check if they are the same or not.
Two binary trees are considered the same if they are structurally identical and the nodes have the same value.
总而言之，就是判断两颗二叉树是否一模一样。左右枝哪怕数字一样顺序不一样都是不行的。
It is my first time to use recursion to solve a question, So i will use most of content to explain how to writer a good recursion.
<!-- more -->
# Solution: Recursion (递归)
[What's recursion?](https://en.wikipedia.org/wiki/Recursion_(computer_science)) From wiki we noticed that recursion is different from [iteration(迭代)](https://en.wikipedia.org/wiki/Iteration#Computing) which repeats a process instead of function to generate the output.

There are two main parts of recursion: the end point (recursive exit, logical boundary) and the own call part (recursive expression, regular, etc.)

When write a recursive algorithm, three aspects need to be paid attention: 
* Extract the repetitive logic. 
* Appropriate exit conditions. 
* Control the logical boundaries.

End point: (I usually write the end point first, because it is easier to think and write)
* Appropriate exit conditions: Find a different node, return 0
* Control logic boundaries: Return 1 when both binary trees are empty, that is, recursively to the leaf node.

The own call part:
* Extract the repeating logic: The repetition logic of this problem is obvious, that is, to determine whether the values of each node are equal. `p.val = q.val`

## **When** to use this part: 
Of course, it must be not reaching to end point. However, this question cannot be considered only in addition to the recursive end point, because this question needs to compare the val of the node. So NoneType object (leaf node) needs to be excluded.
    `if (p.val == q.val) and p and q: `
Otherwise, **Line 21: AttributeError: 'NoneType' object has no attribute 'val'**

Then you may have a doubt, we have already considered it when controlling the logical boundaries, why consider it again? It should be noted that previously, we considered the senario that two binary trees are empty at the same time. But when one is empty and the other has value, it is easy to encounter a bug. such as the testcase like this: `[1,2] [1,null,2]`
What I want to point out that `if p and q and (p.val == q.val)` this judgment statement is also very clever, because you must pay attention to the order of judgment, such as writing `if (p.val == q.val) and p and q: `will report an error. **DO YOU KNOW WHY?**

## **How** to calculate this part: 
When the node values of the two trees are the same, you can recursively judge their nodes, and record the judgment result of the child nodes.
```
if (p.val == q.val) and p and q: 
    result = self.same(p.left, q.left) and self.same(p.right, q.right)
    return result
```

## **What** to returns:
Return 1: when both binary trees are empty, in other words, reach to the leaf node
Return 0: when the nodes are different
Return result: Using `and` to combine tow results from the left and right sides.

# Final code:
```python
class Solution(object):
    def isSameTree(self, p, q):
        return self.same(p, q)
        
    def same(self, p, q):
        if not p and not q:
            return 1

        if (p.val == q.val) and p and q: 
            result = self.same(p.left, q.left) and self.same(p.right, q.right)
            return result

        else:
            return 0

        return result
```


