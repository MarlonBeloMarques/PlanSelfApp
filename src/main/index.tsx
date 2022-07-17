import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { NavigationContainerRef } from '@react-navigation/native';
import { Navigation, setTopLevelNavigator } from '~/main/navigation';
import {
  firebaseAdapterFactory,
  startFirebaseRemoteConfig,
} from './factories/infra';

type Props = {
  initialRouteName: keyof StackParams;
};

const Main: React.FC<Props> = ({ initialRouteName }) => {
  useEffect(() => {
    startFirebaseRemoteConfig(firebaseAdapterFactory());
  }, []);

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
