import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { GetMyPlansDatabase } from '~/data/useCases';
import { Activity } from '~/presentation/screens';
import ActivityView from '~/presentation/screens/activity/activity';
import GetDatabaseSpy from '../../data/database/getDatabaseSpy';
import { myPlansFake } from '../../data/helpers';

describe('Presentation: Activity', () => {
  test('should call getMyPlans of GetMyPlansDatabase only once', async () => {
    const getDatabase = new GetDatabaseSpy();
    const getMyPlans = new GetMyPlansDatabase(getDatabase);

    const getMyPlansSpy = jest.spyOn(getMyPlans, 'get');

    render(<Activity getMyPlans={getMyPlans} />);

    expect(getMyPlansSpy).toHaveBeenCalledTimes(1);
  });

  test('should call getMyPlans of GetMyPlansDatabase return my plans with success', async () => {
    const myPlans = myPlansFake();
    const getDatabase = new GetDatabaseSpy();
    const getMyPlans = new GetMyPlansDatabase(getDatabase);

    jest.spyOn(getMyPlans, 'get').mockResolvedValueOnce(myPlans);

    const { UNSAFE_getByType } = render(<Activity getMyPlans={getMyPlans} />);

    const activityView = UNSAFE_getByType(ActivityView);

    await waitFor(() => {
      expect(activityView.props.myPlans).toEqual(myPlans);
    });
  });
});
