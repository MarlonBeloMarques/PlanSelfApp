import { GetMyPlansDatabase } from '~/data/useCases';
import { GetMyPlans } from '~/domain/useCases';
import { myPlansFake } from '../../data/helpers';

const getMyPlansMock = (myPlansResponse = myPlansFake(true)) => {
  return jest
    .spyOn(GetMyPlansDatabase.prototype, 'get')
    .mockResolvedValueOnce(myPlansResponse as GetMyPlans.List<Date>);
};

export default getMyPlansMock;
