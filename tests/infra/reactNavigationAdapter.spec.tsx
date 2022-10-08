import React from 'react';
import {
  CommonActions,
  NavigationContainerRef,
} from '@react-navigation/native';
import { render, waitFor } from '@testing-library/react-native';
import { Navigation, Routes } from '~/main/navigation';
import { ReactNavigationAdapter } from '~/infra';

describe('Infra: ReactNavigationAdapter', () => {
  test('should dispatch navigate action of React Navigation', async () => {
    const { sut, navigateSpy } = makeSut();

    const routeName = Routes.WELCOME;
    const params = { param: 'any_param' };

    await waitFor(() => {
      sut.navigate(routeName, params);
      expect(navigateSpy).toHaveBeenCalledTimes(1);
      expect(navigateSpy).toHaveBeenCalledWith({
        name: routeName,
        params: params,
      });
    });
  });
});

const makeSut = () => {
  let navigation = {} as NavigationContainerRef<any>;
  const navigateSpy = jest.spyOn(CommonActions, 'navigate');

  render(
    <Navigation
      setNavigationTop={(navigationRef) => (navigation = navigationRef)}
      initialRouteName={Routes.WELCOME}
    />,
  );

  const sut = new ReactNavigationAdapter(navigation);

  return { sut, navigateSpy };
};
