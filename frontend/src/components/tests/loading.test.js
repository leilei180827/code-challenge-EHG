import React from 'react';
import renderer from 'react-test-renderer';
import Loading from '../loading';

test('loading page render correctly', () => {
  const component = renderer.create(
    <Loading></Loading>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});