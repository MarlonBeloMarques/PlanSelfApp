import React from 'react';
import { render } from '@testing-library/react-native';
import { CommonActions } from '@react-navigation/native';
import Main from '../../../src/main';
import * as Navigator from '../../../src/main/navigation';

describe('Main: Navigation', () => {
  test('should pass initialRouteName via props correctly for Navigation', () => {
    const { Routes } = Navigator;
    const welcomeRoutes = Routes.WELCOME;
    const { sut } = makeSut(welcomeRoutes);

    const navigation = sut.UNSAFE_getByType(Navigator.Navigation);
    expect(navigation.props.initialRouteName).toEqual(welcomeRoutes);
  });
});

const makeSut = (initialRouteName = Routes.WELCOME) => {
  const setTopLevelNavigatorSpy = jest.spyOn(Navigator, 'setTopLevelNavigator');
  const navigateSpy = jest.spyOn(CommonActions, 'navigate');
  const sut = render(<Main initialRouteName={initialRouteName} />);

  return { setTopLevelNavigatorSpy, navigateSpy, sut };
};
