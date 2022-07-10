import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { GetMyPlans } from '~/domain/useCases';
import { Icons } from '~/main/modules';
import { colors, typography } from '~/presentation/themes';

type Props = {
  myPlans: GetMyPlans.List;
  onPressMore: (plan: GetMyPlans.MyPlan) => void;
};

type MyCardProps = {
  myPlan: GetMyPlans.MyPlan;
  index: number;
};

const Activity: React.FC<Props> = ({ myPlans, onPressMore }) => {
  const formatStartDate = (date: Date): string => {
    return date.toDateString();
  };

  const MyPlanCard = ({ myPlan, index }: MyCardProps) => (
    <View>
      <View>
        <Text testID={`title_my_plan_${index}_id`}>{myPlan.title}</Text>
        <TouchableOpacity
          testID={`more_button_my_plan_${index}_id`}
          onPress={() => onPressMore(myPlan)}
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
      <Text testID={`start_date_my_plan_${index}_id`}>
        {formatStartDate(myPlan.startDate)}
      </Text>
      <View>
        <View>
          <View
            testID={`progress_my_plan_${index}_id`}
            style={{ width: `${myPlan.progress}%` }}
          />
          <View />
        </View>
        <Text testID={`progress_text_my_plan_${index}_id`}>50%</Text>
      </View>
    </View>
  );

  return (
    <View>
      <View testID="header_container_id">
        <Text testID="header_title_id">My Plans</Text>
      </View>
      <FlatList
        testID="list_my_plans_id"
        data={myPlans}
        renderItem={({ item, index }) => (
          <MyPlanCard myPlan={item} index={index} />
        )}
      />
    </View>
  );
};

export default Activity;
