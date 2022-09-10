import React, { Dispatch, SetStateAction } from 'react';
import { Switch } from 'react-native';
import { Button, PlanningIcon, Subtitle, Title } from '../../components';
import { SceneWrapper, SwitchWrapper, Wrapper, styleSheet } from './styles';

type Props = {
  buttonAction: () => void;
  componentsToggle: Dispatch<SetStateAction<boolean>>;
  setValueTranslateButton: Dispatch<SetStateAction<{ x: number; y: number }>>;
  setValueTranslateSubtitle: Dispatch<SetStateAction<{ x: number; y: number }>>;
  setValueTranslateTitle: Dispatch<SetStateAction<{ x: number; y: number }>>;
  setValueTranslateIcon: Dispatch<SetStateAction<{ x: number; y: number }>>;
  toggleEnabled: boolean;
  valueTranslateTitle: { x: number; y: number };
  valueTranslateButton: { x: number; y: number };
  valueTranslateSubtitle: { x: number; y: number };
  valueTranslateIcon: { x: number; y: number };
};

const Welcome: React.FC<Props> = ({
  buttonAction,
  componentsToggle,
  setValueTranslateTitle,
  setValueTranslateIcon,
  setValueTranslateButton,
  setValueTranslateSubtitle,
  toggleEnabled,
  valueTranslateTitle,
  valueTranslateButton,
  valueTranslateSubtitle,
  valueTranslateIcon,
}) => {
  return (
    <SceneWrapper>
      <Wrapper flex={0.8}>
        <PlanningIcon
          setValueTranslateIcon={setValueTranslateIcon}
          toggleEnabled={toggleEnabled}
          valueTranslateIcon={valueTranslateIcon}
        />
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
