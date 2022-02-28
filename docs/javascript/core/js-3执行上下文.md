# 3.执行上下文

> 本篇是在看完冴羽大佬的博客后，自己手动记一下以便加深理解，[原文地址](https://github.com/mqyqingfeng/Blog/issues/4)

`Javascript`引擎并非一行一行地分析和执行程序，而是一段一段地分析执行，当执行一段代码的时候，会进行一个’准备工作‘，这个准备工作就叫做`执行上下文`。

## 可执行代码

可执行代码分为三种： **全局代码** 、 **函数代码** 、 **eval 代码**

## 执行上下文栈

`Javascript`引擎创建了执行上下文栈（`ESC`）来管理执行上下文。

模拟执行上下文栈的行为，定义一个数组：

```js
ECStack = [];
```

当`Javascript`开始要解释执行代码的时候，最先遇到的就是全局代码，所以初始化的时候首先会向执行上下文栈压入一个全局执行上下文，我们用`globalContext`标识它，并且只有当整个应用程序结束的时候，ECStack 才会被清空，所以程序结束之前，ECStack 最底部永远有个`globalContext`:

```js
ECStack = [globalContext];
```

现在`Javascript`遇到下面的这段代码：

```JS
function fun3() {
    console.log('fun3');
}

function fun2() {
    fun3();
}

function fun1() {
    fun2();
}

fun1();

```

当执行一个函数的时候，就会创建一个执行上下文，并且压入执行上下文栈，当函数执行完毕的时候，就会将函数的执行上下文从栈中弹出，如何理解上面这段代码：

```js
// 伪代码

//fun1
ECStack.push(<fun1> functionContent);

//fun1 中调用fun2, 还要创建fun2的执行上下文;
ECStack.push(<fun2> functionContent);

// fun2 中调用fun3, 创建fun3的执行上下文
ECStack.push(<fun3> functionContent);

// fun3执行完毕
ECStack.pop();

// fun2执行完毕
ECStack.pop();

// fun1执行完毕
ECStack.pop();

// 接着执行下面的代码，但ECStack底层永远有个`globalContent`

```
