import React, { useState } from 'react';
import { NavigationActions, Routes } from '~/main/navigation';
import Welcome from './welcome';

const WelcomePresenter: React.FC = () => {
  const [toggleEnabled, componentsToggle] = useState(false);

  const buttonAction = () => {
    NavigationActions.navigate(Routes.ACTIVITY);
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
