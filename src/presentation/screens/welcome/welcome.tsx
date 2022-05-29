import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const Welcome: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text>PLANSELF</Text>
      <Text testID="subtitle_id">
        You need to plan for have success in your life
      </Text>
      <TouchableOpacity testID="button_id">
        <Text testID="button_label_id">I WANT TO PLAN</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;
