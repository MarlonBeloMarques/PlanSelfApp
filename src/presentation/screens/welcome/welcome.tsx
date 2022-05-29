import React from 'react';
import { Text, View } from 'react-native';

const Welcome: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text>PLANSELF</Text>
      <Text testID="subtitle_id">
        You need to plan for have success in your life
      </Text>
    </View>
  );
};

export default Welcome;
