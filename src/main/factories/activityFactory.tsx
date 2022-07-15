import React from 'react';
import { RouteProp } from '@react-navigation/native';
import firebaseRemoteConfig from '@react-native-firebase/remote-config';
import firebaseDatabase from '@react-native-firebase/database';
import { Activity } from '~/presentation/screens';
import { Routes } from '~/main/navigation';
import { FirebaseAdapter } from '~/infra';
import {
  GetMyPlansDatabase,
  GetStatusAddPlanRemoteConfig,
} from '~/data/useCases';

type Props = {
  route: RouteProp<StackParams, Routes>;
  navigation: any;
};

const ActivityFactory: React.FC<Props> = () => {
  const path = FirebaseAdapter.convertToPath({
    user: 'user',
    myPlans: 'myPlans',
  });

  const remoteConfig = firebaseRemoteConfig();
  const database = firebaseDatabase();
  const databaseReference = database.ref(path);

  const firebase = new FirebaseAdapter(remoteConfig, databaseReference);

  const getMyPlans = new GetMyPlansDatabase(firebase);
  const getStatusAddPlan = new GetStatusAddPlanRemoteConfig(firebase);

  return (
    <Activity getMyPlans={getMyPlans} getStatusAddPlan={getStatusAddPlan} />
  );
};

export default ActivityFactory;
