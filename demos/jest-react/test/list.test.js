import React from 'react';
import List from '../src/components/list';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

describe('list 组件测试', () => {
  it('list renders correctly', () => {
    const list = renderer.create(
      <List />
    ).toJSON();
    expect(list).toMatchSnapshot();
  });

  const componentDidMountSpy = jest.spyOn(List.prototype, 'componentDidMount'); // spy componentDidMount函数要放在渲染组件之前(因为渲染了之后函数就已经被调用过了)
  const wrapper = mount(<List />);
  const input = wrapper.find('input').at(0);
  const button = wrapper.find('button').at(0);
  
  it('测试生命周期是否被调用', () => {
    expect(componentDidMountSpy).toHaveBeenCalled();
    componentDidMountSpy.mockRestore(); // 使用后要主动 restore ，不然会一直存在且这个生命周期无法再测试
  });

  it('初始渲染逻辑操作', () => {
    expect(input.exists()); // input存在
    expect(button.exists()); // button存在
  });

  it('输入操作', () => {
    input.simulate('change', { // 输入
      target: {
        value: 'test value',
      }
    });
    expect(wrapper.instance().inputValue).toBe('test value'); // 判断输入是否正确
  });

  it('添加操作', () => {
    button.simulate('click'); // 点击
    expect(wrapper.find('Item').length).toBe(1); // 有一个Item组件
    expect(wrapper.state('list').length).toBe(1); // 数组里面有一项

    // 再次点击，这时候不应该增加数组长度
    button.simulate('click');
    expect(wrapper.find('Item').length).toBe(1); // 有一个Item组件
    expect(wrapper.state('list').length).toBe(1); // 数组里面有一项
  });

  it('点击操作', () => {
    wrapper.find('.item').at(0).simulate('click');
    expect(wrapper.find('.item').at(0).hasClass('checked')).toBe(true);
    expect(wrapper.instance().state.list[0].complete).toBe(true);
  });

  it('删除操作', () => {
    wrapper.find('.delete').at(0).simulate('click');
    expect(wrapper.state('list').length).toBe(0); // 数组是空的
  });

  it('测试组件内部函数调用', () => {
    const testSpy = jest.spyOn(wrapper.instance(), 'test');
    const result = wrapper.instance().test(1, 2);
    expect(testSpy).toHaveBeenCalled(); // 是否已经被调用过
    expect(result).toBe(1);
    testSpy.mockRestore();
  });
});

