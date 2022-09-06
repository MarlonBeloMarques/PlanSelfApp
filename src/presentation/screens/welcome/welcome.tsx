import React, { Dispatch, SetStateAction } from 'react';
import { Dimensions, ImageStyle, Switch, ViewStyle } from 'react-native';
import { AnimatedStyleProp } from 'react-native-reanimated';
import { PlanningImage } from '~/presentation/assets/images';
import { spacings } from '~/presentation/themes';
import {
  Button,
  ButtonLabel,
  ImageWrapper,
  PlanText,
  PlanningIconAnimated,
  SceneWrapper,
  SelfText,
  SubtitleText,
  SwitchWrapper,
  TitleWrapper,
  Wrapper,
  WrapperAnimated,
  styleSheet,
} from './styles';
const width = Dimensions.get('screen').width;

type Props = {
  buttonAction: () => void;
  componentsToggle: Dispatch<SetStateAction<boolean>>;
  setValueTranslateButton: Dispatch<SetStateAction<{ x: number; y: number }>>;
  setValueTranslateSubtitle: Dispatch<SetStateAction<{ x: number; y: number }>>;
  setValueTranslateTitle: Dispatch<SetStateAction<{ x: number; y: number }>>;
  setValueTranslateIcon: Dispatch<SetStateAction<{ x: number; y: number }>>;
  toggleEnabled: boolean;
  buttonAnimatedStyle: AnimatedStyleProp<ViewStyle>;
  subtitleAnimatedStyle: AnimatedStyleProp<ViewStyle>;
  titleAnimatedStyle: AnimatedStyleProp<ViewStyle>;
  iconAnimatedStyle: AnimatedStyleProp<ImageStyle>;
};

const Welcome: React.FC<Props> = ({
  buttonAction,
  componentsToggle,
  setValueTranslateButton,
  setValueTranslateSubtitle,
  setValueTranslateTitle,
  setValueTranslateIcon,
  toggleEnabled,
  buttonAnimatedStyle,
  subtitleAnimatedStyle,
  titleAnimatedStyle,
  iconAnimatedStyle,
}) => {
  const renderIcon = () => {
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
              }
            }}
          ></ImageWrapper>
        </Wrapper>
      </Wrapper>
    );
  };

  const renderTitle = () => {
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

  const renderSubtitle = () => {
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

  const renderButton = () => {
    return (
      <Wrapper>
        <WrapperAnimated
          position="absolute"
          style={[
            { width: width - spacings.largeSpacing * 2 },
            buttonAnimatedStyle,
          ]}
        >
          <Button testID="button_id" onPress={buttonAction}>
            <ButtonLabel testID="button_label_id">I WANT TO PLAN</ButtonLabel>
          </Button>
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

  return (
    <SceneWrapper>
      <Wrapper flex={0.8}>
        {renderIcon()}
        {renderTitle()}
        {renderSubtitle()}
        <SwitchWrapper>
          <Switch
            testID="components_switch_id"
            trackColor={styleSheet.trackColor}
            thumbColor={styleSheet.thumbColor}
            onValueChange={componentsToggle}
            value={toggleEnabled}
          />
        </SwitchWrapper>
      </Wrapper>
      <Wrapper flex={0.2}>{renderButton()}</Wrapper>
    </SceneWrapper>
  );
};

export default Welcome;
