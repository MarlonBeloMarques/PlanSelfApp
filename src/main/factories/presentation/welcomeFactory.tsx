import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { Welcome } from '~/presentation/screens';
import { Routes } from '~/main/navigation';
import { NavigateScreenMyPlans } from '~/data/useCases';
import { useNavigate } from '../../helpers';

type Props = {
  route: RouteProp<StackParams, Routes>;
  navigation: any;
};

const WelcomeFactory: React.FC<Props> = () => {
  const navigate = useNavigate();
  const navigateScreen = new NavigateScreenMyPlans(navigate);
  return <Welcome navigate={navigateScreen} />;
};

export default WelcomeFactory;
