import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import WelcomeView from '../../../src/presentation/screens/welcome/welcome';

jest.mock('../../../src/presentation/assets/images');

describe('UI: Welcome', () => {
  test('should show title with success', () => {
    const { getByText } = makeSut();
    const titlePlan = getByText('PLAN');
    const titleSelf = getByText('SELF');

    expect(titlePlan).toBeTruthy();
    expect(titleSelf).toBeTruthy();
  });

  test('should show subtitle with success', () => {
    const { getByTestId } = makeSut();
    const subtitle = getByTestId('subtitle_id');

    expect(subtitle).toBeTruthy();
  });

  test('should show button with label', () => {
    const { getByTestId } = makeSut();
    const button = getByTestId('button_id');
    const label = getByTestId('button_label_id');

    expect(button).toBeTruthy();
    expect(label).toBeTruthy();
    expect(label.props.children).toBeTruthy();
  });

  test('should press the button with success', () => {
    const buttonAction = jest.fn();
    const { getByTestId } = makeSut(buttonAction);
    const button = getByTestId('button_id');

    expect(button).toBeTruthy();
    fireEvent.press(button);
    expect(buttonAction).toHaveBeenCalledTimes(1);
  });

  test('should show planning image with success', () => {
    const { getByTestId } = makeSut();
    const planningImage = getByTestId('planning_image_id');

    expect(planningImage).toBeTruthy();
  });

  test('should show switch with success', () => {
    const { getByTestId } = makeSut();
    const componentsSwitch = getByTestId('components_switch_id');

    expect(componentsSwitch).toBeTruthy();
  });

  test('should is enabled switch with success', () => {
    const buttonAction = () => {};
    const { getByTestId } = makeSut(buttonAction, true);
    const componentsSwitch = getByTestId('components_switch_id');

    expect(componentsSwitch.props.value).toBe(true);
  });

  test('should not is enabled the switch', () => {
    const buttonAction = () => {};
    const { getByTestId } = makeSut(buttonAction);
    const componentsSwitch = getByTestId('components_switch_id');

    expect(componentsSwitch.props.value).toBe(false);
  });

  test('should call function that enable the switch', () => {
    const buttonAction = () => {};
    const componentsToggle = jest.fn();
    const { getByTestId } = makeSut(buttonAction, false, componentsToggle);
    const componentsSwitch = getByTestId('components_switch_id');

    fireEvent(componentsSwitch, 'onValueChange', true);
    expect(componentsToggle).toHaveBeenCalledTimes(1);
  });
});

const makeSut = (
  buttonAction = () => {},
  toggleEnabled = false,
  componentsToggle = () => {},
) => {
  const sut = render(
    <WelcomeView
      buttonAction={buttonAction}
      componentsToggle={componentsToggle}
      toggleEnabled={toggleEnabled}
    />,
  );

  return sut;
};
