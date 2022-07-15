import React, { useEffect } from 'react';
import { GetMyPlans } from '~/domain/useCases';
import Activity from './activity';

type Props = {
  getMyPlans: GetMyPlans;
};

const ActivityPresentation: React.FC<Props> = ({ getMyPlans }) => {
  useEffect(() => {
    requestMyPlans();
  }, []);

  const requestMyPlans = async () => {
    await getMyPlans.get({ user: { myPlans: '' } });
  };

  return (
    <Activity myPlans={[]} onPressMore={() => {}} onPressAddPlan={() => {}} />
  );
};

export default ActivityPresentation;
