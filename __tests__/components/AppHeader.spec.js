/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import AppHeader from '../../src/components/AppHeader';
import { render } from '@testing-library/react-native';

it('renders correctly', () => {
  renderer.create(<AppHeader />);
});

it('should have the title and subtitle', () => {
  const { getByText } = render(<AppHeader />);
  getByText('GeniusApp');
  getByText('Teste Sua Memória!');
});

it('should match snapshot', () => {
  const header = render(<AppHeader />);
  expect(header).toMatchSnapshot();
});
