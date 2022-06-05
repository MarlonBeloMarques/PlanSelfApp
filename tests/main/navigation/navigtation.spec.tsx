import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { CommonActions } from '@react-navigation/native';
import Main from '../../../src/main';
import { NavigationActions } from '../../../src/main/navigation';

jest.mock('../../../src/presentation/assets/images');

describe('Main: Navigation', () => {
  test('should dispatch navigate action with success', async () => {
    const setTopLevelNavigatorSpy = jest.spyOn(
      NavigationActions,
      'setTopLevelNavigator',
    );
    const navigateSpy = jest.spyOn(CommonActions, 'navigate');
    render(<Main />);

    await waitFor(() => {
      expect(setTopLevelNavigatorSpy).toHaveBeenCalled();
      NavigationActions.navigate('WELCOME');
      expect(navigateSpy).toHaveBeenCalledTimes(1);
    });
  });
});
