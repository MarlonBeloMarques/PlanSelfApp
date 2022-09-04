import React, { useEffect, useState } from 'react';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
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

  const buttonAnimationRotate = useSharedValue('-20deg');
  const buttonAnimationTranslateX = useSharedValue(160);

  const subtitleAnimationRotate = useSharedValue('10deg');
  const subtitleAnimationTranslateX = useSharedValue(-40);
  const subtitleAnimationTranslateY = useSharedValue(220);

  const titleAnimationRotate = useSharedValue('-20deg');
  const titleAnimationTranslateX = useSharedValue(160);
  const titleAnimationTranslateY = useSharedValue(-60);

  const iconAnimationRotate = useSharedValue('-40deg');
  const iconAnimationTranslateX = useSharedValue(-180);
  const iconAnimationTranslateY = useSharedValue(-60);
  const iconAnimationHeight = useSharedValue(200);

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: 0,
        },
        {
          translateX: buttonAnimationTranslateX.value,
        },
        { rotate: buttonAnimationRotate.value },
      ],
    };
  });

  const subtitleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: subtitleAnimationTranslateY.value },
        { translateX: subtitleAnimationTranslateX.value },
        { rotate: subtitleAnimationRotate.value },
      ],
    };
  });

  const titleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: titleAnimationTranslateY.value },
        { translateX: titleAnimationTranslateX.value },
        { rotate: titleAnimationRotate.value },
      ],
    };
  });

  const iconAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: iconAnimationTranslateY.value },
        { translateX: iconAnimationTranslateX.value },
        { rotate: iconAnimationRotate.value },
      ],
      height: iconAnimationHeight.value,
    };
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
