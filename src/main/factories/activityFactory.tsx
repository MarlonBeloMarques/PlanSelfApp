import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { Activity } from '~/presentation/screens';
import { Routes } from '~/main/navigation';

type Props = {
  route: RouteProp<StackParams, Routes>;
  navigation: any;
};

const ActivityFactory: React.FC<Props> = () => {
  return <Activity />;
};

export default ActivityFactory;
