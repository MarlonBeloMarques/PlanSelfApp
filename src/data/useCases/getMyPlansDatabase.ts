import { GetMyPlans } from '~/domain/useCases';
import { GetDatabase } from '../database';
import { GetMyPlansDatabaseError } from '../errors';

export class GetMyPlansDatabase implements GetMyPlans {
  constructor(
    private readonly getDataBase: GetDatabase<
      Array<{ progress: number; startDate: string; title: string }>
    >,
  ) {}
  async get(): Promise<GetMyPlans.List<Date>> {
    const myPlans = [] as GetMyPlans.List<Date>;
    try {
      let data = await this.getDataBase.getData();

      data = data.filter((myPlan) => myPlan !== null);

      data.forEach((plan) => {
        myPlans.push({
          progress: plan.progress,
          startDate: new Date(plan.startDate),
          title: plan.title,
        });
      });

      return myPlans;
    } catch (error) {
      throw new GetMyPlansDatabaseError();
    }
  }
}
