import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import { spacings } from '~/presentation/themes';

interface AnimatedProps {
  position?: 'relative' | 'absolute' | 'fixed';
}

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

export const ImageWrapper = styled.View`
  align-items: center;
  margin-bottom: ${spacings.baseSpacing * 2}px;
`;

type PlanningIconAnimatedProps = AnimatedProps;

export const PlanningIconAnimated = styled(
  Animated.Image,
)<PlanningIconAnimatedProps>`
  position: ${({ position }) => position};
`;
