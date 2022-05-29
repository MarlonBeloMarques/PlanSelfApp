import React from 'react';
import { render } from '@testing-library/react-native';
import WelcomeView from '../../../src/presentation/screens/welcome/welcome';

describe('UI: Welcome', () => {
  test('should show title with success', () => {
    const { getByText } = render(<WelcomeView />);

    const title = getByText('PLANSELF');
    expect(title).toBeTruthy();
  });
});
