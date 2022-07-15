import { MyPlanModel } from '../models';

export interface GetMyPlans {
  get(reference: GetMyPlans.Reference): Promise<GetMyPlans.List>;
}

export namespace GetMyPlans {
  export type MyPlan = MyPlanModel;
  export type List = Array<MyPlanModel>;
  export type Reference = {
    user: User;
  };
  type User = {
    myPlans: string;
  };
}
