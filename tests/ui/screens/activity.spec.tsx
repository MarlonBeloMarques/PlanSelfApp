import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { GetMyPlans } from '~/domain/useCases';
import ActivityView from '../../../src/presentation/screens/activity/activity';

describe('UI: Activity', () => {
  test('should show header container with success', () => {
    const { getByTestId } = render(
      <ActivityView
        myPlans={[] as GetMyPlans.List}
        onPressMore={() => {}}
        onPressAddPlan={() => {}}
      />,
    );
    const headerContainer = getByTestId('header_container_id');
    expect(headerContainer).toBeTruthy();
  });

  test('should show header title with success', () => {
    const { getByTestId } = render(
      <ActivityView
        myPlans={[] as GetMyPlans.List}
        onPressMore={() => {}}
        onPressAddPlan={() => {}}
      />,
    );
    const headerTitle = getByTestId('header_title_id');
    expect(headerTitle).toBeTruthy();
    expect(headerTitle.props.children).toEqual('My Plans');
  });

  test('should show list of my Plans with success', () => {
    const { getByTestId } = render(
      <ActivityView
        myPlans={[] as GetMyPlans.List}
        onPressMore={() => {}}
        onPressAddPlan={() => {}}
      />,
    );
    const listMyPlans = getByTestId('list_my_plans_id');
    expect(listMyPlans).toBeTruthy();
  });

  test('should show list of my Plans with data prop correct', () => {
    const myPlans = myPlansFake();
    const { getByTestId } = render(
      <ActivityView
        myPlans={myPlans}
        onPressMore={() => {}}
        onPressAddPlan={() => {}}
      />,
    );
    const listMyPlans = getByTestId('list_my_plans_id');
    expect(listMyPlans.props.data).toEqual(myPlans);
  });

  test('should show title correct of list of my Plans', () => {
    const myPlans = myPlansFake();
    const { getByTestId } = render(
      <ActivityView
        myPlans={myPlans}
        onPressMore={() => {}}
        onPressAddPlan={() => {}}
      />,
    );

    myPlans.forEach((plan, index) => {
      const titleMyPlan = getByTestId(`title_my_plan_${index}_id`);
      expect(titleMyPlan.props.children).toEqual(plan.title);
    });
  });

  test('should show more button of list of my Plans with success', () => {
    const myPlans = myPlansFake();
    const { getByTestId } = render(
      <ActivityView
        myPlans={myPlans}
        onPressMore={() => {}}
        onPressAddPlan={() => {}}
      />,
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
      <ActivityView
        myPlans={myPlans}
        onPressMore={onPressMore}
        onPressAddPlan={() => {}}
      />,
    );

    const moreButtonMyPlan = getByTestId('more_button_my_plan_0_id');
    fireEvent.press(moreButtonMyPlan);

    expect(onPressMore).toHaveBeenCalledTimes(1);
    expect(onPressMore).toHaveBeenCalledWith(myPlans[0]);
  });

  test('should show progress correct of my Plan', () => {
    const myPlans = myPlansFake();
    const { getByTestId } = render(
      <ActivityView
        myPlans={myPlans}
        onPressMore={() => {}}
        onPressAddPlan={() => {}}
      />,
    );

    myPlans.forEach((plan, index) => {
      const progress = getByTestId(`progress_my_plan_${index}_id`);
      expect(progress).toBeTruthy();
      expect(progress.props.width).toEqual(plan.progress);
    });
  });

  test('should show text of progress correct of my Plan', () => {
    const myPlans = myPlansFake();
    const { getByTestId } = render(
      <ActivityView
        myPlans={myPlans}
        onPressMore={() => {}}
        onPressAddPlan={() => {}}
      />,
    );

    myPlans.forEach((plan, index) => {
      const progressText = getByTestId(`progress_text_my_plan_${index}_id`);
      expect(progressText).toBeTruthy();
      expect(progressText.props.children).toEqual(`${plan.progress}%`);
    });
  });

  test('should show correct start date of my Plan', () => {
    const myPlans = myPlansFake();
    const { getByTestId } = render(
      <ActivityView
        myPlans={myPlans}
        onPressMore={() => {}}
        onPressAddPlan={() => {}}
      />,
    );

    const startDate = getByTestId('start_date_my_plan_0_id');
    expect(startDate).toBeTruthy();
    expect(startDate.props.children).toEqual('Fri Nov 05 2021');
  });

  test('should show correct icon of button add plan', () => {
    const myPlans = myPlansFake();
    const { getByTestId } = render(
      <ActivityView
        myPlans={myPlans}
        onPressMore={() => {}}
        onPressAddPlan={() => {}}
      />,
    );

    const iconAddPlan = getByTestId('icon_add_plan_id');

    expect(iconAddPlan).toBeTruthy();
    expect(iconAddPlan.props.name).toEqual('add');
  });

  test('should call function when press add plan with success', () => {
    const onPressAddPlan = jest.fn();

    const myPlans = myPlansFake();
    const { getByTestId } = render(
      <ActivityView
        myPlans={myPlans}
        onPressMore={() => {}}
        onPressAddPlan={onPressAddPlan}
      />,
    );

    const buttonAddPlan = getByTestId('icon_button_add_plan_id');

    fireEvent.press(buttonAddPlan);

    expect(onPressAddPlan).toHaveBeenCalledTimes(1);
  });
});

const myPlansFake = (): GetMyPlans.List => {
  return [
    {
      progress: 50,
      startDate: new Date('11/5/2021'),
      title: 'Study Swift',
    },
    {
      progress: 75,
      startDate: new Date('9/12/2021'),
      title: 'Study React Native',
    },
    {
      progress: 10,
      startDate: new Date('9/04/2021'),
      title: 'Documentation New App',
    },
  ];
};
