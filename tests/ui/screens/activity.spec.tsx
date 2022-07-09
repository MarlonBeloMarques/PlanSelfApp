import React from 'react';
import { render } from '@testing-library/react-native';
import { GetMyPlans } from '~/domain/useCases';
import ActivityView from '../../../src/presentation/screens/activity/activity';

describe('UI: Activity', () => {
  test('should show header container with success', () => {
    const { getByTestId } = render(
      <ActivityView myPlans={[] as GetMyPlans.List} />,
    );
    const headerContainer = getByTestId('header_container_id');
    expect(headerContainer).toBeTruthy();
  });

  test('should show header title with success', () => {
    const { getByTestId } = render(
      <ActivityView myPlans={[] as GetMyPlans.List} />,
    );
    const headerTitle = getByTestId('header_title_id');
    expect(headerTitle).toBeTruthy();
    expect(headerTitle.props.children).toEqual('My Plans');
  });

  test('should show list of my Plans with success', () => {
    const { getByTestId } = render(
      <ActivityView myPlans={[] as GetMyPlans.List} />,
    );
    const listMyPlans = getByTestId('list_my_plans_id');
    expect(listMyPlans).toBeTruthy();
  });
});
