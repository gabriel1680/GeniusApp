/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import AppHeader from '../src/components/AppHeader';

it('renders correctly', () => {
  renderer.create(<AppHeader />);
});

it('should have the title and subtitle', () => {
  const header = renderer.create(<AppHeader />).toJSON();
  expect(header.children[0].children[0]).toBe('GeniusApp');
  expect(header.children[1].children[0]).toBe('Teste Sua Memória!');
});
