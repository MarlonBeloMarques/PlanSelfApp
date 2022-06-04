import React from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { NavigationContainerRef } from '@react-navigation/native';
import { Navigation, NavigationActions, Routes } from '~/main/navigation';
import { spacings } from '~/presentation/themes';

const Main: React.FC = () => {
  return (
    <WrapperScreen>
      <StatusBar barStyle="dark-content" />
      <Navigation
        setNavigationTop={(navigationRef: NavigationContainerRef<any>) =>
          NavigationActions.setTopLevelNavigator(navigationRef)
        }
        initialRouteName={Routes.WELCOME}
      />
    </WrapperScreen>
  );
};

const WrapperScreen = styled.View`
  flex: 1;
  padding: ${spacings.largeSpacing}px;
`;

export default Main;
