import React, { useState } from 'react';
import Welcome from './welcome';

const WelcomePresenter: React.FC = () => {
  const [toggleEnabled, componentsToggle] = useState(false);
  return (
    <Welcome
      buttonAction={() => {}}
      componentsToggle={componentsToggle}
      toggleEnabled={toggleEnabled}
    />
  );
};

export default WelcomePresenter;
