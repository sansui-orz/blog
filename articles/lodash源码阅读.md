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

- [x] chunk
  将一个数组分成指定长度的多个数组，第一个参数为原数组，第二个为指定的子数组的长度

- [x] toInteger
 这个函数是将小数，或非数字转换成整数，对于Infinity也可以转换成在js中的数值最大值

- [x] toFinite
  将无限大或无限小的数转成一个固定的最大值最小值，如果入参非最大值或最小值，则返回其自身或0

- [x] toNumber
  将传入参数转换成数字, 其关注了对象的valueOf，二进制数，八进制数

- [x] defer
  使用setTimeout将传入方法进行异步调用

- [x] clone
  调用底层baseClone, 浅拷贝

- [ ] baseClone
  底层方法，简单看了下应该是个浅拷贝，兼容比较多，所以导致比较复杂，暂时放着

- [x] forEach | each
  传入对象或数组，第二个参数为遍历方法。

- [x] before
  第一个参数为可以调用的次数，第二个参数为该调用的方法。超出调用次数后再次调用会返回最后调用的结果 (还没搞懂它的应用场景)

- [ ]