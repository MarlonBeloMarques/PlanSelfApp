import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { GetMyPlans } from '~/domain/useCases';

type Props = {
  myPlans: GetMyPlans.List;
};

const Activity: React.FC<Props> = ({ myPlans }) => {
  return (
    <View>
      <View testID="header_container_id">
        <Text testID="header_title_id">My Plans</Text>
      </View>
      <FlatList
        testID="list_my_plans_id"
        data={myPlans}
        renderItem={() => <View />}
      />
    </View>
  );
};

export default Activity;
