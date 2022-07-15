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

  useEffect(() => {
    requestMyPlans();
    requestStatusAddPlan();
  }, []);

  const requestMyPlans = async () => {
    const response = await getMyPlans.get({ user: { myPlans: '' } });
    setMyPlans(response);
  };

  const requestStatusAddPlan = async () => {
    await getStatusAddPlan.get('');
  };

  return (
    <Activity
      myPlans={myPlans}
      onPressMore={() => {}}
      onPressAddPlan={() => {}}
    />
  );
};

export default ActivityPresentation;
