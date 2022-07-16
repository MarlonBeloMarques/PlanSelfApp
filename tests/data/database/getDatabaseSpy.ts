import { GetMyPlans } from '~/domain/useCases';
import { GetMyPlansDatabaseError } from '../../../src/data/errors';
import { GetDatabase } from '../../../src/data/database';

export default class GetDatabaseSpy
  implements GetDatabase<GetMyPlans.List<string>>
{
  private _myPlans: GetMyPlans.List<string> = [];
  private unexpectedErrorOccurred = false;

  async getData() {
    if (this.unexpectedErrorOccurred) throw new GetMyPlansDatabaseError();
    return this._myPlans;
  }

  completeWithMyPlans(myPlans: GetMyPlans.List<string>) {
    this._myPlans = myPlans;
  }

  completeWithUnexpectedError() {
    this.unexpectedErrorOccurred = true;
  }
}
