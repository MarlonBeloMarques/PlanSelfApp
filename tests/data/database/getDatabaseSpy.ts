import { GetMyPlansDatabaseError } from '../../../src/data/errors';
import { GetDatabase } from '../../../src/data/database';

export type MyPlan = { progress: number; startDate: string; title: string };

export default class GetDatabaseSpy implements GetDatabase<Array<MyPlan>> {
  private _myPlans: Array<MyPlan> = [];
  private unexpectedErrorOccurred = false;

  async getData() {
    if (this.unexpectedErrorOccurred) throw new GetMyPlansDatabaseError();
    return this._myPlans;
  }

  completeWithMyPlans(myPlans: Array<MyPlan>) {
    this._myPlans = myPlans;
  }

  completeWithUnexpectedError() {
    this.unexpectedErrorOccurred = true;
  }
}
