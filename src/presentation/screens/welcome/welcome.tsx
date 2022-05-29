import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { PlanningImage } from '~/presentation/assets/images';

type Props = {
  buttonAction: () => void;
};

const Welcome: React.FC<Props> = ({ buttonAction }) => {
  return (
    <View style={{ flex: 1 }}>
      <Image testID="planning_image_id" source={PlanningImage} />
      <Text>PLANSELF</Text>
      <Text testID="subtitle_id">
        You need to plan for have success in your life
      </Text>
      <TouchableOpacity
        testID="button_id"
        onPress={buttonAction}
        activeOpacity={0.8}
      >
        <Text testID="button_label_id">I WANT TO PLAN</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;
