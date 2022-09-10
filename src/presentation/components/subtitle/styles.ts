import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import { typography } from '~/presentation/themes';

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

export const SubtitleText = styled.Text`
  font-size: ${typography.title3.fontSize}px;
  font-weight: bold;
  line-height: ${typography.title3.lineHeight}px;
`;
