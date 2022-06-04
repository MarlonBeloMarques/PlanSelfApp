import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { Welcome } from '../../../src/presentation/screens';
import WelcomeView from '../../../src/presentation/screens/welcome/welcome';

jest.mock('../../../src/presentation/assets/images');

describe('Presentation: Welcome', () => {
  test('should call componentsToggle function updating toggleEnabled with success', () => {
    const { UNSAFE_getByType, getByTestId } = render(<Welcome />);

    const view = UNSAFE_getByType(WelcomeView);
    const componentsSwitch = getByTestId('components_switch_id');

    expect(view.props.toggleEnabled).toBe(false);
    fireEvent(componentsSwitch, 'onValueChange', true);
    expect(view.props.toggleEnabled).toBe(true);
  });
});
