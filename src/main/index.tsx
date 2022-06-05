import React from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { NavigationContainerRef } from '@react-navigation/native';
import { Navigation, NavigationActions } from '~/main/navigation';
import { spacings } from '~/presentation/themes';

type Props = {
  initialRouteName: keyof StackParams;
};

const Main: React.FC<Props> = ({ initialRouteName }) => {
  return (
    <WrapperScreen>
      <StatusBar barStyle="dark-content" />
      <Navigation
        setNavigationTop={(navigationRef: NavigationContainerRef<any>) =>
          NavigationActions.setTopLevelNavigator(navigationRef)
        }
        initialRouteName={initialRouteName}
      />
    </WrapperScreen>
  );
};

const WrapperScreen = styled.View`
  flex: 1;
  padding: ${spacings.largeSpacing}px;
`;

export default Main;
