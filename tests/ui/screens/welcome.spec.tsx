import React from 'react';
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
    } as unknown as MakeSutParams);

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

  test('should call setValueTranslateButton with correct params', async () => {
    const buttonAction = () => {};
    const componentsToggle = jest.fn();
    const setValueTranslateButton = jest.fn();

    const { getByTestId } = makeSut({
      buttonAction,
      toggleEnabled: false,
      componentsToggle,
      setValueTranslateButton,
    } as unknown as MakeSutParams);

    const wrapper = getByTestId('button_wrapper_id');

    fireEvent(wrapper, 'layout', {
      nativeEvent: {
        layout: {
          x: 300,
          y: 300,
        },
      },
    });

    expect(setValueTranslateButton).toHaveBeenCalledWith({
      x: 300,
      y: 300,
    });
  });

  test('should call setValueTranslateTitle with correct params', async () => {
    const buttonAction = () => {};
    const componentsToggle = jest.fn();
    const setValueTranslateTitle = jest.fn();

    const { getByTestId } = makeSut({
      buttonAction,
      toggleEnabled: false,
      componentsToggle,
      setValueTranslateTitle,
    } as unknown as MakeSutParams);

    const wrapper = getByTestId('title_wrapper_id');

    fireEvent(wrapper, 'layout', {
      nativeEvent: {
        layout: {
          x: 300,
          y: 300,
        },
      },
    });

    expect(setValueTranslateTitle).toHaveBeenCalledWith({
      x: 300,
      y: 300,
    });
  });

  test('should call setValueTranslateSubtitle with correct params', async () => {
    const buttonAction = () => {};
    const componentsToggle = jest.fn();
    const setValueTranslateSubtitle = jest.fn();

    const { getByTestId } = makeSut({
      buttonAction,
      toggleEnabled: false,
      componentsToggle,
      setValueTranslateSubtitle,
    } as unknown as MakeSutParams);

    const wrapper = getByTestId('subtitle_wrapper_id');

    fireEvent(wrapper, 'layout', {
      nativeEvent: {
        layout: {
          x: 300,
          y: 300,
        },
      },
    });

    expect(setValueTranslateSubtitle).toHaveBeenCalledWith({
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
  setValueTranslateButton: (
    value: React.SetStateAction<{
      x: number;
      y: number;
    }>,
  ) => void;
  setValueTranslateTitle: (
    value: React.SetStateAction<{
      x: number;
      y: number;
    }>,
  ) => void;
  setValueTranslateSubtitle: (
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
  setValueTranslateButton,
  setValueTranslateTitle,
  setValueTranslateSubtitle,
}: MakeSutParams) => {
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
      valueTranslateTitle={{
        x: 0,
        y: 0,
      }}
      valueTranslateButton={{
        x: 0,
        y: 0,
      }}
      valueTranslateSubtitle={{
        x: 0,
        y: 0,
      }}
      valueTranslateIcon={{
        x: 0,
        y: 0,
      }}
    />,
  );

  return sut;
};
