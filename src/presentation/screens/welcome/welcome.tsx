import React from 'react';
import { Switch, View } from 'react-native';
import { PlanningImage } from '~/presentation/assets/images';
import {
  Button,
  ButtonLabel,
  ImageWrapper,
  PlanText,
  PlanningIcon,
  SceneWrapper,
  SelfText,
  SubtitleText,
  SwitchWrapper,
  TitleWrapper,
  styleSheet,
} from './styles';

type Props = {
  buttonAction: () => void;
  componentsToggle: () => void;
  toggleEnabled: boolean;
};

const Welcome: React.FC<Props> = ({
  buttonAction,
  componentsToggle,
  toggleEnabled,
}) => {
  return (
    <SceneWrapper>
      <View style={{ flex: 0.8 }}>
        <ImageWrapper>
          <PlanningIcon
            testID="planning_image_id"
            source={PlanningImage}
            resizeMode={'contain'}
          />
        </ImageWrapper>
        <TitleWrapper>
          <PlanText>PLAN</PlanText>
          <SelfText>SELF</SelfText>
        </TitleWrapper>
        <View style={{ marginBottom: 30 }}>
          <SubtitleText testID="subtitle_id">
            You need to plan for have success in your life
          </SubtitleText>
        </View>
        <SwitchWrapper>
          <Switch
            testID="components_switch_id"
            trackColor={styleSheet.trackColor}
            thumbColor={styleSheet.thumbColor}
            onValueChange={componentsToggle}
            value={toggleEnabled}
          />
        </SwitchWrapper>
      </View>
      <View>
        <Button testID="button_id" onPress={buttonAction}>
          <ButtonLabel testID="button_label_id">I WANT TO PLAN</ButtonLabel>
        </Button>
      </View>
    </SceneWrapper>
  );
};

export default Welcome;
