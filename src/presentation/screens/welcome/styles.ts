import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import { spacings } from '~/presentation/themes';

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

export const SwitchWrapper = styled.View`
  align-items: center;
  margin: ${spacings.topSpacing}px ${spacings.bottomSpacing}px;
`;

export const styleSheet = {
  trackColor: {
    false: '#5d5d5d',
    true: '#E29C68',
  },
  thumbColor: '#ffffff',
};
