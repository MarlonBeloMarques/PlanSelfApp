import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { NavigationContainerRef } from '@react-navigation/native';
import { Welcome } from '~/presentation/screens';
import { NavigateScreenMyPlans } from '~/data/useCases';
import { Navigation, Routes } from '../../../src/main/navigation';

describe('Presentation: Welcome', () => {
  test('should call componentsToggle function updating toggleEnabled with success', () => {
    let toggleEnabled = false;
    const setToggleEnabled = () => {
      toggleEnabled = true;
    };
    const { sut } = makeSut(toggleEnabled, setToggleEnabled);
    const componentsSwitch = sut.getByTestId('components_switch_id');

    expect(toggleEnabled).toBe(false);
    fireEvent(componentsSwitch, 'onValueChange', true);
    expect(toggleEnabled).toBe(true);
  });

  test('should navigate with success when button press', () => {
    const { sut, navigateToMyPlansSpy } = makeSut();
    const button = sut.getByTestId('button_id');

    fireEvent.press(button);
    expect(navigateToMyPlansSpy).toHaveBeenCalledTimes(1);
  });
});

const makeSut = (toggleEnabled = false, componentsToggle = () => {}) => {
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
      componentsToggle={componentsToggle}
      toggleEnabled={toggleEnabled}
      setValueTranslateButton={() => {}}
      setValueTranslateIcon={() => {}}
      setValueTranslateSubtitle={() => {}}
      setValueTranslateTitle={() => {}}
      valueTranslateButton={valueTranslateStub()}
      valueTranslateSubtitle={valueTranslateStub()}
      valueTranslateIcon={valueTranslateStub()}
      valueTranslateTitle={valueTranslateStub()}
    />,
  );
  return { sut, navigateToMyPlansSpy };
};

const valueTranslateStub = () => {
  return { x: 0, y: 0 };
};
