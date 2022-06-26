import React from 'react';
import {
  CommonActions,
  NavigationContainerRef,
} from '@react-navigation/native';
import { render } from '@testing-library/react-native';
import { Navigation, Routes } from '~/main/navigation';
import { NavigateScreen } from '../../src/data/navigate';

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

class ReactNavigationAdapter implements NavigateScreen {
  constructor(readonly navigation: NavigationContainerRef<any>) {}

  navigate(routeName: string, params?: GenericObject | undefined): void {
    this.navigation.dispatch(
      CommonActions.navigate({ name: routeName, params: params }),
    );
  }
}
