import React, { useEffect, useState } from 'react';
import { Easing, SharedValue, withTiming } from 'react-native-reanimated';
import { Navigate } from '~/domain/useCases';
import Welcome from './welcome';

type Transform = (
  | {
      translateY: number;
      translateX?: undefined;
      rotate?: undefined;
    }
  | {
      translateX: number;
      translateY?: undefined;
      rotate?: undefined;
    }
  | {
      rotate: string;
      translateY?: undefined;
      translateX?: undefined;
    }
)[];

type Props = {
  navigate: Navigate;
  iconAnimatedStyle: {
    transform: Transform;
  };
  iconAnimationRotate: SharedValue<string>;
  iconAnimationTranslateX: SharedValue<number>;
  iconAnimationTranslateY: SharedValue<number>;
  iconAnimationHeight: SharedValue<number>;
};

const WelcomePresenter: React.FC<Props> = ({
  navigate,
  iconAnimatedStyle,
  iconAnimationHeight,
  iconAnimationRotate,
  iconAnimationTranslateX,
  iconAnimationTranslateY,
}) => {
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
      iconAnimationRotate.value = withTiming('0deg', {
        duration: 1000,
        easing: Easing.linear,
      });
      iconAnimationTranslateX.value = withTiming(valueTranslateIcon.x, {
        duration: 1000,
        easing: Easing.linear,
      });
      iconAnimationTranslateY.value = withTiming(valueTranslateIcon.y, {
        duration: 1000,
        easing: Easing.linear,
      });
      iconAnimationHeight.value = withTiming(161, {
        duration: 1000,
        easing: Easing.linear,
      });
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
      iconAnimatedStyle={iconAnimatedStyle}
      setValueTranslateButton={setValueTranslateButton}
      setValueTranslateIcon={setValueTranslateIcon}
      setValueTranslateSubtitle={setValueTranslateSubtitle}
      setValueTranslateTitle={setValueTranslateTitle}
      valueTranslateTitle={valueTranslateTitle}
      valueTranslateButton={valueTranslateButton}
      valueTranslateSubtitle={valueTranslateSubtitle}
    />
  );
};

export default WelcomePresenter;
