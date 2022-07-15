import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import {
  GetMyPlansDatabase,
  GetStatusAddPlanRemoteConfig,
} from '~/data/useCases';
import { Activity } from '~/presentation/screens';
import ActivityView from '~/presentation/screens/activity/activity';
import { RemoteConfigSpy } from '../../data/remoteConfig/remoteConfigSpy';
import GetDatabaseSpy from '../../data/database/getDatabaseSpy';
import { myPlansFake } from '../../data/helpers';

describe('Presentation: Activity', () => {
  test('should call getMyPlans of GetMyPlansDatabase only once', async () => {
    const remoteConfig = new RemoteConfigSpy();
    const getDatabase = new GetDatabaseSpy();

    const getMyPlans = new GetMyPlansDatabase(getDatabase);
    const getStatusAddPlan = new GetStatusAddPlanRemoteConfig(remoteConfig);

    const getMyPlansSpy = jest.spyOn(getMyPlans, 'get');

    render(
      <Activity getMyPlans={getMyPlans} getStatusAddPlan={getStatusAddPlan} />,
    );

    expect(getMyPlansSpy).toHaveBeenCalledTimes(1);
  });

  test('should call getMyPlans of GetMyPlansDatabase return my plans with success', async () => {
    const myPlans = myPlansFake();
    const remoteConfig = new RemoteConfigSpy();
    const getDatabase = new GetDatabaseSpy();

    const getMyPlans = new GetMyPlansDatabase(getDatabase);
    const getStatusAddPlan = new GetStatusAddPlanRemoteConfig(remoteConfig);

    jest.spyOn(getMyPlans, 'get').mockResolvedValueOnce(myPlans);

    const { UNSAFE_getByType } = render(
      <Activity getMyPlans={getMyPlans} getStatusAddPlan={getStatusAddPlan} />,
    );

    const activityView = UNSAFE_getByType(ActivityView);

    await waitFor(() => {
      expect(activityView.props.myPlans).toEqual(myPlans);
    });
  });

  test('should call getStatusAddPlan of GetStatusAddPlanRemoteConfig only once', async () => {
    const remoteConfig = new RemoteConfigSpy();
    const getDatabase = new GetDatabaseSpy();

    const getMyPlans = new GetMyPlansDatabase(getDatabase);
    const getStatusAddPlan = new GetStatusAddPlanRemoteConfig(remoteConfig);

    const getStatusAddPlanSpy = jest.spyOn(getStatusAddPlan, 'get');

    render(
      <Activity getMyPlans={getMyPlans} getStatusAddPlan={getStatusAddPlan} />,
    );

    expect(getStatusAddPlanSpy).toHaveBeenCalledTimes(1);
  });
});
