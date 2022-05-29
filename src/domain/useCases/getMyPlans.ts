import { MyPlanModel } from '../models';

export interface GetMyPlans {
  get(): Promise<GetMyPlans.List>;
}

export namespace GetMyPlans {
  export type List = Array<MyPlanModel>;
}
