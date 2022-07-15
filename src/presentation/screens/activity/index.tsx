import React, { useEffect, useState } from 'react';
import { GetMyPlans } from '~/domain/useCases';
import Activity from './activity';

type Props = {
  getMyPlans: GetMyPlans;
};

const ActivityPresentation: React.FC<Props> = ({ getMyPlans }) => {
  const [myPlans, setMyPlans] = useState<GetMyPlans.List>([]);

  useEffect(() => {
    requestMyPlans();
  }, []);

  const requestMyPlans = async () => {
    const response = await getMyPlans.get({ user: { myPlans: '' } });
    setMyPlans(response);
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
