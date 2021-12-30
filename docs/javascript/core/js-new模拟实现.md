# new 的模拟实现

> 本文是看了冴羽大大的 js 深入系列 new 的模拟实现，自己动手实践总结, [原文地址]('https://github.com/mqyqingfeng/Blog/issues/13)

## 前置知识

## 创建对象

- `Object.create`: `Object.create(null)`返回一个没有任何继承关系的空对象。当参数不是`null`时，又是另外一回事。
- `new Object`: `new Object()` 返回的是一个有`_proto_`属性的对象，其`_proto_`指向`Object.prototype`对象

js 代码

```js
var obj1 = new Object();
var obj2 = Object.create(Obeject.prototype);
obj1.constructor === Object; // true
obj1._proto_ === Object.ptototype; // true

obj2.constructor === Object; // true
obj2._proto_ === obj2.prototype; // true
```

## js 继承

> 问题一

```js
var person = new Person("jim");
person
  .setAge(21)
  .setPosition("developer")
  .sayHi();
//输出‘Hello,my name is jim,21 years old, I am a developer’`
```

**解答**

```js
function Person(name) {
  this.name = name;
  this.setAge = function(age) {
    this.age = age;
    return this;
  };
  this.setPosition = function(msg) {
    this.work = msg;
    return this;
  };
  this.sayHi = function() {
    return `hello,my name is ${this.name}, ${this.age} years old, I am a ${this.work}`;
  };
}

var person = new Preson("jim");
person
  .setAge(18)
  .setPosition("dev")
  .sayHi();
```
