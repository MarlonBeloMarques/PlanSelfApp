import { GetMyPlans } from '~/domain/useCases';
import { GetMyPlansDatabaseError } from '../../../src/data/errors';
import { GetDatabase } from '../../../src/data/database';

export default class GetDatabaseSpy implements GetDatabase<GetMyPlans.List> {
  private _myPlans: GetMyPlans.List = [];
  private unexpectedErrorOccurred = false;

  async getData() {
    if (this.unexpectedErrorOccurred) throw new GetMyPlansDatabaseError();
    return this._myPlans;
  }

  completeWithMyPlans(myPlans: GetMyPlans.List) {
    this._myPlans = myPlans;
  }

  completeWithUnexpectedError() {
    this.unexpectedErrorOccurred = true;
  }

  get myPlans(): GetMyPlans.List {
    return this._myPlans;
  }
}
