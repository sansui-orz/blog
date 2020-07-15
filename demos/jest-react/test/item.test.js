import React from 'react';
import Item from '../src/components/item';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

const props = {
  name: 'test name',
  complete: false,
  index: 0,
  toggleStatus: () => { props.complete = true; },
  deleteItem: jest.fn(),
};

it('item renders correctly', () => {
  const tree = renderer.create(
    <Item {...props} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('click item', () => {
  const wrapper = mount(<Item {...props} />);
  wrapper.find('.item').at(0).simulate('click');
  expect(props.complete).toBe(true);
});