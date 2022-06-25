import { GetMyPlans } from '~/domain/useCases';
import { GetDatabase } from '../database';
import { GetMyPlansDatabaseError } from '../errors';

export class GetMyPlansDatabase implements GetMyPlans {
  constructor(private readonly getDataBase: GetDatabase<GetMyPlans.List>) {}
  get(): Promise<GetMyPlans.List> {
    try {
      return this.getDataBase.getData();
    } catch (error) {
      throw new GetMyPlansDatabaseError();
    }
  }
}
