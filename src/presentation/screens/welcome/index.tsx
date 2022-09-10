import React, { useEffect, useState } from 'react';
import { Navigate } from '~/domain/useCases';
import Welcome from './welcome';

type Props = {
  navigate: Navigate;
};

const WelcomePresenter: React.FC<Props> = ({ navigate }) => {
  const [toggleEnabled, componentsToggle] = useState(false);

  const [valueTranslateButton, setValueTranslateButton] = useState({
    x: 0,
    y: 0,
  });
  const [valueTranslateSubtitle, setValueTranslateSubtitle] = useState({
    x: 0,
    y: 0,
  });
  const [valueTranslateTitle, setValueTranslateTitle] = useState({
    x: 0,
    y: 0,
  });
  const [valueTranslateIcon, setValueTranslateIcon] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (toggleEnabled) {
    }
  }, [toggleEnabled]);

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
