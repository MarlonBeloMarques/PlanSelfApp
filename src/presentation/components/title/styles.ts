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
