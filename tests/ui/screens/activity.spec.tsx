import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { GetMyPlans } from '~/domain/useCases';
import ActivityView from '../../../src/presentation/screens/activity/activity';
import { myPlansFake } from '../../data/helpers';

type MyPlansTypeDate = Array<{
  progress: number;
  startDate: Date;
  title: string;
}>;

describe('UI: Activity', () => {
  test('should show header container with success', () => {
    const { getByTestId } = render(
      <ActivityView
        isLoading={false}
        myPlans={[] as GetMyPlans.List<Date>}
        onPressMore={() => {}}
        onPressAddPlan={() => {}}
        statusAddPlanButton={false}
      />,
    );
    const headerContainer = getByTestId('header_container_id');
    expect(headerContainer).toBeTruthy();
  });

  test('should show header title with success', () => {
    const { getByTestId } = render(
      <ActivityView
        isLoading={false}
        myPlans={[] as GetMyPlans.List<Date>}
        onPressMore={() => {}}
        onPressAddPlan={() => {}}
        statusAddPlanButton={false}
      />,
    );
    const headerTitle = getByTestId('header_title_id');
    expect(headerTitle).toBeTruthy();
    expect(headerTitle.props.children).toEqual('My Plans');
  });

  test('should show list of my Plans with success', () => {
    const { getByTestId } = render(
      <ActivityView
        isLoading={false}
        myPlans={[] as GetMyPlans.List<Date>}
        onPressMore={() => {}}
        onPressAddPlan={() => {}}
        statusAddPlanButton={false}
      />,
    );
    const listMyPlans = getByTestId('list_my_plans_id');
    expect(listMyPlans).toBeTruthy();
  });

  test('should show list of my Plans with data prop correct', () => {
    const myPlans = myPlansFake(true);
    const { getByTestId } = render(
      <ActivityView
        isLoading={false}
        myPlans={myPlans as MyPlansTypeDate}
        onPressMore={() => {}}
        onPressAddPlan={() => {}}
        statusAddPlanButton={false}
      />,
    );
    const listMyPlans = getByTestId('list_my_plans_id');
    expect(listMyPlans.props.data).toEqual(myPlans);
  });

  test('should show title correct of list of my Plans', () => {
    const myPlans = myPlansFake(true);
    const { getByTestId } = render(
      <ActivityView
        isLoading={false}
        myPlans={myPlans as MyPlansTypeDate}
        onPressMore={() => {}}
        onPressAddPlan={() => {}}
        statusAddPlanButton={false}
      />,
    );

    myPlans.forEach((plan, index) => {
      const titleMyPlan = getByTestId(`title_my_plan_${index}_id`);
      expect(titleMyPlan.props.children).toEqual(plan.title);
    });
  });

  test('should show more button of list of my Plans with success', () => {
    const myPlans = myPlansFake(true);
    const { getByTestId } = render(
      <ActivityView
        isLoading={false}
        myPlans={myPlans as MyPlansTypeDate}
        onPressMore={() => {}}
        onPressAddPlan={() => {}}
        statusAddPlanButton={false}
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
    const myPlans = myPlansFake(true);
    const onPressMore = jest.fn();
    const { getByTestId } = render(
      <ActivityView
        isLoading={false}
        myPlans={myPlans as MyPlansTypeDate}
        onPressMore={onPressMore}
        onPressAddPlan={() => {}}
        statusAddPlanButton={false}
      />,
    );

    const moreButtonMyPlan = getByTestId('more_button_my_plan_0_id');
    fireEvent.press(moreButtonMyPlan);

    expect(onPressMore).toHaveBeenCalledTimes(1);
    expect(onPressMore).toHaveBeenCalledWith(myPlans[0]);
  });

  test('should show progress correct of my Plan', () => {
    const myPlans = myPlansFake(true);
    const { getByTestId } = render(
      <ActivityView
        isLoading={false}
        myPlans={myPlans as MyPlansTypeDate}
        onPressMore={() => {}}
        onPressAddPlan={() => {}}
        statusAddPlanButton={false}
      />,
    );

    myPlans.forEach((plan, index) => {
      const progress = getByTestId(`progress_my_plan_${index}_id`);
      expect(progress).toBeTruthy();
      expect(progress.props.width).toEqual(plan.progress);
    });
  });

  test('should show text of progress correct of my Plan', () => {
    const myPlans = myPlansFake(true);
    const { getByTestId } = render(
      <ActivityView
        isLoading={false}
        myPlans={myPlans as MyPlansTypeDate}
        onPressMore={() => {}}
        onPressAddPlan={() => {}}
        statusAddPlanButton={false}
      />,
    );

    myPlans.forEach((plan, index) => {
      const progressText = getByTestId(`progress_text_my_plan_${index}_id`);
      expect(progressText).toBeTruthy();
      expect(progressText.props.children).toEqual(`${plan.progress}%`);
    });
  });

  test('should show correct start date of my Plan', () => {
    const myPlans = myPlansFake(true);
    const { getByTestId } = render(
      <ActivityView
        isLoading={false}
        myPlans={myPlans as MyPlansTypeDate}
        onPressMore={() => {}}
        onPressAddPlan={() => {}}
        statusAddPlanButton={false}
      />,
    );

    const startDate = getByTestId('start_date_my_plan_0_id');
    expect(startDate).toBeTruthy();
    expect(startDate.props.children).toEqual('Fri Nov 05 2021');
  });

  test('should show correct icon of button add plan', () => {
    const myPlans = myPlansFake(true);
    const { getByTestId } = render(
      <ActivityView
        isLoading={false}
        myPlans={myPlans as MyPlansTypeDate}
        onPressMore={() => {}}
        onPressAddPlan={() => {}}
        statusAddPlanButton={true}
      />,
    );

    const iconAddPlan = getByTestId('icon_add_plan_id');

    expect(iconAddPlan).toBeTruthy();
    expect(iconAddPlan.props.name).toEqual('add');
  });

  test('should call function when press add plan with success', () => {
    const onPressAddPlan = jest.fn();

    const myPlans = myPlansFake(true);
    const { getByTestId } = render(
      <ActivityView
        isLoading={false}
        myPlans={myPlans as MyPlansTypeDate}
        onPressMore={() => {}}
        onPressAddPlan={onPressAddPlan}
        statusAddPlanButton={true}
      />,
    );

    const buttonAddPlan = getByTestId('icon_button_add_plan_id');

    fireEvent.press(buttonAddPlan);

    expect(onPressAddPlan).toHaveBeenCalledTimes(1);
  });

  test('should show add plan button if statusAddPlanButton is true and isLoading is false', () => {
    const myPlans = myPlansFake(true);
    const { getByTestId } = render(
      <ActivityView
        isLoading={false}
        myPlans={myPlans as MyPlansTypeDate}
        onPressMore={() => {}}
        onPressAddPlan={() => {}}
        statusAddPlanButton={true}
      />,
    );

    const buttonAddPlan = getByTestId('icon_button_add_plan_id');

    expect(buttonAddPlan).toBeTruthy();
  });

  test('should not show add plan button if statusAddPlanButton is false and isLoading is true', () => {
    const myPlans = myPlansFake(true);
    const { queryByTestId } = render(
      <ActivityView
        isLoading={true}
        myPlans={myPlans as MyPlansTypeDate}
        onPressMore={() => {}}
        onPressAddPlan={() => {}}
        statusAddPlanButton={false}
      />,
    );

    const buttonAddPlan = queryByTestId('icon_button_add_plan_id');

    expect(buttonAddPlan).not.toBeTruthy();
  });

  test('should show loading animation if isLoading is true', () => {
    const myPlans = myPlansFake(true);
    const { getByTestId } = render(
      <ActivityView
        isLoading={true}
        myPlans={myPlans as MyPlansTypeDate}
        onPressMore={() => {}}
        onPressAddPlan={() => {}}
        statusAddPlanButton={false}
      />,
    );

    const loadingSkeleton = getByTestId('loading_animation_id');

    expect(loadingSkeleton).toBeTruthy();
  });

  test('should not show loading animation if isLoading is false', () => {
    const myPlans = myPlansFake(true);
    const { queryByTestId } = render(
      <ActivityView
        isLoading={false}
        myPlans={myPlans as MyPlansTypeDate}
        onPressMore={() => {}}
        onPressAddPlan={() => {}}
        statusAddPlanButton={false}
      />,
    );

    const loadingSkeleton = queryByTestId('loading_animation_id');

    expect(loadingSkeleton).not.toBeTruthy();
  });
});
