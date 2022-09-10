import React, { Dispatch, SetStateAction, useEffect } from 'react';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SubtitleText, Wrapper, WrapperAnimated } from './styles';

type Props = {
  setValueTranslateSubtitle: Dispatch<SetStateAction<{ x: number; y: number }>>;
  toggleEnabled: boolean;
  valueTranslateSubtitle: {
    x: number;
    y: number;
  };
};

const Subtitle: React.FC<Props> = ({
  setValueTranslateSubtitle,
  toggleEnabled,
  valueTranslateSubtitle,
}) => {
  const subtitleAnimationRotate = useSharedValue('10deg');
  const subtitleAnimationTranslateX = useSharedValue(-40);
  const subtitleAnimationTranslateY = useSharedValue(220);

  const subtitleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: subtitleAnimationTranslateY.value },
        { translateX: subtitleAnimationTranslateX.value },
        { rotate: subtitleAnimationRotate.value },
      ],
    };
  });

  useEffect(() => {
    if (toggleEnabled) {
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
    }
  }, [toggleEnabled]);

  return (
    <Wrapper>
      <WrapperAnimated
        position="absolute"
        style={[
          {
            marginBottom: 30,
          },
          subtitleAnimatedStyle,
        ]}
      >
        <SubtitleText testID="subtitle_id">
          You need to plan for have success in your life
        </SubtitleText>
      </WrapperAnimated>
      <Wrapper
        testID="subtitle_wrapper_id"
        height={42}
        onLayout={({ nativeEvent }) => {
          if (nativeEvent) {
            const { x, y } = nativeEvent.layout;
            setValueTranslateSubtitle({ x, y });
          }
        }}
      ></Wrapper>
    </Wrapper>
  );
};

export default Subtitle;
