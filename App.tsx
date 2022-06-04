import React from 'react';
import { StatusBar, View } from 'react-native';
import { Welcome } from '~/presentation/screens';
import { spacings } from '~/presentation/themes';

const App = () => {
  return (
    <View style={{ flex: 1, padding: spacings.largeSpacing }}>
      <StatusBar barStyle={'dark-content'} />
      <Welcome />
    </View>
  );
};

export default App;
