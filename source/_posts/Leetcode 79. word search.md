---
title: Leetcode 79. word search
date: 2019-10-11 00:20:58
tags:
keywords:
description:
---
Rewrite it again during a mock interview. Then I found myself is just a small potato. So write it down to record some mistakes and weakness. 

<!-- more -->
### Question

Given a 2D board and a word, find if the word exists in the grid.

The word can be constructed from letters of sequentially adjacent cell, where "adjacent" cells are those horizontally or vertically neighboring. The same letter cell may not be used more than once.

**Example:**

```
board =
[
['A','B','C','E'],
['S','F','C','S'],
['A','D','E','E']
]

Given word = "ABCCED", return true.
Given word = "SEE", return true.
Given word = "ABCB", return false.
```

### Platform

coderpad：share screen and code, need to write IO by yourself. only the print part can be shown on the screen, which mean totally different from Leetcode.

1. Write IO, class by yourself
2. return content will not be shown on screen, if you want print something on screen, you definitely need to write "print"
3. remember to use your function

### Code

```python


def FindWord(board, word):
    if not board or not board[0]: return False
    m = len(board)
    n = len(board[0])
    visited = [[False] * n for _ in range(m)]
    for i in range(m):
        for j in range(n):
            if DFS(board, visited, word, i, j):
                print("true") # definitely need to write "print"
                return True

    print("false") # definitely need to write "print"
    return False


def DFS(board, visited, word, i, j):
    if not word:
        return True
    if i < 0 or j < 0 or i == len(board) or j == len(board[0]):
        return False
    if visited[i][j] or board[i][j] != word[0]:
        return False

    if not visited[i][j] and board[i][j] == word[0]:
        visited[i][j] = True
        return DFS(board, visited, word[1:], i-1, j) or \
        DFS(board, visited, word[1:], i+1, j) or \
        DFS(board, visited, word[1:], i, j-1) or \
        DFS(board, visited, word[1:], i, j+1) # Using or
        visited[i][j] = False # backtacking part
    else:
        return False

board = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']]
word = "ABCB" 
FindWord(board, word)       


```


### Time complexity:

numOfRows: m, numOfCols: n, LengthOfWord: l

beacause we have n*m elements which could be the start point. and each start point could run into four different directions. So the worst-case time complexity is 

O(m*n*4^l)

### Space complexity

we need visited to store, so the space complexity is O(n)

### What is recursion

For this question, in order to record whether this letter has been visited. we should make full use of recursion. and the most important part of recursion is **Backtracking**. Where to write backtracking part? It is depend on your recursion function. For this question, put backtracking part on the end of recursion. Because we have finished all recursion and return the answer. For the next start point, we need a new visited array to record it, to reuse the visited array again. 

**return part** is always important during recursion. Figure out what you want to return. if the answer is True or False, figure out the Logic. 

eg. 

1) using recursion to find whether we have sth. in sp., the logic is 'or' between different recursion statement. 

```python
def recursionFunction()
    if statement1:
        return False
    elif statement2:
        return True
    else:
        return recursionFunction() or recursionFunction()
```

2) using return to transfer value, may use +=. Like 

```python
def recursionFunction()
    res += recursionFunction()
    return res
```

3) or we don't need to return anything, beacause we have find answer in other if statement:

```python
def recursionFunction(combi, res)
    if statement1:
        res.append(combi)
        return 
    elif statement2:
        return 
    else:
        recursionFunction(combi+sth1, res) 
        recursionFunction(combi+sth2, res) 
        return
```



### Conclusion:

1. Copy the others code from discussion is helpless for solve problem truly. But if meet hard problem, you can refer to others, but must be rewrite again by yourself.
2. Calculate time complexity and space complexity by yourself **each time**
3. Coding style: [when to use if and elif](https://www.tutorialspoint.com/python/python_if_else.htm): if&elif is something like switch case, and elif can be used many times, but in if&else, else can only be used once. In both of them, if 'if' has been tested and entered, the rest will not be tested. So they can be used to write some contradict requirements. But for if&if, each if will be tested, no matter whether another one has been tested. 

