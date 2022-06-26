import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { Welcome } from '~/presentation/screens';
import { Routes } from '~/main/navigation';
import { NavigateScreenMyPlans } from '~/data/useCases';
import { navigator } from '../../../src/main/navigation';

type Props = {
  route: RouteProp<StackParams, Routes>;
  navigation: any;
};

const WelcomeFactory: React.FC<Props> = () => {
  const navigate = new NavigateScreenMyPlans(navigator);
  return <Welcome navigate={navigate} />;
};

export default WelcomeFactory;
