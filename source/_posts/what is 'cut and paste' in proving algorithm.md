---
title: What is 'cut and paste' in proving algorithm 算法证明中的‘复制粘贴法’到底是啥
date: 2019-10-18 14:00:43
tags: Algorithm算法
keywords:
description:
---

I encounter this 'cut and paste' in my algorithm course, so I searched some information to and found [this explaination](https://stackoverflow.com/questions/9553162/what-is-the-cut-and-paste-proof-technique) is good.

[这里](https://stackoverflow.com/questions/9553162/what-is-the-cut-and-paste-proof-technique)解释的很好，简单来说，当你想用证明一些算法（大多数情况是动态规划和贪心算法）的正确性时就可以利用矛盾法contradiction和复制粘贴大法cut and paste。因为动态规划或贪心算法都是建立在取最优结果的基础上完成下一步的计算，所以你需要假设我们其中某一步不采用前面的最优结果也可以达到最优的效果，那我们就先cut掉某一步的最优结果，将次优结果paste上去，从而进行推导，得到我们想要的contradiction就大功告成证明成功。

<!-- more -->

> The term "cut and paste" shows up in algorithms sometimes when doing dynamic programming (and other things too, but that is where I first saw it). The idea is that in order to use dynamic programming, the problem you are trying to solve probably has some kind of underlying redundancy. You use a table or similar technique to avoid solving the same optimization problems over and over again. Of course, before you start trying to use dynamic programming, it would be nice to prove that the problem has this redundancy in it, otherwise you won't gain anything by using a table. This is often called the "optimal subproblem" property (e.g., in CLRS).

> The "cut and paste" technique is a way to prove that a problem has this property. In particular, you want to show that when you come up with an optimal solution to a problem, you have necessarily used optimal solutions to the constituent subproblems. The proof is by contradiction. Suppose you came up with an optimal solution to a problem by using suboptimal solutions to subproblems. Then, if you were to replace ("cut") those suboptimal subproblem solutions with optimal subproblem solutions (by "pasting" them in), you would improve your optimal solution. But, since your solution was optimal by assumption, you have a contradiction. There are some other steps involved in such a proof, but that is the "cut and paste" part.