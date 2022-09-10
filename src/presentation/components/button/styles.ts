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
  ${({ flex }) => flex}
  ${({ height }) =>
    height &&
    `
    height: ${height}px
  `}
`;

export const ButtonLabel = styled.Text`
  text-align: center;
  color: ${colors.tertiary};
  font-weight: bold;
  font-size: ${typography.body.fontSize}px;
  line-height: ${typography.body.lineHeight}px;
`;

export const ButtonOpacity = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  border-radius: ${spacings.smallSpacing}px;
  border-width: ${spacings.minimumSpacing}px;
  height: 65px;
  justify-content: center;
  border-color: ${colors.primary};
`;
