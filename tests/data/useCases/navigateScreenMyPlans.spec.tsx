import React from 'react';
import { render } from '@testing-library/react-native';
import { Navigate } from '~/domain/useCases';
import { RouteParams } from '../../../src/domain/models';
import { Navigation, Routes } from '../../../src/main/navigation';

describe('Data: NavigateScreenMyPlans', () => {
  test('should call navigateToMyPlans passing the params correctly to navigate of NavigateScreen', () => {
    let navigation: any;

    render(
      <Navigation
        setNavigationTop={(navigationRef) => (navigation = navigationRef)}
        initialRouteName={Routes.WELCOME}
      />,
    );

    const navigateScreen = new NavigateScreenSpy(navigation);

    const sut = new NavigateScreenMyPlans(navigateScreen);

    sut.navigateToMyPlans({ param: 'any_param' });

    expect(navigateScreen.params).toEqual({ param: 'any_param' });
  });
});

class NavigateScreenMyPlans implements Navigate {
  constructor(readonly navigateScreen: NavigateScreen) {}

  navigateToMyPlans(params?: RouteParams | undefined): void {
    this.navigateScreen.navigate(Routes.ACTIVITY, params);
  }
}

class NavigateScreenSpy implements NavigateScreen {
  navigationRef: any;
  routeName!: string;
  params!: any;

  constructor(navigationRef: any) {
    this.navigationRef = navigationRef;
  }

  navigate(routeName: string, params?: GenericObject | undefined): void {
    this.routeName = routeName;
    this.params = params;
  }
}

interface NavigateScreen {
  navigate(routeName: string, params?: GenericObject | undefined): void;
}

type GenericObject = { [key: string]: any };
