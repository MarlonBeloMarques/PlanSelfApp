import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { Activity } from '~/presentation/screens';
import { Routes } from '~/main/navigation';
import {
  GetMyPlansDatabase,
  GetStatusAddPlanRemoteConfig,
} from '~/data/useCases';
import { firebaseAdapterFactory } from '../infra';

type Props = {
  route: RouteProp<StackParams, Routes>;
  navigation: any;
};

const ActivityFactory: React.FC<Props> = () => {
  const firebase = firebaseAdapterFactory();

  const getMyPlans = new GetMyPlansDatabase(firebase);
  const getStatusAddPlan = new GetStatusAddPlanRemoteConfig(firebase);

  return (
    <Activity getMyPlans={getMyPlans} getStatusAddPlan={getStatusAddPlan} />
  );
};

export default ActivityFactory;
