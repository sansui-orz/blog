## lodash源码阅读

> 在工作的间隙，多读一些优秀的代码。发现亮点便记录下来。

- [x] isBoolean
  它判断的时候使用的是全等判断(===)，然后还考虑到Boolean实例的情况（Boolean实例是一个对象，使用全等的时候不发生隐式转换，所以即不等于true也不等于false）

- [x] iObjectLike
  满足typeof等于object且不等于null

- [x] isObject
  满足不等于null, typeof等于object或者function

- [x] isFunction
  满足typeof等于[object Function]或[object AsyncFunction]或[object GeneratorFunction]或[object Proxy]

- [x] isArrayLike
  是否是类数组，或数组, 满足[], html集合, 字符串， （arguments应该也是类数组）

- [x] isEmpty
  1. 如果是类数组，判断数组长度，长度为0为空
  2. 如果是map或者set，判断size, size0为空
  3. 如果入参是一个原型链(prototype)，则用Object.keys判断其长度
  4. 否则当作一个对象来判断, for in循环，如果hasOwnProperty则不为空
    4.1 如果是function, 直接for in并不会进入循环
  5. 以上条件都不满足，则为空

- [x] isNull
  直接全等判断

- [ ] isNative
  判断是否是原生方法, 首先是isObject其次通过正则匹配（还没搞懂匹配原理）

- [x] isString
  typeof 是string或者是String的实例

- [x] isNil
  这个函数用来判断入参是否等于(==)null
  null / undefined / ?

- [x] isNumber
  满足typeof等于number，或者是number的实例对象

- [x] isUndefined
  是否全等于undefined