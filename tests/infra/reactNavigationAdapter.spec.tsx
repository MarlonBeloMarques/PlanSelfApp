import React from 'react';
import {
  CommonActions,
  NavigationContainerRef,
} from '@react-navigation/native';
import { render } from '@testing-library/react-native';
import { Navigation, Routes } from '~/main/navigation';
import { ReactNavigationAdapter } from '~/infra';

describe('Infra: ReactNavigationAdapter', () => {
  test('should dispatch navigate action of React Navigation', () => {
    let navigation = {} as NavigationContainerRef<any>;
    const navigateSpy = jest.spyOn(CommonActions, 'navigate');

    render(
      <Navigation
        setNavigationTop={(navigationRef) => (navigation = navigationRef)}
        initialRouteName={Routes.WELCOME}
      />,
    );

    const sut = new ReactNavigationAdapter(navigation);
    sut.navigate('WELCOME', { param: 'any_param' });

    expect(navigateSpy).toHaveBeenCalledTimes(1);
    expect(navigateSpy).toHaveBeenCalledWith({
      name: 'WELCOME',
      params: { param: 'any_param' },
    });
  });
});
