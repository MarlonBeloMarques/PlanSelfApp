import React, { useEffect, useState } from 'react';
import {
  Easing,
  runOnJS,
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
  const [showComponents, setShowComponents] = useState(false);

  const [newButtonTranslateXValue, setNewButtonTranslateXValue] = useState(0);
  const [newSubtitleTranslateValue, setNewSubtitleTranslateValue] = useState({
    x: 0,
    y: 0,
  });
  const [newTitleTranslateValue, setNewTitleTranslateValue] = useState({
    x: 0,
    y: 0,
  });
  const [newIconTranslateValue, setNewIconTranslateValue] = useState({
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
      // button
      buttonAnimationRotate.value = withTiming(
        '0deg',
        {
          duration: 1000,
          easing: Easing.linear,
        },
        (finished) => {
          if (finished) {
            runOnJS(setShowComponents)(true);
          }
        },
      );
      buttonAnimationTranslateX.value = withTiming(newButtonTranslateXValue, {
        duration: 1000,
        easing: Easing.linear,
      });

      // subtitle
      subtitleAnimationRotate.value = withTiming('0deg', {
        duration: 1000,
        easing: Easing.linear,
      });
      subtitleAnimationTranslateX.value = withTiming(
        newSubtitleTranslateValue.x,
        {
          duration: 1000,
          easing: Easing.linear,
        },
      );
      subtitleAnimationTranslateY.value = withTiming(
        newSubtitleTranslateValue.y,
        {
          duration: 1000,
          easing: Easing.linear,
        },
      );

      // title
      titleAnimationRotate.value = withTiming('0deg', {
        duration: 1000,
        easing: Easing.linear,
      });
      titleAnimationTranslateX.value = withTiming(newTitleTranslateValue.x, {
        duration: 1000,
        easing: Easing.linear,
      });
      titleAnimationTranslateY.value = withTiming(newTitleTranslateValue.y, {
        duration: 1000,
        easing: Easing.linear,
      });

      // icon
      iconAnimationRotate.value = withTiming('0deg', {
        duration: 1000,
        easing: Easing.linear,
      });
      iconAnimationTranslateX.value = withTiming(newIconTranslateValue.x, {
        duration: 1000,
        easing: Easing.linear,
      });
      iconAnimationTranslateY.value = withTiming(newIconTranslateValue.y, {
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
      showComponents={showComponents}
      setNewButtonTranslateXValue={setNewButtonTranslateXValue}
      setNewSubtitleTranslateValue={setNewSubtitleTranslateValue}
      setNewTitleTranslateValue={setNewTitleTranslateValue}
      setNewIconTranslateValue={setNewIconTranslateValue}
    />
  );
};

export default WelcomePresenter;
