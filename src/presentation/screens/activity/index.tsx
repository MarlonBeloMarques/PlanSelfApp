import React, { useEffect, useState } from 'react';
import { GetMyPlans, GetStatusAddPlan } from '~/domain/useCases';
import Activity from './activity';

type Props = {
  getMyPlans: GetMyPlans;
  getStatusAddPlan: GetStatusAddPlan;
};

const ActivityPresentation: React.FC<Props> = ({
  getMyPlans,
  getStatusAddPlan,
}) => {
  const [myPlans, setMyPlans] = useState<GetMyPlans.List>([]);
  const [statusAddPlan, setStatusAddPlan] = useState<boolean>(false);

  useEffect(() => {
    requestMyPlans();
    requestStatusAddPlan();
  }, []);

  const requestMyPlans = async () => {
    const response = await getMyPlans.get({ user: { myPlans: 'myPlans' } });
    setMyPlans(response);
  };

  const requestStatusAddPlan = async () => {
    const response = await getStatusAddPlan.get('addPlan');
    setStatusAddPlan(response);
  };

  return (
    <Activity
      myPlans={myPlans}
      statusAddPlanButton={statusAddPlan}
      onPressMore={() => {}}
      onPressAddPlan={() => {}}
    />
  );
};

export default ActivityPresentation;
