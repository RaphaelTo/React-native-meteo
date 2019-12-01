/**
 * @format
 */

import 'react-native';
import React from 'react';
import Exercice1 from '../components/Exercice1'
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Exercice1 />).toJSON();
  expect(tree).toMatchSnapshot();
});
