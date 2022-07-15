import { GetMyPlans } from '~/domain/useCases';
import { GetDatabase } from '../database';
import { GetMyPlansDatabaseError } from '../errors';

export class GetMyPlansDatabase implements GetMyPlans {
  constructor(private readonly getDataBase: GetDatabase) {}
  async get(): Promise<GetMyPlans.List> {
    try {
      return await this.getDataBase.getData();
    } catch (error) {
      throw new GetMyPlansDatabaseError();
    }
  }
}
