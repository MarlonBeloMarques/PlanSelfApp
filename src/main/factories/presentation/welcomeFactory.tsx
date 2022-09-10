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

  const subtitleAnimationRotate = useSharedValue('10deg');
  const subtitleAnimationTranslateX = useSharedValue(-40);
  const subtitleAnimationTranslateY = useSharedValue(220);

  const iconAnimationRotate = useSharedValue('-40deg');
  const iconAnimationTranslateX = useSharedValue(-180);
  const iconAnimationTranslateY = useSharedValue(-60);
  const iconAnimationHeight = useSharedValue(200);

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
      subtitleAnimatedStyle={subtitleAnimatedStyle}
      subtitleAnimationRotate={subtitleAnimationRotate}
      subtitleAnimationTranslateX={subtitleAnimationTranslateX}
      subtitleAnimationTranslateY={subtitleAnimationTranslateY}
      iconAnimatedStyle={iconAnimatedStyle}
      iconAnimationHeight={iconAnimationHeight}
      iconAnimationRotate={iconAnimationRotate}
      iconAnimationTranslateX={iconAnimationTranslateX}
      iconAnimationTranslateY={iconAnimationTranslateY}
    />
  );
};

export default WelcomeFactory;
