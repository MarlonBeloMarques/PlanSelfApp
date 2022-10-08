import React from 'react';
import { Navigate } from '~/domain/useCases';
import Welcome from './welcome';

type ValueTranslate = {
  x: number;
  y: number;
};

type Props = {
  navigate: Navigate;
  componentsToggle: React.Dispatch<React.SetStateAction<boolean>>;
  toggleEnabled: boolean;
  setValueTranslateButton: React.Dispatch<React.SetStateAction<ValueTranslate>>;
  setValueTranslateIcon: React.Dispatch<React.SetStateAction<ValueTranslate>>;
  setValueTranslateSubtitle: React.Dispatch<
    React.SetStateAction<ValueTranslate>
  >;
  setValueTranslateTitle: React.Dispatch<React.SetStateAction<ValueTranslate>>;
  valueTranslateButton: ValueTranslate;
  valueTranslateSubtitle: ValueTranslate;
  valueTranslateIcon: ValueTranslate;
  valueTranslateTitle: ValueTranslate;
};

const WelcomePresenter: React.FC<Props> = ({
  navigate,
  componentsToggle,
  setValueTranslateButton,
  setValueTranslateIcon,
  setValueTranslateSubtitle,
  setValueTranslateTitle,
  toggleEnabled,
  valueTranslateTitle,
  valueTranslateButton,
  valueTranslateIcon,
  valueTranslateSubtitle,
}) => {
  const buttonAction = () => {
    navigate.navigateToMyPlans();
  };

  return (
    <Welcome
      buttonAction={buttonAction}
      componentsToggle={componentsToggle}
      toggleEnabled={toggleEnabled}
      setValueTranslateButton={setValueTranslateButton}
      setValueTranslateIcon={setValueTranslateIcon}
      setValueTranslateSubtitle={setValueTranslateSubtitle}
      setValueTranslateTitle={setValueTranslateTitle}
      valueTranslateTitle={valueTranslateTitle}
      valueTranslateButton={valueTranslateButton}
      valueTranslateSubtitle={valueTranslateSubtitle}
      valueTranslateIcon={valueTranslateIcon}
    />
  );
};

export default WelcomePresenter;
