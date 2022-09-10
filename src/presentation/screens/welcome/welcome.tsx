import React, { Dispatch, SetStateAction } from 'react';
import { Dimensions, ImageStyle, Switch } from 'react-native';
import { AnimatedStyleProp } from 'react-native-reanimated';
import { PlanningImage } from '~/presentation/assets/images';
import { spacings } from '~/presentation/themes';
import { Button, Subtitle, Title } from '../../components';
import {
  ImageWrapper,
  PlanningIconAnimated,
  SceneWrapper,
  SwitchWrapper,
  Wrapper,
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
  iconAnimatedStyle: AnimatedStyleProp<ImageStyle>;
  valueTranslateTitle: { x: number; y: number };
  valueTranslateButton: { x: number; y: number };
  valueTranslateSubtitle: { x: number; y: number };
};

const Welcome: React.FC<Props> = ({
  buttonAction,
  componentsToggle,
  setValueTranslateTitle,
  setValueTranslateIcon,
  toggleEnabled,
  iconAnimatedStyle,
  valueTranslateTitle,
  setValueTranslateButton,
  valueTranslateButton,
  valueTranslateSubtitle,
  setValueTranslateSubtitle,
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

  return (
    <SceneWrapper>
      <Wrapper flex={0.8}>
        {renderIcon()}
        <Title
          setValueTranslateTitle={setValueTranslateTitle}
          valueTranslateTitle={valueTranslateTitle}
          toggleEnabled={toggleEnabled}
        />
        <Subtitle
          setValueTranslateSubtitle={setValueTranslateSubtitle}
          toggleEnabled={toggleEnabled}
          valueTranslateSubtitle={valueTranslateSubtitle}
        />
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
