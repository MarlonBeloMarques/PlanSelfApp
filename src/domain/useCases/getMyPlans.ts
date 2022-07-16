import { MyPlanModel } from '../models';

export interface GetMyPlans {
  get(reference: GetMyPlans.Reference): Promise<GetMyPlans.List<Date>>;
}

export namespace GetMyPlans {
  export type MyPlan<StartDateType> = MyPlanModel<StartDateType>;
  export type List<StartDateType> = Array<MyPlanModel<StartDateType>>;
  export type Reference = {
    user: User;
  };
  type User = {
    myPlans: string;
  };
}
