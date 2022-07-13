import React from 'react';
import { GetMyPlans } from '~/domain/useCases';
import {
  ContainerMyPlan,
  ContainerMyPlanProgress,
  IconMore,
  MyPlanButtonMore,
  MyPlanList,
  MyPlanProgress,
  MyPlanProgressBackground,
  MyPlanProgressText,
  MyPlanStartDate,
  MyPlanTitle,
  SceneWrapper,
  Title,
  TitleWrapper,
  WrapperMyPlanProgress,
  WrapperMyPlanTitle,
} from './styles';

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
    <ContainerMyPlan>
      <WrapperMyPlanTitle>
        <MyPlanTitle testID={`title_my_plan_${index}_id`}>
          {myPlan.title}
        </MyPlanTitle>
        <MyPlanButtonMore
          testID={`more_button_my_plan_${index}_id`}
          onPress={() => onPressMore(myPlan)}
        >
          <IconMore testID={`more_icon_button_my_plan_${index}_id`} />
        </MyPlanButtonMore>
      </WrapperMyPlanTitle>
      <MyPlanStartDate testID={`start_date_my_plan_${index}_id`}>
        {formatStartDate(myPlan.startDate)}
      </MyPlanStartDate>
      <ContainerMyPlanProgress>
        <WrapperMyPlanProgress>
          <MyPlanProgress
            testID={`progress_my_plan_${index}_id`}
            width={myPlan.progress}
          />
          <MyPlanProgressBackground />
        </WrapperMyPlanProgress>
        <MyPlanProgressText testID={`progress_text_my_plan_${index}_id`}>
          50%
        </MyPlanProgressText>
      </ContainerMyPlanProgress>
    </ContainerMyPlan>
  );

  return (
    <SceneWrapper>
      <TitleWrapper testID="header_container_id">
        <Title testID="header_title_id">My Plans</Title>
      </TitleWrapper>
      <MyPlanList
        testID="list_my_plans_id"
        data={myPlans}
        renderItem={({ item, index }) => (
          <MyPlanCard myPlan={item} index={index} />
        )}
      />
    </SceneWrapper>
  );
};

export default Activity;
