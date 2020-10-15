import React from 'react';
import renderer from 'react-test-renderer';
import Reload from '../reload';

test('reload render correctly', () => {

  const component = renderer.create(
    <Reload></Reload>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
