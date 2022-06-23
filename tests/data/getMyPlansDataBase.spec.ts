import { GetMyPlans } from '~/domain/useCases';
import { GetDatabase } from '../../src/data/database/getDatabase';

describe('Data: GetMyPlansDatabase', () => {
  test('should get with GetMyPlans the returning of values with success', async () => {
    const myPlans = [
      { progress: 50, startDate: new Date(), title: 'any_title' },
    ];
    const getDatabase = new GetDatabaseSpy();
    getDatabase.completeWithMyPlans(myPlans);

    const sut = new GetMyPlansDatabase(getDatabase);
    const response = await sut.get();
    expect(response).toEqual(myPlans);
  });

  test('should get with GetMyPlans the returning GetMyPlansDatabaseError exception', async () => {
    const getDatabase = new GetDatabaseSpy();
    getDatabase.completeWithUnexpectedError();

    const sut = new GetMyPlansDatabase(getDatabase);

    try {
      await sut.get();
      throw new Error('something unexpected occurred in your test');
    } catch (error) {
      expect(error).toEqual(new GetMyPlansDatabaseError());
    }
  });
});

class GetMyPlansDatabase implements GetMyPlans {
  constructor(private readonly getDataBase: GetDatabase<GetMyPlans.List>) {}
  get(): Promise<GetMyPlans.List> {
    try {
      return this.getDataBase.getData();
    } catch (error) {
      throw new GetMyPlansDatabaseError();
    }
  }
}

class GetDatabaseSpy implements GetDatabase<GetMyPlans.List> {
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

export class GetMyPlansDatabaseError extends Error {
  constructor() {
    super();
    this.message =
      'An error occurred while trying to get your plans. Try again later.';
    this.name = 'GetMyPlansDatabaseError';
  }
}
