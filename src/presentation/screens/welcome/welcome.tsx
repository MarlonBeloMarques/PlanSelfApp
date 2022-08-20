import React, { Dispatch, SetStateAction } from 'react';
import { Switch } from 'react-native';
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
  Wrapper,
  styleSheet,
} from './styles';

type Props = {
  buttonAction: () => void;
  componentsToggle: Dispatch<SetStateAction<boolean>>;
  toggleEnabled: boolean;
};

const Welcome: React.FC<Props> = ({
  buttonAction,
  componentsToggle,
  toggleEnabled,
}) => {
  return (
    <SceneWrapper>
      <Wrapper flex={0.8}>
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
        <Wrapper style={{ marginBottom: 30 }}>
          <SubtitleText testID="subtitle_id">
            You need to plan for have success in your life
          </SubtitleText>
        </Wrapper>
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
      <Wrapper>
        <Button testID="button_id" onPress={buttonAction}>
          <ButtonLabel testID="button_label_id">I WANT TO PLAN</ButtonLabel>
        </Button>
      </Wrapper>
    </SceneWrapper>
  );
};

export default Welcome;
