import { FlatList, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Icons } from '~/main/modules';
import { colors, spacings, typography } from '~/presentation/themes';

const sceneSpacing = spacings.sceneSpacing;
const minimumSpacing = spacings.minimumSpacing;
const smallSpacing = spacings.smallSpacing;

const title1 = typography.title1;
const title3 = typography.title3;
const callout = typography.callout;

const tertiary = colors.tertiary;
const primary = colors.primary;
const quaternary = colors.quaternary;

export const SceneWrapper = styled.View`
  flex: 1;
`;

export const TitleWrapper = styled.View`
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  padding: ${sceneSpacing}px;
`;

export const WrapperMyPlanTitle = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const WrapperMyPlanProgress = styled.View`
  flex: 0.9;
`;

export const Title = styled.Text`
  font-size: ${title1.fontSize}px;
  font-weight: bold;
`;

export const MyPlanTitle = styled.Text`
  font-size: ${title3.fontSize}px;
  font-weight: bold;
`;

export const MyPlanProgressText = styled.Text`
  text-align: right;
`;

export const MyPlanStartDate = styled.Text`
  font-size: ${callout.fontSize}px;
  color: ${tertiary};
  margin: ${minimumSpacing}px 0px;
`;

export const ContainerMyPlan = styled.View`
  flex: 1;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  padding: ${smallSpacing}px ${sceneSpacing}px;
`;

export const ContainerMyPlanProgress = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

type MyPlanProgressProps = {
  width: number;
};

export const MyPlanProgress = styled.View<MyPlanProgressProps>`
  background-color: ${primary};
  position: absolute;
  z-index: 2;
  height: 8px;
  width: ${({ width }) => width}%;
  border-radius: 3px;
`;

export const MyPlanProgressBackground = styled.View`
  background-color: ${quaternary};
  width: 100%;
  height: 8px;
  border-radius: 3px;
`;

export const MyPlanButtonMore = styled.TouchableOpacity``;

export const IconMore = styled(Icons.MaterialIcons).attrs({
  name: 'more-horiz',
  size: title1.fontSize,
  color: colors.text,
})``;

export const MyPlanList = styled.FlatList`` as unknown as typeof FlatList;
