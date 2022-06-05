import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Main from '../../../src/main';
import WelcomeView from '../../../src/presentation/screens/welcome/welcome';
import { NavigationActions, Routes } from '../../../src/main/navigation';

jest.mock('../../../src/presentation/assets/images');

describe('Presentation: Welcome', () => {
  test('should call componentsToggle function updating toggleEnabled with success', () => {
    const { UNSAFE_getByType, getByTestId } = render(
      <Main initialRouteName={Routes.WELCOME} />,
    );

    const view = UNSAFE_getByType(WelcomeView);
    const componentsSwitch = getByTestId('components_switch_id');

    expect(view.props.toggleEnabled).toBe(false);
    fireEvent(componentsSwitch, 'onValueChange', true);
    expect(view.props.toggleEnabled).toBe(true);
  });

  test('should navigate with success when button press', () => {
    const navigateSpy = jest.spyOn(NavigationActions, 'navigate');
    const { getByTestId } = render(<Main initialRouteName={Routes.WELCOME} />);

    const button = getByTestId('button_id');

    fireEvent.press(button);

    expect(navigateSpy).toHaveBeenCalledTimes(1);
  });
});
