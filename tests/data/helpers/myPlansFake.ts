import { GetMyPlans } from '~/domain/useCases';

const myPlansFake = (): GetMyPlans.List => {
  return [
    {
      progress: 50,
      startDate: new Date('11/5/2021'),
      title: 'Study Swift',
    },
    {
      progress: 75,
      startDate: new Date('9/12/2021'),
      title: 'Study React Native',
    },
    {
      progress: 10,
      startDate: new Date('9/04/2021'),
      title: 'Documentation New App',
    },
  ];
};
export default myPlansFake;
