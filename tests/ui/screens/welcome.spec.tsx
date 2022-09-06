import React from 'react';
import { AnimatedStyleProp } from 'react-native-reanimated';
import { ImageStyle, ViewStyle } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';
import WelcomeView from '../../../src/presentation/screens/welcome/welcome';

describe('UI: Welcome', () => {
  test('should show title with success', () => {
    const { getByText } = makeSut({} as MakeSutParams);
    const titlePlan = getByText('PLAN');
    const titleSelf = getByText('SELF');

    expect(titlePlan).toBeTruthy();
    expect(titleSelf).toBeTruthy();
  });

  test('should show subtitle with success', () => {
    const { getByTestId } = makeSut({} as MakeSutParams);
    const subtitle = getByTestId('subtitle_id');

    expect(subtitle).toBeTruthy();
  });

  test('should show button with label', () => {
    const { getByTestId } = makeSut({} as MakeSutParams);
    const button = getByTestId('button_id');
    const label = getByTestId('button_label_id');

    expect(button).toBeTruthy();
    expect(label).toBeTruthy();
    expect(label.props.children).toBeTruthy();
  });

  test('should press the button with success', () => {
    const buttonAction = jest.fn();
    const { getByTestId } = makeSut({
      buttonAction,
    } as unknown as MakeSutParams);
    const button = getByTestId('button_id');

    expect(button).toBeTruthy();
    fireEvent.press(button);
    expect(buttonAction).toHaveBeenCalledTimes(1);
  });

  test('should show planning image with success', () => {
    const { getByTestId } = makeSut({} as MakeSutParams);
    const planningImage = getByTestId('planning_image_id');

    expect(planningImage).toBeTruthy();
  });

  test('should show switch with success', () => {
    const { getByTestId } = makeSut({} as MakeSutParams);
    const componentsSwitch = getByTestId('components_switch_id');

    expect(componentsSwitch).toBeTruthy();
  });

  test('should is enabled switch with success', () => {
    const buttonAction = () => {};
    const { getByTestId } = makeSut({
      buttonAction,
      toggleEnabled: true,
    } as MakeSutParams);
    const componentsSwitch = getByTestId('components_switch_id');

    expect(componentsSwitch.props.value).toBe(true);
  });

  test('should not is enabled the switch', () => {
    const buttonAction = () => {};
    const { getByTestId } = makeSut({ buttonAction } as MakeSutParams);
    const componentsSwitch = getByTestId('components_switch_id');

    expect(componentsSwitch.props.value).toBe(false);
  });

  test('should call function that enable the switch', () => {
    const buttonAction = () => {};
    const componentsToggle = jest.fn();
    const { getByTestId } = makeSut({
      buttonAction,
      toggleEnabled: false,
      componentsToggle,
    } as unknown as MakeSutParams);
    const componentsSwitch = getByTestId('components_switch_id');

    fireEvent(componentsSwitch, 'onValueChange', true);
    expect(componentsToggle).toHaveBeenCalledTimes(1);
  });

  test('should call setValueTranslateIcon with correct params', async () => {
    const buttonAction = () => {};
    const componentsToggle = jest.fn();
    const setValueTranslateIcon = jest.fn();

    const { getByTestId } = makeSut({
      buttonAction,
      toggleEnabled: false,
      componentsToggle,
      setValueTranslateIcon,
    } as MakeSutParams);

    const wrapper = getByTestId('planning_image_wrapper_id');

    fireEvent(wrapper, 'layout', {
      nativeEvent: {
        layout: {
          x: 300,
          y: 300,
        },
      },
    });

    expect(setValueTranslateIcon).toHaveBeenCalledWith({
      x: 300,
      y: 300,
    });
  });
});

type MakeSutParams = {
  buttonAction: () => void;
  toggleEnabled: boolean;
  componentsToggle: () => void;
  setValueTranslateIcon: (
    value: React.SetStateAction<{
      x: number;
      y: number;
    }>,
  ) => void;
};

const makeSut = ({
  buttonAction,
  toggleEnabled,
  componentsToggle,
  setValueTranslateIcon,
}: MakeSutParams) => {
  const buttonAnimatedStyle = {} as AnimatedStyleProp<ViewStyle>;
  const subtitleAnimatedStyle = {} as AnimatedStyleProp<ViewStyle>;
  const titleAnimatedStyle = {} as AnimatedStyleProp<ViewStyle>;
  const iconAnimatedStyle = {} as AnimatedStyleProp<ImageStyle>;

  const setValueTranslateButton = jest.fn();
  const setValueTranslateSubtitle = jest.fn();
  const setValueTranslateTitle = jest.fn();

  const sut = render(
    <WelcomeView
      buttonAction={buttonAction}
      componentsToggle={componentsToggle}
      toggleEnabled={toggleEnabled}
      setValueTranslateButton={(
        value: React.SetStateAction<{ x: number; y: number }>,
      ) => {
        setValueTranslateButton(value);
      }}
      setValueTranslateSubtitle={(
        value: React.SetStateAction<{ x: number; y: number }>,
      ) => {
        setValueTranslateSubtitle(value);
      }}
      setValueTranslateTitle={(
        value: React.SetStateAction<{ x: number; y: number }>,
      ) => {
        setValueTranslateTitle(value);
      }}
      setValueTranslateIcon={(
        value: React.SetStateAction<{ x: number; y: number }>,
      ) => {
        setValueTranslateIcon(value);
      }}
      buttonAnimatedStyle={buttonAnimatedStyle}
      subtitleAnimatedStyle={subtitleAnimatedStyle}
      titleAnimatedStyle={titleAnimatedStyle}
      iconAnimatedStyle={iconAnimatedStyle}
    />,
  );

  return sut;
};
