import { GetMyPlans } from '~/domain/useCases';
import { GetDatabase } from '../../src/data/database/getDatabase';

describe('Data: GetMyPlansDatabase', () => {
  test('should get with GetMyPlans the returning of values with success', async () => {
    const myPlans = [
      { progress: 50, startDate: new Date(), title: 'any_title' },
    ];
    const getDatabase = new GetDatabaseSpy();
    getDatabase.myPlans = myPlans;

    const sut = new GetMyPlansDatabase(getDatabase);
    const response = await sut.get();
    expect(getDatabase.myPlans).toEqual(response);
  });
});

class GetMyPlansDatabase implements GetMyPlans {
  constructor(private readonly getDataBase: GetDatabase<GetMyPlans.List>) {}

  async get() {
    return this.getDataBase.get();
  }
}

class GetDatabaseSpy implements GetDatabase<GetMyPlans.List> {
  myPlans: GetMyPlans.List = [];
  async get() {
    return this.myPlans;
  }
}
