import styled from 'styled-components/native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { spacings } from '~/presentation/themes';

const baseSpacing = spacings.baseSpacing;

export const SkeletonAnimation = styled(ShimmerPlaceholder).attrs({
  LinearGradient: LinearGradient,
  height: 16,
})`
  margin-bottom: 8px;
  border-radius: 4px;
`;

export const SkeletonAnimationWrapper = styled.View`
  z-index: 3;
  width: 100%;
  height: 100%;
  margin: ${baseSpacing}px;
`;
