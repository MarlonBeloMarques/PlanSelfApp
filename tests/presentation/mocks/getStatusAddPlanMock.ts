import { GetStatusAddPlanRemoteConfig } from '~/data/useCases';

const getStatusAddPlanMock = (statusAddPlan = false) => {
  return jest
    .spyOn(GetStatusAddPlanRemoteConfig.prototype, 'get')
    .mockResolvedValueOnce(statusAddPlan);
};

export default getStatusAddPlanMock;
