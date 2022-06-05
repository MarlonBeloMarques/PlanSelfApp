import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { CommonActions } from '@react-navigation/native';
import Main from '../../../src/main';
import {
  Navigation,
  NavigationActions,
  Routes,
} from '../../../src/main/navigation';

describe('Main: Navigation', () => {
  test('should dispatch navigate action with success', async () => {
    const setTopLevelNavigatorSpy = jest.spyOn(
      NavigationActions,
      'setTopLevelNavigator',
    );
    const navigateSpy = jest.spyOn(CommonActions, 'navigate');
    render(<Main initialRouteName={Routes.WELCOME} />);

    await waitFor(() => {
      expect(setTopLevelNavigatorSpy).toHaveBeenCalled();
      NavigationActions.navigate('WELCOME');
      expect(navigateSpy).toHaveBeenCalledTimes(1);
    });
  });

  test('should pass initialRouteName via props correctly for Navigation', () => {
    const welcomeRoutes = Routes.WELCOME;
    const { UNSAFE_getByType } = render(
      <Main initialRouteName={welcomeRoutes} />,
    );

    const navigation = UNSAFE_getByType(Navigation);
    expect(navigation.props.initialRouteName).toEqual(welcomeRoutes);
  });
});
