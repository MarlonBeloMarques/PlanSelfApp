import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import WelcomeView from '../../../src/presentation/screens/welcome/welcome';

describe('UI: Welcome', () => {
  test('should show title with success', () => {
    const { getByText } = render(<WelcomeView buttonAction={() => {}} />);

    const title = getByText('PLANSELF');
    expect(title).toBeTruthy();
  });

  test('should show subtitle with success', () => {
    const { getByTestId } = render(<WelcomeView buttonAction={() => {}} />);

    const subtitle = getByTestId('subtitle_id');
    expect(subtitle).toBeTruthy();
  });

  test('should show button with label', () => {
    const { getByTestId } = render(<WelcomeView buttonAction={() => {}} />);

    const button = getByTestId('button_id');
    const label = getByTestId('button_label_id');

    expect(button).toBeTruthy();
    expect(label).toBeTruthy();
    expect(label.props.children).toBeTruthy();
  });

  test('should press the button with success', () => {
    const buttonAction = jest.fn();
    const { getByTestId } = render(<WelcomeView buttonAction={buttonAction} />);

    const button = getByTestId('button_id');

    expect(button).toBeTruthy();

    fireEvent.press(button);

    expect(buttonAction).toHaveBeenCalledTimes(1);
  });

  test('should show planning image with success', () => {
    const { getByTestId } = render(<WelcomeView buttonAction={() => {}} />);

    const planningImage = getByTestId('planning_image_id');

    expect(planningImage).toBeTruthy();
  });
});
