import styled from 'styled-components/native';
import { spacings } from '~/presentation/themes';

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
  ${({ height }) => height}
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
