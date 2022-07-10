import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { GetMyPlans } from '~/domain/useCases';
import ActivityView from '../../../src/presentation/screens/activity/activity';

describe('UI: Activity', () => {
  test('should show header container with success', () => {
    const { getByTestId } = render(
      <ActivityView myPlans={[] as GetMyPlans.List} onPressMore={() => {}} />,
    );
    const headerContainer = getByTestId('header_container_id');
    expect(headerContainer).toBeTruthy();
  });

  test('should show header title with success', () => {
    const { getByTestId } = render(
      <ActivityView myPlans={[] as GetMyPlans.List} onPressMore={() => {}} />,
    );
    const headerTitle = getByTestId('header_title_id');
    expect(headerTitle).toBeTruthy();
    expect(headerTitle.props.children).toEqual('My Plans');
  });

  test('should show list of my Plans with success', () => {
    const { getByTestId } = render(
      <ActivityView myPlans={[] as GetMyPlans.List} onPressMore={() => {}} />,
    );
    const listMyPlans = getByTestId('list_my_plans_id');
    expect(listMyPlans).toBeTruthy();
  });

  test('should show list of my Plans with data prop correct', () => {
    const myPlans = myPlansFake();
    const { getByTestId } = render(
      <ActivityView myPlans={myPlans} onPressMore={() => {}} />,
    );
    const listMyPlans = getByTestId('list_my_plans_id');
    expect(listMyPlans.props.data).toEqual(myPlans);
  });

  test('should show title correct of list of my Plans', () => {
    const myPlans = myPlansFake();
    const { getByTestId } = render(
      <ActivityView myPlans={myPlans} onPressMore={() => {}} />,
    );

    myPlans.forEach((plan, index) => {
      const titleMyPlan = getByTestId(`title_my_plan_${index}_id`);
      expect(titleMyPlan.props.children).toEqual(plan.title);
    });
  });

  test('should show more button of list of my Plans with success', () => {
    const myPlans = myPlansFake();
    const { getByTestId } = render(
      <ActivityView myPlans={myPlans} onPressMore={() => {}} />,
    );

    myPlans.forEach((plan, index) => {
      const moreButtonMyPlan = getByTestId(`more_button_my_plan_${index}_id`);
      const moreIconButtonMyPlan = getByTestId(
        `more_icon_button_my_plan_${index}_id`,
      );
      expect(moreButtonMyPlan).toBeTruthy();
      expect(moreIconButtonMyPlan.props.name).toEqual('more-horiz');
    });
  });

  test('should call function when press more button of list of my Plans', () => {
    const myPlans = myPlansFake();
    const onPressMore = jest.fn();
    const { getByTestId } = render(
      <ActivityView myPlans={myPlans} onPressMore={onPressMore} />,
    );

    const moreButtonMyPlan = getByTestId('more_button_my_plan_0_id');
    fireEvent.press(moreButtonMyPlan);

    expect(onPressMore).toHaveBeenCalledTimes(1);
    expect(onPressMore).toHaveBeenCalledWith(myPlans[0]);
  });
});

const myPlansFake = (): GetMyPlans.List => {
  return [
    {
      progress: 50,
      startDate: new Date('05/11/2021'),
      title: 'Study Swift',
    },
    {
      progress: 75,
      startDate: new Date('12/09/2021'),
      title: 'Study React Native',
    },
    {
      progress: 10,
      startDate: new Date('04/09/2021'),
      title: 'Documentation New App',
    },
  ];
};
