import React from 'react';
import renderer from 'react-test-renderer';
import Tab from '../tab';

test('tab render correctly', () => {
  const handleImageTypeTab = (type) => {
  }
  const component = renderer.create(
    <Tab handleImageTypeTab={handleImageTypeTab}></Tab>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
