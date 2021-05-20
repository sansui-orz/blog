// @ts-check

/**
 * @typedef UserInfo
 * @property {string} name 名字
 * @property {number} age 年龄
 * @property {() => void} say 方法
 */

/** @implements {UserInfo} */
class ClassUserInfo {
  name = '张三';
  age = 18;
  say() {
    console.log(this.name);
  }
}

const userInfo = new ClassUserInfo();
userInfo.say();