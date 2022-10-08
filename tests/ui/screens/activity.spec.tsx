import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import ActivityView from '../../../src/presentation/screens/activity/activity';
import { myPlansFake } from '../../data/helpers';

type MyPlansTypeDate = Array<{
  progress: number;
  startDate: Date;
  title: string;
}>;

describe('UI: Activity', () => {
  test('should show header container with success', () => {
    const { sut } = makeSut();
    const headerContainer = sut.getByTestId('header_container_id');

    expect(headerContainer).toBeTruthy();
  });

  test('should show header title with success', () => {
    const { sut } = makeSut();
    const headerTitle = sut.getByTestId('header_title_id');

    expect(headerTitle).toBeTruthy();
    expect(headerTitle.props.children).toEqual('My Plans');
  });

  test('should show list of my Plans with success', () => {
    const { sut } = makeSut();
    const listMyPlans = sut.getByTestId('list_my_plans_id');

    expect(listMyPlans).toBeTruthy();
  });

  test('should show list of my Plans with data prop correct', () => {
    const { sut, myPlans } = makeSut();
    const listMyPlans = sut.getByTestId('list_my_plans_id');

    expect(listMyPlans.props.data).toEqual(myPlans);
  });

  test('should show title correct of list of my Plans', () => {
    const { sut, myPlans } = makeSut();

    myPlans.forEach((plan, index) => {
      const titleMyPlan = sut.getByTestId(`title_my_plan_${index}_id`);
      expect(titleMyPlan.props.children).toEqual(plan.title);
    });
  });

  test('should show more button of list of my Plans with success', () => {
    const { sut, myPlans } = makeSut();

    myPlans.forEach((plan, index) => {
      const moreButtonMyPlan = sut.getByTestId(
        `more_button_my_plan_${index}_id`,
      );
      const moreIconButtonMyPlan = sut.getByTestId(
        `more_icon_button_my_plan_${index}_id`,
      );
      expect(moreButtonMyPlan).toBeTruthy();
      expect(moreIconButtonMyPlan.props.name).toEqual('more-horiz');
    });
  });

  test('should call function when press more button of list of my Plans', () => {
    const onPressMore = jest.fn();
    const onPressAddPlan = () => {};
    const { sut, myPlans } = makeSut(false, false, onPressAddPlan, onPressMore);
    const moreButtonMyPlan = sut.getByTestId('more_button_my_plan_0_id');
    fireEvent.press(moreButtonMyPlan);

    expect(onPressMore).toHaveBeenCalledTimes(1);
    expect(onPressMore).toHaveBeenCalledWith(myPlans[0]);
  });

  test('should show progress correct of my Plan', () => {
    const { sut, myPlans } = makeSut();

    myPlans.forEach((plan, index) => {
      const progress = sut.getByTestId(`progress_my_plan_${index}_id`);
      expect(progress).toBeTruthy();
      expect(progress.props.width).toEqual(plan.progress);
    });
  });

  test('should show text of progress correct of my Plan', () => {
    const { sut, myPlans } = makeSut();

    myPlans.forEach((plan, index) => {
      const progressText = sut.getByTestId(`progress_text_my_plan_${index}_id`);
      expect(progressText).toBeTruthy();
      expect(progressText.props.children).toEqual(`${plan.progress}%`);
    });
  });

  test('should show correct start date of my Plan', () => {
    const { sut } = makeSut();
    const startDate = sut.getByTestId('start_date_my_plan_0_id');

    expect(startDate).toBeTruthy();
    expect(startDate.props.children).toEqual('Fri Nov 05 2021');
  });

  test('should show correct icon of button add plan', () => {
    const { sut } = makeSut(false, true);
    const iconAddPlan = sut.getByTestId('icon_add_plan_id');

    expect(iconAddPlan).toBeTruthy();
    expect(iconAddPlan.props.name).toEqual('add');
  });

  test('should call function when press add plan with success', () => {
    const onPressAddPlan = jest.fn();
    const { sut } = makeSut(false, true, onPressAddPlan);
    const buttonAddPlan = sut.getByTestId('icon_button_add_plan_id');

    fireEvent.press(buttonAddPlan);

    expect(onPressAddPlan).toHaveBeenCalledTimes(1);
  });

  test('should show add plan button if statusAddPlanButton is true and isLoading is false', () => {
    const { sut } = makeSut(false, true);
    const buttonAddPlan = sut.getByTestId('icon_button_add_plan_id');

    expect(buttonAddPlan).toBeTruthy();
  });

  test('should not show add plan button if statusAddPlanButton is false and isLoading is true', () => {
    const { sut } = makeSut();
    const buttonAddPlan = sut.queryByTestId('icon_button_add_plan_id');

    expect(buttonAddPlan).not.toBeTruthy();
  });

  test('should show loading animation if isLoading is true', () => {
    const { sut } = makeSut(true);
    const loadingSkeleton = sut.getByTestId('loading_animation_id');

    expect(loadingSkeleton).toBeTruthy();
  });

  test('should not show loading animation if isLoading is false', () => {
    const { sut } = makeSut();
    const loadingSkeleton = sut.queryByTestId('loading_animation_id');

    expect(loadingSkeleton).not.toBeTruthy();
  });
});

const makeSut = (
  isLoading = false,
  statusAddPlanButton = false,
  onPressAddPlan = () => {},
  onPressMore = () => {},
  myPlans = myPlansFake(true),
) => {
  const sut = render(
    <ActivityView
      isLoading={isLoading}
      myPlans={myPlans as MyPlansTypeDate}
      onPressMore={onPressMore}
      onPressAddPlan={onPressAddPlan}
      statusAddPlanButton={statusAddPlanButton}
    />,
  );

  return { sut, myPlans };
};
