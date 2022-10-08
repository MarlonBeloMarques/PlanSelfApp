import { useState } from 'react';

const useHandlerWelcome = () => {
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

  return {
    toggleEnabled,
    componentsToggle,
    valueTranslateButton,
    setValueTranslateButton,
    valueTranslateSubtitle,
    setValueTranslateSubtitle,
    valueTranslateTitle,
    setValueTranslateTitle,
    valueTranslateIcon,
    setValueTranslateIcon,
  };
};

export default useHandlerWelcome;
