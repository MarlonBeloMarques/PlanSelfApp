import React from 'react';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { RouteProp } from '@react-navigation/native';
import { Welcome } from '~/presentation/screens';
import { Routes } from '~/main/navigation';
import { NavigateScreenMyPlans } from '~/data/useCases';
import { useNavigate } from '../../helpers';

type Props = {
  route: RouteProp<StackParams, Routes>;
  navigation: any;
};

const WelcomeFactory: React.FC<Props> = () => {
  const navigate = useNavigate();
  const navigateScreen = new NavigateScreenMyPlans(navigate);

  const buttonAnimationTranslateX = useSharedValue(160);
  const buttonAnimationRotate = useSharedValue('-20deg');

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

  return (
    <Welcome
      navigate={navigateScreen}
      buttonAnimatedStyle={buttonAnimatedStyle}
      buttonAnimationRotate={buttonAnimationRotate}
      buttonAnimationTranslateX={buttonAnimationTranslateX}
      subtitleAnimatedStyle={subtitleAnimatedStyle}
      subtitleAnimationRotate={subtitleAnimationRotate}
      subtitleAnimationTranslateX={subtitleAnimationTranslateX}
      subtitleAnimationTranslateY={subtitleAnimationTranslateY}
      titleAnimatedStyle={titleAnimatedStyle}
      titleAnimationRotate={titleAnimationRotate}
      titleAnimationTranslateX={titleAnimationTranslateX}
      titleAnimationTranslateY={titleAnimationTranslateY}
      iconAnimatedStyle={iconAnimatedStyle}
      iconAnimationHeight={iconAnimationHeight}
      iconAnimationRotate={iconAnimationRotate}
      iconAnimationTranslateX={iconAnimationTranslateX}
      iconAnimationTranslateY={iconAnimationTranslateY}
    />
  );
};

export default WelcomeFactory;
