const inquirer = require('inquirer');
inquirer.prompt([
  {
    type: 'confirm',
    name: 'test',
    message: '你帅吗？',
    default: true
  },
  {
    type: 'list',
    name: 'age',
    message: '你现在几岁?',
    choices: [18, 20, 22],
    default: 0
  },
  {
    type: 'input',
    name: 'name',
    message: '你的名字?',
    default: '鸭蛋'
  }
]).then(answers => {
  console.log('答案为:');
  console.log(answers);
});