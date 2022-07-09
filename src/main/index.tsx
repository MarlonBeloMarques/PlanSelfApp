import React from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { NavigationContainerRef } from '@react-navigation/native';
import { Navigation, Routes, setTopLevelNavigator } from '~/main/navigation';

type Props = {
  initialRouteName?: keyof StackParams;
};

const Main: React.FC<Props> = ({ initialRouteName = Routes.WELCOME }) => {
  return (
    <WrapperScreen>
      <StatusBar barStyle="dark-content" />
      <Navigation
        setNavigationTop={(navigationRef: NavigationContainerRef<any>) =>
          setTopLevelNavigator(navigationRef)
        }
        initialRouteName={initialRouteName}
      />
    </WrapperScreen>
  );
};

const WrapperScreen = styled.View`
  flex: 1;
`;

export default Main;
