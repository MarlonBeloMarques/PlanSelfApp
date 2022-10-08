import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { Welcome } from '~/presentation/screens';
import { Routes } from '~/main/navigation';
import { NavigateScreenMyPlans } from '~/data/useCases';
import useHandlerWelcome from '~/presentation/screens/welcome/useHandlerWelcome';
import { useNavigate } from '../../helpers';

type Props = {
  route: RouteProp<StackParams, Routes>;
  navigation: any;
};

const WelcomeFactory: React.FC<Props> = () => {
  const {
    componentsToggle,
    setValueTranslateButton,
    setValueTranslateIcon,
    setValueTranslateSubtitle,
    setValueTranslateTitle,
    toggleEnabled,
    valueTranslateButton,
    valueTranslateIcon,
    valueTranslateSubtitle,
    valueTranslateTitle,
  } = useHandlerWelcome();
  const navigate = useNavigate();
  const navigateScreen = new NavigateScreenMyPlans(navigate);

  return (
    <Welcome
      navigate={navigateScreen}
      componentsToggle={componentsToggle}
      toggleEnabled={toggleEnabled}
      setValueTranslateButton={setValueTranslateButton}
      setValueTranslateIcon={setValueTranslateIcon}
      setValueTranslateSubtitle={setValueTranslateSubtitle}
      setValueTranslateTitle={setValueTranslateTitle}
      valueTranslateButton={valueTranslateButton}
      valueTranslateSubtitle={valueTranslateSubtitle}
      valueTranslateIcon={valueTranslateIcon}
      valueTranslateTitle={valueTranslateTitle}
    />
  );
};

export default WelcomeFactory;
