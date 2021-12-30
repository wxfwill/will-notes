# js-工具方法

## 高阶函数

:::tip
高阶函数的定义：**至少满足下列一个条件的函数**<br>
> **1.接受一个或者多个函数作为输入**<br>
> **2.输出一个函数**
:::

**数组的高阶函数**
```js
[1,2,3,4].forEach(function(item, index, arr) {
    console.log(item, index, arr)
})

[1,2,3].map(item => `测试${item}`)
```

**根据某一个条件求出数组中最大的一项**

```js {17,18}
/*
* 根据条件判断数组最大的项
* {Array} arr数组
* {String|Function} iteratee 函数或者数组对象某一项的key值
*/

function maxBy(arr, iteratee) {
    let values = [];
    if(typeof iteratee === 'string') {
        values = arr.map(item => item[iteratee]);
    } else if(typeof iteratee === 'function') {
        values = arr.map((item, index) => {
            return iteratee(item, index, arr)
        })
    }

    const maxOne = Math.max(...values);
    const maxIndex = values.findIndex(item => item === maxOne);
    return arr[maxIndex];
}

//example1
let list = [
    {name: '张三', age: 10},
    {name: '李四', age: 20},
    {name: '王五', age: 30}
];

// 根据age求出最大的一项
let maxItem = maxBy(list, 'age');

// example2
const arr = [
    {name: 1, leave: 'midder'},
    {name: 2, leave: 'low'},
    {name: 3, leave: 'high'}
];
const maxItem = maxBy(arr, function(item) {
    const {leave} = item;
    const leaveVal = leave === 'low' ? 1 : leave === 'midder' ? 2 : leave === 'high' ? 3 : 0;
    return leaveVal;
})
```

## 解析URL参数

```js{9}
/*
* @example ?id=123&a=b
* @return Object {id:123, a=b}
*/

function urlParse() {
    let url = window.location.search;
    let obj = {};
    let reg = /[?&][^?&]+=[^?&]/g;
    let arr = url.match(reg);
    if(arr) {
        arr.forEach((item) => {
            let temArr = item.substring(1).split('=');
            let key = docodeURIComponent(temArr[0]);
            let val = docodeURIComponent(temArr[1]);
            obj[key] = val;
        })
    }
    return obj;
}
```

## 递归（二维数组递归树状结构）

```js
let parentObj = {
    id: 0,
    label: '最高级',
    children: []
};

let arr = [
    [
        {id: 1, label: '第一'},
        {id: 2, label: '第二'},
        {id: 3, label: '第三'},
        {id: 4, label: '第四'}
    ],
    [
        {id: 1, label: '第1'},
        {id: 2, label: '第2'},
        {id: 3, label: '第3'},
        {id: 4, label: '第四'}  
    ]
];

let digui = (obj, item, index) => {
    if(index == 0) {
        obj = item;
    } else {
       if(!obj.children) {
           obj.children = [];
           obj.children.push(item)
       } else {
           if(obj.label === item.label) {
               return
           }
           obj.children.map(el => {
               digui(el, item, index);
           })
       }
    }
    return obj;
}

arr.forEach((list) => {
    let obj = null;
    if(list && list.length > 0) {
        list.forEach((item, index) => {
            obj = digui(obj, item, index)
        })
    }
    parentObj.children.push(obj);
})

// console.log(parentObj)

```

## 格式化时间戳

```js
function formatDate(date, fmt) {
    if(/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        "M+": date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for(let k in o) {
        if(new RegExp(`(${k})`).test(fmt)) {
            let str = o[k]+ '';
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
        }
    }
    return fmt;
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

// example
let t = new Date();
// console.log(formatDate(t, 'yyyy-MM-d hh:mm:ss'))
```

## 柯里化

**接受任意个参数的求和函数**

```js
function addNum() {
    return [...arguments].reduce((prev, cur) => {
        return prev + cur;
    }, 0)
}

// example
console.log(addNum(1,2,3));

```

> 预置了第一个参数

```js
function curry(fn, firstArg) {
    return function() {
        let resetArg = [].slice.call(arguments);
        return fn.apply(this, [firstArg, ...resetArg])
    }
}

// 柯里话 预置参数10
var add10 = curry(addnum, 10);
add10(5) // 15

```

> 预置多个参数
```js
    function curry(fn) {
      // 保存预置参数
      const presetArgs = [].slice.call(arguments, 1);
      console.log(presetArgs);
      // 返回一个新函数
      function curried() {
        // 新函数调用时会继续传参
        const restArgs = [].slice.call(arguments);
        console.log(restArgs);
        const allArgs = [...presetArgs, ...restArgs];
        return curry.call(null, fn, ...allArgs);
      }
      // 重写toString
      curried.toString = function() {
        return fn.apply(null, presetArgs);
      };
      return curried;
    }

    function dynamicAdd() {
      return [...arguments].reduce((prev, curr) => {
        return prev + curr;
      }, 0);
    }
    var add = curry(dynamicAdd);

    let a = add(1)(2)(3); // 10
    // let b = add(1, 2)(3, 4)(5, 6); // 21
    console.log('aaa==' + a);
```

