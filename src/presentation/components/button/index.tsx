import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { Dimensions } from 'react-native';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { spacings } from '~/presentation/themes';
import { ButtonLabel, ButtonOpacity, Wrapper, WrapperAnimated } from './styles';

const width = Dimensions.get('screen').width;

type Props = {
  setValueTranslateButton: Dispatch<SetStateAction<{ x: number; y: number }>>;
  toggleEnabled: boolean;
  valueTranslateButton: {
    x: number;
    y: number;
  };
  buttonAction: () => void;
};

const Button: React.FC<Props> = ({
  buttonAction,
  toggleEnabled,
  setValueTranslateButton,
  valueTranslateButton,
}) => {
  const buttonAnimationTranslateX = useSharedValue(160);
  const buttonAnimationRotate = useSharedValue('-20deg');
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
    }
  }, [toggleEnabled]);

  return (
    <Wrapper>
      <WrapperAnimated
        position="absolute"
        style={[
          { width: width - spacings.largeSpacing * 2, zIndex: 2 },
          buttonAnimatedStyle,
        ]}
      >
        <ButtonOpacity testID="button_id" onPress={buttonAction}>
          <ButtonLabel testID="button_label_id">I WANT TO PLAN</ButtonLabel>
        </ButtonOpacity>
      </WrapperAnimated>
      <Wrapper
        testID="button_wrapper_id"
        height={65}
        onLayout={({ nativeEvent }) => {
          if (nativeEvent) {
            const { x, y } = nativeEvent.layout;
            setValueTranslateButton({ x, y });
          }
        }}
      ></Wrapper>
    </Wrapper>
  );
};

export default Button;
