import React, { Dispatch, SetStateAction } from 'react';
import { render, waitFor } from '@testing-library/react-native';
import {
  GetMyPlansDatabase,
  GetStatusAddPlanRemoteConfig,
} from '~/data/useCases';
import { Activity } from '~/presentation/screens';
import { GetMyPlans, GetStatusAddPlan } from '~/domain/useCases';
import { RemoteConfigSpy } from '../../data/remoteConfig/remoteConfigSpy';
import GetDatabaseSpy from '../../data/database/getDatabaseSpy';
import { myPlansFake } from '../../data/helpers';
import getMyPlansMock from '../mocks/getMyPlansMock';
import getStatusAddPlanMock from '../mocks/getStatusAddPlanMock';

let loading = true;
let myPlans: GetMyPlans.List<Date> = [];
let statusAddPlanButton = false;

describe('Presentation: Activity', () => {
  test('should call getMyPlans of GetMyPlansDatabase only once', async () => {
    const { getMyPlans, getStatusAddPlan } = makeSutParams();
    const getMyPlansSpy = getMyPlansMock();

    makeSut(getMyPlans, getStatusAddPlan);

    expect(getMyPlansSpy).toHaveBeenCalledTimes(1);
  });

  test('should call getMyPlans of GetMyPlansDatabase with correct param', async () => {
    const { getMyPlans, getStatusAddPlan } = makeSutParams();
    const getMyPlansSpy = getMyPlansMock();

    makeSut(getMyPlans, getStatusAddPlan);

    expect(getMyPlansSpy).toHaveBeenCalledWith({
      user: { myPlans: 'myPlans' },
    });
  });

  test('should call getMyPlans of GetMyPlansDatabase return my plans with success', async () => {
    const myPlansResponse = myPlansFake(true);
    const { getMyPlans, getStatusAddPlan } = makeSutParams();
    getMyPlansMock();

    makeSut(getMyPlans, getStatusAddPlan, myPlans, false, setMyPlans);

    await waitFor(() => {
      expect(myPlans).toEqual(myPlansResponse);
    });
  });

  test('should call getStatusAddPlan of GetStatusAddPlanRemoteConfig only once', async () => {
    const { getMyPlans, getStatusAddPlan } = makeSutParams();
    const getStatusAddPlanSpy = getStatusAddPlanMock();
    makeSut(getMyPlans, getStatusAddPlan);

    expect(getStatusAddPlanSpy).toHaveBeenCalledTimes(1);
  });

  test('should call getStatusAddPlan of GetStatusAddPlanRemoteConfig return status with success', async () => {
    const setMyPlans = () => {};
    const isLoading = () => false;
    const { getMyPlans, getStatusAddPlan } = makeSutParams();
    const statusAddPlan = true;
    getStatusAddPlanMock(statusAddPlan);

    makeSut(
      getMyPlans,
      getStatusAddPlan,
      myPlans,
      statusAddPlan,
      setMyPlans,
      isLoading,
      setStatusAddPlan,
    );

    await waitFor(() => {
      expect(statusAddPlanButton).toEqual(statusAddPlan);
    });
  });

  test('should call getStatusAddPlan of GetStatusAddPlanRemoteConfig with correct param', async () => {
    const statusAddPlan = true;
    const getStatusAddPlanSpy = getStatusAddPlanMock(statusAddPlan);
    const { getMyPlans, getStatusAddPlan } = makeSutParams();
    makeSut(getMyPlans, getStatusAddPlan, [], statusAddPlan);

    expect(getStatusAddPlanSpy).toHaveBeenCalledWith('addPlan');
  });

  test('should isLoading prop be true if myPlans is empty', async () => {
    loading = false;
    const { getMyPlans, getStatusAddPlan } = makeSutParams();
    getMyPlansMock([]);

    await waitFor(() => {
      makeSut(
        getMyPlans,
        getStatusAddPlan,
        myPlans,
        false,
        setMyPlans,
        isLoading,
      );
      expect(loading).toEqual(true);
    });
  });

  test('should isLoading prop be false if myPlans not is empty', async () => {
    loading = true;
    getMyPlansMock();
    const { getMyPlans, getStatusAddPlan } = makeSutParams();

    await waitFor(() => {
      makeSut(
        getMyPlans,
        getStatusAddPlan,
        myPlans,
        false,
        setMyPlans,
        isLoading,
      );
      expect(loading).toEqual(false);
    });
  });
});

const isLoading = (validation: () => boolean) => {
  loading = validation();
  return loading;
};

const setMyPlans = (plans: GetMyPlans.List<Date>) => {
  myPlans = plans;
};

const setStatusAddPlan = (statusAddPlan: boolean) => {
  statusAddPlanButton = statusAddPlan;
};

const makeSut = (
  getMyPlans: GetMyPlans,
  getStatusAddPlan: GetStatusAddPlan,
  myPlans: GetMyPlans.List<Date> = [],
  statusAddPlan = false,
  setMyPlans: (plans: GetMyPlans.List<Date>) => void = () => {},
  isLoading: (validation: () => boolean) => boolean = () => false,
  setStatusAddPlan: (statusAddPlan: boolean) => void = () => {},
) => {
  const sut = render(
    <Activity
      getMyPlans={getMyPlans}
      getStatusAddPlan={getStatusAddPlan}
      myPlans={myPlans}
      setMyPlans={setMyPlans as SetMyPlansType}
      statusAddPlan={statusAddPlan}
      setStatusAddPlan={setStatusAddPlan as SetStatusAddPlanType}
      isLoading={isLoading}
    />,
  );

  return sut;
};

type SetMyPlansType = Dispatch<SetStateAction<GetMyPlans.List<Date>>>;
type SetStatusAddPlanType = Dispatch<SetStateAction<boolean>>;

const makeSutParams = () => {
  const remoteConfig = new RemoteConfigSpy();
  const getDatabase = new GetDatabaseSpy();

  const getMyPlans = new GetMyPlansDatabase(getDatabase);
  const getStatusAddPlan = new GetStatusAddPlanRemoteConfig(remoteConfig);

  return { getMyPlans, getStatusAddPlan };
};
