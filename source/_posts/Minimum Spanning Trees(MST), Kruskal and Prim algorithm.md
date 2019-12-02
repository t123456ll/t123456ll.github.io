---
title: Minimum Spanning Trees(MST), Kruskal and Prim algorithm
date: 2019-10-20 02:59:26
tags: Algorithm算法
keywords:
description:
---
万恶的算法作业，要找寻一条边是否在MST中，看似简单，却暗藏玄机，因为一个graph可能不止有一个MST，用Kruskal 算法找到MST固然简单，但找到所有MST似乎就只能用Prim了。不想删掉我辛辛苦苦写的Kruskal算法，便写了这篇文章作为总结。

<!-- more -->
题目

> [python3] (7 points) Devise, then code in python 3, a efficient algorithm for the following problem. Inputs: (i) a connected weighted undirected graph G = ⟨V,E⟩, and, (ii) an edge e ∈ E. Output: true if there is a minimum spanning tree of G that contains e, and false otherwise. G is provided in adjacency list format, and e as a list which encodes a pair. E.g., an encoding of the following graph is [[[3,10], [1,100], [2, 20]], [[0,100]], [[0,20],[3,10]], [[2,10],[0,10]]], and the output is false for edge [2,0] and true for edge [0,1]. 
>
> ![](https://imgur.com/lrwEByp.jpg)

1. Kruskal

```python
def mstexists(G, e):
		# to re-organize input G into edges
    edges = []
    for i in range(len(G)):
        for j in range(len(G[i])):
            f = G[i][j][0]
            w = G[i][j][1]
            # avoid the situation that adding two same edge, like(1,2),(2,1)
            edge = sorted([i, f]) 
            edge.append(w)
            if edge not in edges:
                edges.append(edge)

    edges = sorted(edges, key = lambda x:x[2]) 
    # Kruskal algorithm: choose edge with increase order of edge's weight
    mem = [] # to record vertice which have been added into MST
    MST = [] # to record edges which have been added into MST

    for edge in edges:
        s = edge[0]
        f = edge[1]
        w = edge[2]
        if s not in mem or f not in mem: # not a cycle
            mem.append(s)
            mem.append(f)
            MST.append([s,f])
        if len(set(mem)) == len(G):
            break

    return sorted(e) in MST
```

2. Prim

用于寻找所有的 MST 所包含的边。

```python
def mstexists(G, e):
    """
    You need to implement this method.
    G is an adjacency list in the format discussed in the handout
    e is a list of two items, e.g., [0,4]
    """

    MST = []
    for s in range(len(G)):
        Prim(s, G, MST)
        # print(MST)
    # print(sorted(e) in MST)
    return sorted(e) in MST


def Prim(s, G, MST):
    # initialization
    key = [float('inf')] * len(G)
    Q = []
    mem = [] # keep track of vertices already included in MST
    key[s] = 0
    for edge in G[s]:
        Q.append([s, edge[0], edge[1]]) # [start, finish, weight]
    Q = sorted(Q, key = lambda x:x[2])
    mem.append(s)
    while len(mem) != len(G):
        nxt = Q.pop(0)
        if nxt[1] in mem:
            continue
        e = sorted([nxt[0], nxt[1]])
        if e not in MST:
            MST.append(e)
        mem.append(nxt[1])
        s = nxt[1]
        for edge in G[s]:
            f = edge[0]
            if f not in mem:
                Q.append([s, f, edge[1]])  # [start, finish, weight]
        Q = sorted(Q, key=lambda x: x[2])


```

亮点：1. 使用sorted避免加入重复边。
