import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { GetMyPlans } from '~/domain/useCases';
import { Icons } from '~/main/modules';
import { colors, typography } from '~/presentation/themes';

type Props = {
  myPlans: GetMyPlans.List;
  onPressMore: (plan: GetMyPlans.MyPlan) => void;
};

const Activity: React.FC<Props> = ({ myPlans, onPressMore }) => {
  return (
    <View>
      <View testID="header_container_id">
        <Text testID="header_title_id">My Plans</Text>
      </View>
      <FlatList
        testID="list_my_plans_id"
        data={myPlans}
        renderItem={({ item, index }) => (
          <View>
            <View>
              <Text testID={`title_my_plan_${index}_id`}>{item.title}</Text>
              <TouchableOpacity
                testID={`more_button_my_plan_${index}_id`}
                onPress={() => onPressMore(item)}
                activeOpacity={0.8}
              >
                <Icons.MaterialIcons
                  testID={`more_icon_button_my_plan_${index}_id`}
                  name="more-horiz"
                  size={typography.title1.fontSize}
                  color={colors.text}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Activity;
