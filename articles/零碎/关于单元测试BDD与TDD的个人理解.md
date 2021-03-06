# 关于单元测试BDD与TDD的个人理解

[tag]:记录|test|概念
[create]:2020-07-03

**单元测试的首要目的不是为了能够编写出大覆盖率的全部通过的测试代码，而是需要从使用者(调用者)的角度出发，尝试函数逻辑的各种可能性，进而辅助性增强代码质量**

## 定义：

- TDD: 测试驱动开发
- BDD: 行为驱动开发

## 理解：

- TDD：在开发初期先设计整体的测试用例框架，然后在一步一步的去填充每块的内容，进而驱动了开发
- BDD：（不是很理解）重点在于沟通，与产品与客户沟通后梳理出最终要完成的主要功能点，在对功能点进行一一实现，再跟测试人员对功能进行验证（从这里未看出单元测试应该怎么写，应该是非TDD的统一归为BDD？）

最重要的是：测试不是为了正确率与覆盖率，而是作为一种辅助手段，保证代码的严谨性与正确性，并且一定程度上能够影响代码的整体质量
