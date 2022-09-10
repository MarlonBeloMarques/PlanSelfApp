import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { Dimensions } from 'react-native';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { spacings } from '~/presentation/themes';
import {
  PlanText,
  SelfText,
  TitleWrapper,
  Wrapper,
  WrapperAnimated,
} from './styles';

const width = Dimensions.get('screen').width;

type Props = {
  setValueTranslateTitle: Dispatch<SetStateAction<{ x: number; y: number }>>;
  toggleEnabled: boolean;
  valueTranslateTitle: {
    x: number;
    y: number;
  };
};

const Title: React.FC<Props> = ({
  setValueTranslateTitle,
  toggleEnabled,
  valueTranslateTitle,
}) => {
  const titleAnimationRotate = useSharedValue('-20deg');
  const titleAnimationTranslateX = useSharedValue(160);
  const titleAnimationTranslateY = useSharedValue(-60);

  const titleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: titleAnimationTranslateY.value },
        { translateX: titleAnimationTranslateX.value },
        { rotate: titleAnimationRotate.value },
      ],
    };
  });

  useEffect(() => {
    if (toggleEnabled) {
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
    }
  }, [toggleEnabled]);

  return (
    <Wrapper>
      <WrapperAnimated position="absolute" style={titleAnimatedStyle}>
        <TitleWrapper style={{ width: width - spacings.largeSpacing * 2 }}>
          <PlanText>PLAN</PlanText>
          <SelfText>SELF</SelfText>
        </TitleWrapper>
      </WrapperAnimated>
      <TitleWrapper
        testID="title_wrapper_id"
        style={{ height: 28 }}
        onLayout={({ nativeEvent }) => {
          if (nativeEvent) {
            const { x, y } = nativeEvent.layout;
            setValueTranslateTitle({ x, y });
          }
        }}
      ></TitleWrapper>
    </Wrapper>
  );
};

export default Title;
