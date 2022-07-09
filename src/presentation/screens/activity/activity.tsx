import React from 'react';
import { Text, View } from 'react-native';

const Activity: React.FC = () => {
  return (
    <View>
      <View testID="header_container_id">
        <Text testID="header_title_id">My Plans</Text>
      </View>
    </View>
  );
};

export default Activity;
