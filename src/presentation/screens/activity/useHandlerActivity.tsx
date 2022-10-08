import { useState } from 'react';
import { GetMyPlans } from '~/domain/useCases';

const useHandlerActivity = () => {
  const [myPlans, setMyPlans] = useState<GetMyPlans.List<Date>>([]);
  const [statusAddPlan, setStatusAddPlan] = useState<boolean>(false);

  const isLoading = (validation: () => boolean) => validation();

  return { myPlans, setMyPlans, statusAddPlan, setStatusAddPlan, isLoading };
};

export default useHandlerActivity;
