import React from 'react';
import { render } from '@testing-library/react-native';
import ActivityView from '../../../src/presentation/screens/activity/activity';

describe('UI: Activity', () => {
  test('should show header container with success', () => {
    const { getByTestId } = render(<ActivityView />);
    const headerContainer = getByTestId('header_container_id');
    expect(headerContainer).toBeTruthy();
  });

  test('should show header title with success', () => {
    const { getByTestId } = render(<ActivityView />);
    const headerTitle = getByTestId('header_title_id');
    expect(headerTitle).toBeTruthy();
  });
});
