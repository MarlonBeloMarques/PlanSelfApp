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
  PlanningIcon,
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
  setNewButtonTranslateXValue: Dispatch<SetStateAction<number>>;
  setNewSubtitleTranslateValue: Dispatch<
    SetStateAction<{ x: number; y: number }>
  >;
  setNewTitleTranslateValue: Dispatch<SetStateAction<{ x: number; y: number }>>;
  setNewIconTranslateValue: Dispatch<SetStateAction<{ x: number; y: number }>>;
  toggleEnabled: boolean;
  showComponents: boolean;
  buttonAnimatedStyle: AnimatedStyleProp<ViewStyle>;
  subtitleAnimatedStyle: AnimatedStyleProp<ViewStyle>;
  titleAnimatedStyle: AnimatedStyleProp<ViewStyle>;
  iconAnimatedStyle: AnimatedStyleProp<ImageStyle>;
};

const Welcome: React.FC<Props> = ({
  buttonAction,
  componentsToggle,
  setNewButtonTranslateXValue,
  setNewSubtitleTranslateValue,
  setNewTitleTranslateValue,
  setNewIconTranslateValue,
  toggleEnabled,
  showComponents,
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
            onLayout={({ nativeEvent }) => {
              if (nativeEvent) {
                const { x, y } = nativeEvent.layout;
                setNewIconTranslateValue({ x, y });
              }
            }}
          >
            {showComponents && (
              <PlanningIcon
                height={161}
                width={width}
                testID="planning_image_id"
                source={PlanningImage}
                resizeMode={'contain'}
              />
            )}
          </ImageWrapper>
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
          style={{ height: 28 }}
          onLayout={({ nativeEvent }) => {
            if (nativeEvent) {
              const { x, y } = nativeEvent.layout;
              console.log(nativeEvent);
              setNewTitleTranslateValue({ x, y });
            }
          }}
        >
          {showComponents && (
            <>
              <PlanText>PLAN</PlanText>
              <SelfText>SELF</SelfText>
            </>
          )}
        </TitleWrapper>
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
          height={42}
          onLayout={({ nativeEvent }) => {
            if (nativeEvent) {
              const { x, y } = nativeEvent.layout;
              setNewSubtitleTranslateValue({ x, y });
            }
          }}
        >
          {showComponents && (
            <SubtitleText testID="subtitle_id">
              You need to plan for have success in your life
            </SubtitleText>
          )}
        </Wrapper>
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
          height={65}
          onLayout={({ nativeEvent }) => {
            if (nativeEvent) {
              const { x } = nativeEvent.layout;
              setNewButtonTranslateXValue(x);
            }
          }}
        >
          {showComponents && (
            <Button testID="button_id" onPress={buttonAction}>
              <ButtonLabel testID="button_label_id">I WANT TO PLAN</ButtonLabel>
            </Button>
          )}
        </Wrapper>
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
