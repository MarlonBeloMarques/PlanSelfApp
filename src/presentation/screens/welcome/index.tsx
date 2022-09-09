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
  buttonAnimatedStyle: {
    transform: Transform;
  };
  subtitleAnimatedStyle: {
    transform: Transform;
  };
  titleAnimatedStyle: {
    transform: Transform;
  };
  iconAnimatedStyle: {
    transform: Transform;
  };
  buttonAnimationRotate: SharedValue<string>;
  buttonAnimationTranslateX: SharedValue<number>;
  subtitleAnimationRotate: SharedValue<string>;
  subtitleAnimationTranslateX: SharedValue<number>;
  subtitleAnimationTranslateY: SharedValue<number>;
  titleAnimationRotate: SharedValue<string>;
  titleAnimationTranslateX: SharedValue<number>;
  titleAnimationTranslateY: SharedValue<number>;
  iconAnimationRotate: SharedValue<string>;
  iconAnimationTranslateX: SharedValue<number>;
  iconAnimationTranslateY: SharedValue<number>;
  iconAnimationHeight: SharedValue<number>;
};

const WelcomePresenter: React.FC<Props> = ({
  navigate,
  buttonAnimatedStyle,
  buttonAnimationRotate,
  buttonAnimationTranslateX,
  subtitleAnimatedStyle,
  subtitleAnimationRotate,
  subtitleAnimationTranslateX,
  subtitleAnimationTranslateY,
  titleAnimatedStyle,
  titleAnimationRotate,
  titleAnimationTranslateX,
  titleAnimationTranslateY,
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
      buttonAnimationRotate.value = withTiming('0deg', {
        duration: 1000,
        easing: Easing.linear,
      });
      buttonAnimationTranslateX.value = withTiming(valueTranslateButton.x, {
        duration: 1000,
        easing: Easing.linear,
      });

      subtitleAnimationRotate.value = withTiming('0deg', {
        duration: 1000,
        easing: Easing.linear,
      });
      subtitleAnimationTranslateX.value = withTiming(valueTranslateSubtitle.x, {
        duration: 1000,
        easing: Easing.linear,
      });
      subtitleAnimationTranslateY.value = withTiming(valueTranslateSubtitle.y, {
        duration: 1000,
        easing: Easing.linear,
      });

      titleAnimationRotate.value = withTiming('0deg', {
        duration: 1000,
        easing: Easing.linear,
      });
      titleAnimationTranslateX.value = withTiming(valueTranslateTitle.x, {
        duration: 1000,
        easing: Easing.linear,
      });
      titleAnimationTranslateY.value = withTiming(valueTranslateTitle.y, {
        duration: 1000,
        easing: Easing.linear,
      });

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
      buttonAnimatedStyle={buttonAnimatedStyle}
      subtitleAnimatedStyle={subtitleAnimatedStyle}
      titleAnimatedStyle={titleAnimatedStyle}
      iconAnimatedStyle={iconAnimatedStyle}
      setValueTranslateButton={setValueTranslateButton}
      setValueTranslateIcon={setValueTranslateIcon}
      setValueTranslateSubtitle={setValueTranslateSubtitle}
      setValueTranslateTitle={setValueTranslateTitle}
    />
  );
};

export default WelcomePresenter;
