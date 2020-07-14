jest.mock('../src/utils/api');

import React from 'react';
import List from '../src/components/list';
import { getUserName } from '../src/utils/api';
import { mount } from 'enzyme';


describe('异步函数测试', () => {

  it('异步测试2', () => {
    return expect(getUserName(1020)).resolves.toEqual({ name: 'test name', id: 1020 });
  });

  it ('async / await', async () => {
    expect.assertions(1); // 有几个断言
    const res = await getUserName(1010);
    expect(res).toEqual({ name: 'test name', id: 1010 });
  });

  it('异步函数与UI结合', () => {
    const wrapper = mount(<List />);
    return wrapper.instance().getUserInfo(10002).then(res => {
      expect(res.name).toEqual('test name');
      expect(wrapper.find('.username').text()).toEqual(res.name);
    });
  });
});

