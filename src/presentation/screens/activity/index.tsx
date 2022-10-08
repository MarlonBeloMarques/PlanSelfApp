import React, { useEffect } from 'react';
import { GetMyPlans, GetStatusAddPlan } from '~/domain/useCases';
import Activity from './activity';

type Props = {
  getMyPlans: GetMyPlans;
  getStatusAddPlan: GetStatusAddPlan;
  myPlans: GetMyPlans.List<Date>;
  setMyPlans: React.Dispatch<React.SetStateAction<GetMyPlans.List<Date>>>;
  statusAddPlan: boolean;
  setStatusAddPlan: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: (validation: () => boolean) => boolean;
};

const ActivityPresentation: React.FC<Props> = ({
  getMyPlans,
  getStatusAddPlan,
  myPlans,
  setMyPlans,
  statusAddPlan,
  setStatusAddPlan,
  isLoading,
}) => {
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

  const myPlansIsEmpty = () => myPlans.length === 0;

  return (
    <Activity
      isLoading={isLoading(myPlansIsEmpty)}
      myPlans={myPlans}
      statusAddPlanButton={statusAddPlan}
    />
  );
};

export default ActivityPresentation;
