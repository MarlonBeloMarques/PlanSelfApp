import React from 'react';
import { Dimensions } from 'react-native';
import { SkeletonAnimation, SkeletonAnimationWrapper } from './styles';

const screenWidth = Dimensions.get('screen').width;

const LoadingAnimation: React.FC = () => {
  return (
    <SkeletonAnimationWrapper testID="loading_animation_id">
      <SkeletonAnimation width={screenWidth / 5} />
      <SkeletonAnimation width={screenWidth / 1.3} />
      <SkeletonAnimation width={screenWidth / 1.6} />
      <SkeletonAnimation width={screenWidth / 3} />
      <SkeletonAnimation width={screenWidth / 5} />
      <SkeletonAnimation width={screenWidth / 1.3} />
      <SkeletonAnimation width={screenWidth / 1.6} />
      <SkeletonAnimation width={screenWidth / 3} />
      <SkeletonAnimation width={screenWidth / 5} />
      <SkeletonAnimation width={screenWidth / 1.3} />
      <SkeletonAnimation width={screenWidth / 1.6} />
      <SkeletonAnimation width={screenWidth / 3} />
    </SkeletonAnimationWrapper>
  );
};

export default LoadingAnimation;
