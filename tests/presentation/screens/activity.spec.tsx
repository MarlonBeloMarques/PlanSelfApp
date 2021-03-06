import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import {
  GetMyPlansDatabase,
  GetStatusAddPlanRemoteConfig,
} from '~/data/useCases';
import { Activity } from '~/presentation/screens';
import ActivityView from '~/presentation/screens/activity/activity';
import { GetMyPlans } from '~/domain/useCases';
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

  test('should call getMyPlans of GetMyPlansDatabase with correct param', async () => {
    const remoteConfig = new RemoteConfigSpy();
    const getDatabase = new GetDatabaseSpy();

    const getMyPlans = new GetMyPlansDatabase(getDatabase);
    const getStatusAddPlan = new GetStatusAddPlanRemoteConfig(remoteConfig);

    const getMyPlansSpy = jest.spyOn(getMyPlans, 'get');

    render(
      <Activity getMyPlans={getMyPlans} getStatusAddPlan={getStatusAddPlan} />,
    );

    expect(getMyPlansSpy).toHaveBeenCalledWith({
      user: { myPlans: 'myPlans' },
    });
  });

  test('should call getMyPlans of GetMyPlansDatabase return my plans with success', async () => {
    const myPlans = myPlansFake(true);
    const remoteConfig = new RemoteConfigSpy();
    const getDatabase = new GetDatabaseSpy();

    const getMyPlans = new GetMyPlansDatabase(getDatabase);
    const getStatusAddPlan = new GetStatusAddPlanRemoteConfig(remoteConfig);

    jest
      .spyOn(getMyPlans, 'get')
      .mockResolvedValueOnce(myPlans as GetMyPlans.List<Date>);

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

  test('should call getStatusAddPlan of GetStatusAddPlanRemoteConfig return status with success', async () => {
    const statusAddPlan = true;
    const remoteConfig = new RemoteConfigSpy();
    const getDatabase = new GetDatabaseSpy();

    const getMyPlans = new GetMyPlansDatabase(getDatabase);
    const getStatusAddPlan = new GetStatusAddPlanRemoteConfig(remoteConfig);

    jest.spyOn(getStatusAddPlan, 'get').mockResolvedValueOnce(statusAddPlan);

    const { UNSAFE_getByType } = render(
      <Activity getMyPlans={getMyPlans} getStatusAddPlan={getStatusAddPlan} />,
    );

    const activityView = UNSAFE_getByType(ActivityView);

    await waitFor(() => {
      expect(activityView.props.statusAddPlanButton).toEqual(statusAddPlan);
    });
  });

  test('should call getStatusAddPlan of GetStatusAddPlanRemoteConfig with correct param', async () => {
    const statusAddPlan = true;
    const remoteConfig = new RemoteConfigSpy();
    const getDatabase = new GetDatabaseSpy();

    const getMyPlans = new GetMyPlansDatabase(getDatabase);
    const getStatusAddPlan = new GetStatusAddPlanRemoteConfig(remoteConfig);

    const getStatusAddPlanSpy = jest
      .spyOn(getStatusAddPlan, 'get')
      .mockResolvedValueOnce(statusAddPlan);

    render(
      <Activity getMyPlans={getMyPlans} getStatusAddPlan={getStatusAddPlan} />,
    );

    expect(getStatusAddPlanSpy).toHaveBeenCalledWith('addPlan');
  });

  test('should isLoading prop be true if myPlans is empty', async () => {
    const remoteConfig = new RemoteConfigSpy();
    const getDatabase = new GetDatabaseSpy();

    const getMyPlans = new GetMyPlansDatabase(getDatabase);
    const getStatusAddPlan = new GetStatusAddPlanRemoteConfig(remoteConfig);

    jest
      .spyOn(getMyPlans, 'get')
      .mockResolvedValueOnce([] as GetMyPlans.List<Date>);

    const { UNSAFE_getByType } = render(
      <Activity getMyPlans={getMyPlans} getStatusAddPlan={getStatusAddPlan} />,
    );

    const activityView = UNSAFE_getByType(ActivityView);

    expect(activityView.props.isLoading).toEqual(true);
  });

  test('should isLoading prop be false if myPlans not is empty', async () => {
    const myPlans = myPlansFake(true);
    const remoteConfig = new RemoteConfigSpy();
    const getDatabase = new GetDatabaseSpy();

    const getMyPlans = new GetMyPlansDatabase(getDatabase);
    const getStatusAddPlan = new GetStatusAddPlanRemoteConfig(remoteConfig);

    jest
      .spyOn(getMyPlans, 'get')
      .mockResolvedValueOnce(myPlans as GetMyPlans.List<Date>);

    const { UNSAFE_getByType } = render(
      <Activity getMyPlans={getMyPlans} getStatusAddPlan={getStatusAddPlan} />,
    );

    const activityView = UNSAFE_getByType(ActivityView);

    await waitFor(() => {
      expect(activityView.props.myPlans).toEqual(myPlans);
      expect(activityView.props.isLoading).toEqual(false);
    });
  });
});
