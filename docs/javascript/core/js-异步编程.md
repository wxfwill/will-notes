# JavaScript异步编程

## 单线程
单线程是指在**JS引擎中负责解析和执行JavaScript代码的线程只有一个**，不妨叫它主线程。<br>
所谓单线程，就是指一次只能完成一件任务。如有多个任务，就必须排队，前面一个任务在执行后面的一个任务。<br>

这种模式的好处是实现起来比较简单，执行环境相对单纯；坏处是只要有一个任务耗时很长，后面的任务都必须排队等着，会拖延整个程序的执行。常见的浏览器无响应（假死），往往就是因为某一段JavaScript代码长时间运行（比如死循环），导致整个页面卡在这个地方，其他任务无法执行。<br>

但实际上还存在其他线程，例如：处理`ajax`请求的线程，处理`DOM`事件的线程，定时器线程，读写文件的线程`(Node.js)`等等。这些线程可能存在于`JS`引擎之内，也可能存在于`JS`引擎之外，统称**工作线程**。

## 同步和异步
虽然JavaScript语言是“单线程”执行环境，但在执行模式下，分为同步和异步两种模式，其中我们更多的使用回调函数的方式来进行异步操作
* 同步模式：任务安排列顺序执行
* 异步模式：其实就是延迟处理。异步是通过异步函数实现的。如：setTimeout().

异步过程：主线程发起一个异步请求，相应的工作线程接受请求并告知主线程已经收到（异步函数返回）；主线程可以继续执行后面的代码。同时主线程执行异步任务；工作线程完成工作后，通知主线程；主线程收到通知后，执行一定的动作（调用回调函数）。

异步操作的应用场景
* 定时器setTimeout() 与 setInterval()
* 生成器：generator
* 请求: XMLHTTPRequest 与 Fetch

**举例**
```js
var start = new Date();
setTimeout(function() {
    var current = new Date();
    var dvalue = current - start;
    console.log(dvalue + 'ms');
}, 500);
while(new Date - start < 1000) {}
```
因为`setTimeout`和`setInterval`的计时精度问题，不同的浏览器得到的数值可能稍微有出入。但是这个数值肯定大于等于1000ms.<br>

在这个例子里，js按顺序往下执行时，遇到setTimeout()函数，setTimeOut()函数直接返回，里面的回调函数被放入到**事件队列**里。js接着往下执行while循环，当时间差 `>= 1000`时，跳出循环，执行完毕。此时js才会去处理队列里的事件。

## 消息队列和事件循环

异步过程中，工作线程在异步操作完成后需要通知主线程。那么这个通知机制是怎样实现的呢？ 是利用消息队列和事件循环。<br>

工作线程将消息放到消息队列，主线程通过事件循环过程去取消息<br>

* 消息队列：消息队列是一个先进先出的队列，它里面存放着各种消息。
* 事件循环：事件循环是指主线程重复从消息队列中取消息，执行的过程。

实际上，主线程只会做一件事情，就是从消息队列里面取消息、执行消息、再取消息、再执行。当消息队列为空时，就回等待直到消息队列变成非空。而且主线程只有在将当前的消息执行完成后，才会去取下一个消息。这种机制就叫做事件循环机制，取一个消息的并执行的过程叫做一次循环。

## JS的异步发展史
* 回调函数
* Promise
* 生成器与迭代器
* async/await

简单归纳就是：`JS天生异步`

## 回调函数

回调函数将一个函数以参数的形似传递到另一个函数, 控制其执行的时机, 以达到异步的效果<br>

在Node.js读写文件的时候经常用到：
```js
const fs = require('fs');

fs.readFile('config.json', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
  }
});
```
又比如，jquery的ajax就是一个典型的异步回调方法:
```js
$.ajax({
  type: 'POST',
  url: './index.php',
  contentType: 'application/x-www-form-urlencoded',
  data: {
    name: 'quanzaiyu',
    password: 123
  },
  success: function (data) {},
  error: function (err) {},
  complete: function (data) {}
});
```
但是如果在请求的时候, 一个接口依赖于另一个接口的返回值, 将会类似于如下嵌套:
```js
$.get('url', function(){
    $.get('url1', function(){
        $.get('url2', function(){

        }, 'json');
    }, 'json');
}, 'json');
```
::: warning
“回调函数，内嵌回调函数” 可以无穷尽的内嵌，结果就是各个部分之间高度耦合，流程混在一起，每个任务只能指定一个回调函数。最终造成的结果就会嵌入回调地狱，很可能就像这样了——结尾是无止境的, 也可能造成不可预估的结果
:::

## Promise
所谓 Promise, 就是一个对象,用来传递异步操作的消息。它代表了某个未来才会知道结果的事件 (通常是一个异步操作)，并且这个事件提供统一的 API，可供进一步处理。

Promise要解决的就是回调函数回调地狱的问题, 通过更直观的方式避免错误的产生,Promise 对象有以下两个特点:
* （1）对象的状态不受外界影响。Promise 对象代表一个异步操作，有三种状态：Pending（进行中）、Resolved（已完成，又称 Fulfilled）和 Rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是 Promise 这个名字的由来，它的英语意思就是「承诺」，表示其他手段无法改变。
* 一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise 对象的状态改变，只有两种可能：从 Pending 变为 Resolved 和从 Pending 变为 Rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。就算改变已经发生了，你再对 Promise 对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。
**一个简单的Promise使用方式:**
```js
fun().then(res => {}).catch(e => {})
```
### 几种状态
* onFulfilled 执行状态，resolve()被调用
* onRejected 拒绝状态，reject()被调用
* pending 等待状态（进行中）
### 创建Promise
**方式一：直接 new Promise**
```js
function asyncFun (arg) {
  return new Promise((resolve, reject) => {
    if (arg) {
      resolve('yes')
    } else {
      reject('no')
    }
  })
}
```

**方式二：使用快捷方式创建**
```js
function asyncFun (arg) {
  if (arg) {
    return Promise.resolve('yes')
  } else {
    return Promise.reject('no')
  }
}
```

### 调用方式
方式一：普通调用
```js
asyncFun(true).then(res => {
  console.log(res)
}).catch(e => {
  console.warn(e)
})
```
方式二：async..await
```js
;(async () => {
  try {
    let ret = await asyncFun(true)
    console.log(ret)
  } catch (e) {
    console.warn(e)
  }
})();
```

### 从回调函数向Promise转换

一个普通的回调函数可以封装成Promise, 比如:<br>
```js
function promiseAjax(url, data) {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url,
      data,
      success: function (res) {
        resolve(res)
      },
      error: function (e) {
        reject(e)
      }
    });
  })
}

promiseAjax('http://test.com').then(res => {}).catch (e => {})
```

## async与await
Async/Await是一个很久就令人期待的 JavaScript 功能，它让使用异步函数更加愉快和容易理解。它是基于 Promise 的并且和现存的所有基于 Promise 的 API 相兼容。 Async/Await 版本的代码更短并且可读性更强, 使得异步方法形同同步方法一样地使用，作为Promise的语法糖非常甜！<br>

**从Promise转换为async..await**
只要返回的是一个 Promise 对象, 都可以使用async...await的调用方式, 比如刚才的 promiseAjax 方法:
```js
async function testAjax () {
  try {
    let res = await promiseAjax()
    console.log(res)
  } catch (e) {
    console.log(e)
  }
}
```
:::warning
看上去是同步的代码，实际执行是异步的<br>
注意, 在使用时需要进行 try..catch, 以免产生错误
:::

## async..await不使用try..catch

在使用 async..await 的时候，通常需要一堆的 try..catch，虽然摆脱了回调地狱以及 then 嵌套的噩梦，但是又引入了新的问题，过多的 try..catch 破坏了代码结构...

为了解决这个问题，我参考了网上一个比较不错的解决方案：
```js
export default function to(promise) {
  return promise
    .then(data => {
      return [null, data];
    })
    .catch(err => [err]);
}
```
在使用的时候，只需要判断数组的第一项即可，比如：
```js
async getCode() {
  let [err, code] = await to(
    fetch('https://test.com/api/code')
  )
  if (err) {
    alert(err)
    return
  }
  Toast.showText('获取验证码成功：' + code, {duration: 1000})
}
```
我们看看在使用这种方法之前的写法：
```js
async getCode() {
  try {
    let code = await fetch('https://test.com/api/code')
    Toast.showText('获取验证码成功：' + code, {duration: 1000})
  } catch (err) {
    alert(err)
    return
  }
}
```
的确，简洁很多！

## 理解async..await的实现原理

sync..await 作为 Promise 的语法糖，只能用一个字形容：甜！<br>

还是先创建一个返回 Promise 的函数：
```js
function asyncFun (arg) {
  if (arg) {
    return Promise.resolve('yes')
  } else {
    return Promise.reject('no')
  }
}
```
### 容器
但是假如有这样一个容器，它能如期的执行我们上面的这段代码，我们只需要把代码丢进这个特殊的容器里。<br>

创建一个生成器容器：
```js
// 运行生成器函数的一个容器
// 参数必须是一个生成器
function run(gen) {
    // 创建迭代器
    const task = gen();
    // 开始执行
    let result = task.next();

    (function step() {
        if (!result.done) {
            // 用Promise处理
            // 解释：无论result.value本身是不是promise对象，都会作为一个promise对象来异步处理
            const promise = Promise.resolve(result.value);
            promise.then(value => {
                // 把本次执行的结果返回
                // 也就是语句 const value = yield func(); 的返回值
                result = task.next(value);
                // 继续
                step();
            }).catch(err => {
                result = task.throw(err);
                // 继续
                step();
            })
        }
    }());
}
```
现在，我们有了这样的一个容器run，把那段“同步”代码丢进这个容器里：
```js
run(function *() {
  try {
    const data = yield asyncFun(true)
    console.log(data);
  } catch (err) {
    console.error(err);
  }
});
```
完美，我们只是在刚才那段“同步”代码前加了一个 yield，即达到了效果！<br>

转过头，我们再看看我们的async...await：

```js
;(async () => {
  try {
    let ret = await asyncFun(true)
    console.log(ret)
  } catch (e) {
    console.log(e)
  }
})();
```
可以看出，只是将 *变成了async，yield 换成了 await，还省去了“容器”！

### 同步书写，异步执行
虽然我们是以同步的方式书写的代码，但从第一个 yield或await的位置开始，后续的代码其实都是异步执行的，举个例子：
```js
;(async () => {
  try {
    console.log('开始执行');
    let ret = await asyncFun(true)
    console.log(ret)
  } catch (e) {
    console.log(e)
  }
})();

console.log('结束了！');
```
结果是：
```
开始执行
结束了！
true
```