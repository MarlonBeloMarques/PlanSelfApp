import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import WelcomeView from '../../../src/presentation/screens/welcome/welcome';
import {
  makeEventData,
  makeValueTranslateStub,
} from '../helpers/testFactories';

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
    const layout = { x: 300, y: 300 };
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
      nativeEvent: makeEventData(layout.x, layout.y),
    });

    expect(setValueTranslateIcon).toHaveBeenCalledWith({
      x: layout.x,
      y: layout.y,
    });
  });

  test('should call setValueTranslateIcon with params equal 0', async () => {
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
      nativeEvent: null,
    });

    expect(setValueTranslateIcon).toHaveBeenCalledWith({
      x: 0,
      y: 0,
    });
  });

  test('should call setValueTranslateButton with correct params', async () => {
    const layout = { x: 300, y: 300 };
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
      nativeEvent: makeEventData(layout.x, layout.y),
    });

    expect(setValueTranslateButton).toHaveBeenCalledWith({
      x: layout.x,
      y: layout.y,
    });
  });

  test('should call setValueTranslateButton with params equal 0', async () => {
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
      nativeEvent: null,
    });

    expect(setValueTranslateButton).toHaveBeenCalledWith({
      x: 0,
      y: 0,
    });
  });

  test('should call setValueTranslateTitle with correct params', async () => {
    const layout = { x: 300, y: 300 };
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
      nativeEvent: makeEventData(layout.x, layout.y),
    });

    expect(setValueTranslateTitle).toHaveBeenCalledWith({
      x: layout.x,
      y: layout.y,
    });
  });

  test('should call setValueTranslateTitle with params equal 0', async () => {
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
      nativeEvent: null,
    });

    expect(setValueTranslateTitle).toHaveBeenCalledWith({
      x: 0,
      y: 0,
    });
  });

  test('should call setValueTranslateSubtitle with correct params', async () => {
    const layout = { x: 300, y: 300 };
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
      nativeEvent: makeEventData(layout.x, layout.y),
    });

    expect(setValueTranslateSubtitle).toHaveBeenCalledWith({
      x: layout.x,
      y: layout.y,
    });
  });

  test('should call setValueTranslateSubtitle with params equal 0', async () => {
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
      nativeEvent: null,
    });

    expect(setValueTranslateSubtitle).toHaveBeenCalledWith({
      x: 0,
      y: 0,
    });
  });
});

type valueTranslateParam = React.SetStateAction<{
  x: number;
  y: number;
}>;

type MakeSutParams = {
  buttonAction: () => void;
  toggleEnabled: boolean;
  componentsToggle: () => void;
  setValueTranslateIcon: (value: valueTranslateParam) => void;
  setValueTranslateButton: (value: valueTranslateParam) => void;
  setValueTranslateTitle: (value: valueTranslateParam) => void;
  setValueTranslateSubtitle: (value: valueTranslateParam) => void;
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
      setValueTranslateButton={(value: valueTranslateParam) => {
        setValueTranslateButton(value);
      }}
      setValueTranslateSubtitle={(value: valueTranslateParam) => {
        setValueTranslateSubtitle(value);
      }}
      setValueTranslateTitle={(value: valueTranslateParam) => {
        setValueTranslateTitle(value);
      }}
      setValueTranslateIcon={(value: valueTranslateParam) => {
        setValueTranslateIcon(value);
      }}
      valueTranslateTitle={makeValueTranslateStub()}
      valueTranslateButton={makeValueTranslateStub()}
      valueTranslateSubtitle={makeValueTranslateStub()}
      valueTranslateIcon={makeValueTranslateStub()}
    />,
  );

  return sut;
};
