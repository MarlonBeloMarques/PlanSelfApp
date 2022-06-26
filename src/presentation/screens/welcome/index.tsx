import React, { useState } from 'react';
import { Navigate } from '~/domain/useCases';
import Welcome from './welcome';

type Props = {
  navigate: Navigate;
};

const WelcomePresenter: React.FC<Props> = ({ navigate }) => {
  const [toggleEnabled, componentsToggle] = useState(false);

  const buttonAction = () => {
    navigate.navigateToMyPlans();
  };

  return (
    <Welcome
      buttonAction={buttonAction}
      componentsToggle={componentsToggle}
      toggleEnabled={toggleEnabled}
    />
  );
};

export default WelcomePresenter;
