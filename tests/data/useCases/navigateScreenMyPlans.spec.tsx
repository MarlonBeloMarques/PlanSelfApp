import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigateScreenMyPlans } from '../../../src/data/useCases';
import { Navigation, Routes } from '../../../src/main/navigation';
import { NavigateScreenSpy } from '../navigate/navigateScreenSpy';

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
