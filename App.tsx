import React from 'react';
import { SafeAreaView, StatusBar, Text } from 'react-native';

const App = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <StatusBar barStyle={'light-content'} />
      <Text>PLANSELF</Text>
    </SafeAreaView>
  );
};

export default App;
