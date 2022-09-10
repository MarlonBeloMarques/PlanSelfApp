import React, { Dispatch, SetStateAction } from 'react';
import { Dimensions, ImageStyle, Switch, ViewStyle } from 'react-native';
import { AnimatedStyleProp } from 'react-native-reanimated';
import { PlanningImage } from '~/presentation/assets/images';
import { spacings } from '~/presentation/themes';
import { Button, Title } from '../../components';
import {
  ImageWrapper,
  PlanningIconAnimated,
  SceneWrapper,
  SubtitleText,
  SwitchWrapper,
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
  subtitleAnimatedStyle: AnimatedStyleProp<ViewStyle>;
  iconAnimatedStyle: AnimatedStyleProp<ImageStyle>;
  valueTranslateTitle: { x: number; y: number };
  valueTranslateButton: { x: number; y: number };
};

const Welcome: React.FC<Props> = ({
  buttonAction,
  componentsToggle,
  setValueTranslateSubtitle,
  setValueTranslateTitle,
  setValueTranslateIcon,
  toggleEnabled,
  subtitleAnimatedStyle,
  iconAnimatedStyle,
  valueTranslateTitle,
  setValueTranslateButton,
  valueTranslateButton,
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

  return (
    <SceneWrapper>
      <Wrapper flex={0.8}>
        {renderIcon()}
        <Title
          setValueTranslateTitle={setValueTranslateTitle}
          valueTranslateTitle={valueTranslateTitle}
          toggleEnabled={toggleEnabled}
        />
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
      <Wrapper flex={0.2}>
        <Button
          buttonAction={buttonAction}
          setValueTranslateButton={setValueTranslateButton}
          toggleEnabled={toggleEnabled}
          valueTranslateButton={valueTranslateButton}
        />
      </Wrapper>
    </SceneWrapper>
  );
};

export default Welcome;
