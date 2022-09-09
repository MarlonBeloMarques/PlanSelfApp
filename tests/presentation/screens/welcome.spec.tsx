import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { NavigationContainerRef } from '@react-navigation/native';
import { Welcome } from '~/presentation/screens';
import { NavigateScreenMyPlans } from '~/data/useCases';
import WelcomeView from '~/presentation/screens/welcome/welcome';
import { Navigation, Routes } from '../../../src/main/navigation';

describe('Presentation: Welcome', () => {
  test('should call componentsToggle function updating toggleEnabled with success', () => {
    const { sut } = makeSut();
    const view = sut.UNSAFE_getByType(WelcomeView);
    const componentsSwitch = sut.getByTestId('components_switch_id');

    expect(view.props.toggleEnabled).toBe(false);
    fireEvent(componentsSwitch, 'onValueChange', true);
    expect(view.props.toggleEnabled).toBe(true);
  });

  test('should navigate with success when button press', () => {
    const { sut, navigateToMyPlansSpy } = makeSut();
    const button = sut.getByTestId('button_id');

    fireEvent.press(button);
    expect(navigateToMyPlansSpy).toHaveBeenCalledTimes(1);
  });
});

const makeSut = () => {
  let navigation = {} as NavigationContainerRef<any>;

  render(
    <Navigation
      setNavigationTop={(navigationRef) => (navigation = navigationRef)}
      initialRouteName={Routes.WELCOME}
    />,
  );

  const navigate = new NavigateScreenMyPlans(navigation);

  const navigateToMyPlansSpy = jest.spyOn(navigate, 'navigateToMyPlans');

  const sut = render(
    <Welcome
      navigate={navigate}
      buttonAnimatedStyle={{
        transform: [],
      }}
      subtitleAnimatedStyle={{
        transform: [],
      }}
      titleAnimatedStyle={{
        transform: [],
      }}
      iconAnimatedStyle={{
        transform: [],
      }}
      buttonAnimationRotate={{
        value: '20deg',
      }}
      buttonAnimationTranslateX={{
        value: 1,
      }}
      subtitleAnimationRotate={{
        value: '20deg',
      }}
      subtitleAnimationTranslateX={{
        value: 1,
      }}
      subtitleAnimationTranslateY={{
        value: 1,
      }}
      titleAnimationRotate={{
        value: '20deg',
      }}
      titleAnimationTranslateX={{
        value: 1,
      }}
      titleAnimationTranslateY={{
        value: 1,
      }}
      iconAnimationRotate={{
        value: '20deg',
      }}
      iconAnimationTranslateX={{
        value: 1,
      }}
      iconAnimationTranslateY={{
        value: 1,
      }}
      iconAnimationHeight={{
        value: 1,
      }}
    />,
  );
  return { sut, navigateToMyPlansSpy };
};
