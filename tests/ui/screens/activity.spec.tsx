import React from 'react';
import { render } from '@testing-library/react-native';
import ActivityView from '../../../src/presentation/screens/activity/activity';

describe('UI: Activity', () => {
  test('should show header container with success', () => {
    const { getByTestId } = render(<ActivityView />);
    const headerContainer = getByTestId('header_container_id');
    expect(headerContainer).toBeTruthy();
  });
});
