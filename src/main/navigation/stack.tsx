import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityFactory, WelcomeFactory } from '~/main/factories/presentation';
import { colors } from '~/presentation/themes';
import { Routes } from './routes';

const Stack = createNativeStackNavigator<StackParams>();

type StackNavigationParams = {
  initialRouteName: keyof StackParams;
};

const StackNavigation: React.FC<StackNavigationParams> = ({
  initialRouteName,
}) => {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerTransparent: false,
        headerBackTitleVisible: false,
        headerTintColor: colors.text,
        title: '',
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name={Routes.WELCOME}>
        {(props) => <WelcomeFactory {...props} />}
      </Stack.Screen>
      <Stack.Screen name={Routes.ACTIVITY}>
        {(props) => <ActivityFactory {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default StackNavigation;
