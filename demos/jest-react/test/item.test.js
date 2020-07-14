import React from 'react';
import Item from '../src/components/item';
import renderer from 'react-test-renderer';

const props = {
  name: 'test name',
  complete: false,
  index: 0,
  toggleStatus: jest.fn(),
  deleteItem: jest.fn(),
};

it('item renders correctly', () => {
  const tree = renderer.create(
    <Item {...props} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});