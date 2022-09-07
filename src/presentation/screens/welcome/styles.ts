import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import { colors, spacings, typography } from '~/presentation/themes';

interface AnimatedWrapperProps {
  position?: 'relative' | 'absolute' | 'fixed';
}

export const WrapperAnimated = styled(Animated.View)<AnimatedWrapperProps>`
  position: ${({ position }) => position};
`;

type WrapperProps = {
  flex?: number;
  width?: number;
  height?: number;
};

export const Wrapper = styled.View<WrapperProps>`
  ${({ flex }) =>
    flex &&
    `
    flex: ${flex}
  `}
  ${({ height }) =>
    height &&
    `
    height: ${height}px
  `}
`;

export const SceneWrapper = styled.View`
  flex: 1;
  justify-content: center;
  margin: ${spacings.largeSpacing}px;
`;

export const ImageWrapper = styled.View`
  align-items: center;
  margin-bottom: ${spacings.baseSpacing * 2}px;
`;

export const SwitchWrapper = styled.View`
  align-items: center;
  margin: ${spacings.topSpacing}px ${spacings.bottomSpacing}px;
`;

type PlanningIconAnimatedProps = AnimatedWrapperProps;

export const PlanningIconAnimated = styled(
  Animated.Image,
)<PlanningIconAnimatedProps>`
  position: ${({ position }) => position};
`;

export const TitleWrapper = styled.View`
  justify-content: center;
  flex-direction: row;
  margin-bottom: ${spacings.baseSpacing * 2}px;
`;

export const PlanText = styled.Text`
  font-size: ${typography.title1.fontSize}px;
  font-weight: bold;
  line-height: ${typography.title1.lineHeight}px;
  color: ${colors.secondary};
`;

export const SelfText = styled.Text`
  font-size: ${typography.title1.fontSize}px;
  font-weight: bold;
  line-height: ${typography.title1.lineHeight}px;
  color: ${colors.tertiary};
`;

export const SubtitleText = styled.Text`
  font-size: ${typography.title3.fontSize}px;
  font-weight: bold;
  line-height: ${typography.title3.lineHeight}px;
`;

export const ButtonLabel = styled.Text`
  text-align: center;
  color: ${colors.tertiary};
  font-weight: bold;
  font-size: ${typography.body.fontSize}px;
  line-height: ${typography.body.lineHeight}px;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  border-radius: ${spacings.smallSpacing}px;
  border-width: ${spacings.minimumSpacing}px;
  height: 65px;
  justify-content: center;
  border-color: ${colors.primary};
`;

export const styleSheet = {
  trackColor: {
    false: '#5d5d5d',
    true: '#E29C68',
  },
  thumbColor: '#ffffff',
};
