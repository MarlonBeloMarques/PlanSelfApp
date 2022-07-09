import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeFactory } from '~/main/factories';
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
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerTintColor: colors.text,
        title: '',
      }}
    >
      <Stack.Screen name={Routes.WELCOME}>
        {(props) => <WelcomeFactory {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default StackNavigation;
