import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { Dimensions } from 'react-native';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { PlanningImage } from '~/presentation/assets/images';
import { spacings } from '~/presentation/themes';
import { ImageWrapper, PlanningIconAnimated, Wrapper } from './styles';

const width = Dimensions.get('screen').width;

type Props = {
  setValueTranslateIcon: Dispatch<SetStateAction<{ x: number; y: number }>>;
  toggleEnabled: boolean;
  valueTranslateIcon: {
    x: number;
    y: number;
  };
};

const PlanningIcon: React.FC<Props> = ({
  setValueTranslateIcon,
  toggleEnabled,
  valueTranslateIcon,
}) => {
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
  });

  return (
    <Wrapper>
      <PlanningIconAnimated
        position="absolute"
        style={[
          { width: width - spacings.largeSpacing * 2 },
          iconAnimatedStyle,
        ]}
        testID="planning_image_id"
        source={PlanningImage}
        resizeMode={'contain'}
      />
      <Wrapper height={161}>
        <ImageWrapper
          testID="planning_image_wrapper_id"
          onLayout={({ nativeEvent }) => {
            if (nativeEvent) {
              const { x, y } = nativeEvent.layout;
              setValueTranslateIcon({ x, y });
            } else {
              setValueTranslateIcon({ x: 0, y: 0 });
            }
          }}
        ></ImageWrapper>
      </Wrapper>
    </Wrapper>
  );
};

export default PlanningIcon;
