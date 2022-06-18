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
    const response = await sut.get({ user: { myPlans: 'myPlans' } });
    expect(response).toEqual(myPlans);
  });

  test('should get with GetMyPlans the returning GetMyPlansDatabaseError exception', async () => {
    const getDatabase = new GetDatabaseSpy();
    getDatabase.completeWithUnexpectedError();

    const sut = new GetMyPlansDatabase(getDatabase);

    try {
      await sut.get({ user: { myPlans: 'myPlans' } });
      throw new Error('something unexpected occurred in your test');
    } catch (error) {
      expect(error).toEqual(new GetMyPlansDatabaseError());
    }
  });

  test('should get with GetMyPlans call correct param', async () => {
    const myPlans = [
      { progress: 50, startDate: new Date(), title: 'any_title' },
    ];
    const getDatabase = new GetDatabaseSpy();
    getDatabase.completeWithMyPlans(myPlans);

    const reference = { user: { myPlans: 'myPlans' } } as GetMyPlans.Reference;
    const sut = new GetMyPlansDatabase(getDatabase);
    await sut.get(reference);
    expect(reference).toEqual(getDatabase.reference);
  });
});

class GetMyPlansDatabase implements GetMyPlans {
  constructor(private readonly getDataBase: GetDatabase<GetMyPlans.List>) {}
  get(reference: GetMyPlans.Reference): Promise<GetMyPlans.List> {
    try {
      return this.getDataBase.getData(reference);
    } catch (error) {
      throw new GetMyPlansDatabaseError();
    }
  }
}

class GetDatabaseSpy implements GetDatabase<GetMyPlans.List> {
  private _myPlans: GetMyPlans.List = [];
  private _reference = {} as GetMyPlans.Reference;
  private unexpectedErrorOccurred = false;

  async getData(reference: GetMyPlans.Reference) {
    if (this.unexpectedErrorOccurred) throw new GetMyPlansDatabaseError();
    this._reference = reference;
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

  get reference(): GetMyPlans.Reference {
    return this._reference;
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
