import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { Activity } from '~/presentation/screens';
import { Routes } from '~/main/navigation';
import {
  GetMyPlansDatabase,
  GetStatusAddPlanRemoteConfig,
} from '~/data/useCases';
import useHandlerActivity from '~/presentation/screens/activity/useHandlerActivity';
import { firebaseAdapterFactory } from '../infra';

type Props = {
  route: RouteProp<StackParams, Routes>;
  navigation: any;
};

const ActivityFactory: React.FC<Props> = () => {
  const { myPlans, setMyPlans, setStatusAddPlan, statusAddPlan, isLoading } =
    useHandlerActivity();
  const firebase = firebaseAdapterFactory();

  const getMyPlans = new GetMyPlansDatabase(firebase);
  const getStatusAddPlan = new GetStatusAddPlanRemoteConfig(firebase);

  return (
    <Activity
      getMyPlans={getMyPlans}
      getStatusAddPlan={getStatusAddPlan}
      myPlans={myPlans}
      statusAddPlan={statusAddPlan}
      setMyPlans={setMyPlans}
      setStatusAddPlan={setStatusAddPlan}
      isLoading={isLoading}
    />
  );
};

export default ActivityFactory;
