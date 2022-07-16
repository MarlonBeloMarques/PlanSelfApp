import { GetMyPlans } from '~/domain/useCases';
import { GetDatabase } from '../database';
import { GetMyPlansDatabaseError } from '../errors';

export class GetMyPlansDatabase implements GetMyPlans {
  constructor(private readonly getDataBase: GetDatabase<GetMyPlans.List>) {}
  async get(): Promise<GetMyPlans.List> {
    try {
      const data = await this.getDataBase.getData();
      return data.filter((myPlan) => myPlan !== null);
    } catch (error) {
      throw new GetMyPlansDatabaseError();
    }
  }
}
