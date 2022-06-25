import { GetMyPlansDatabaseError } from '../../../src/data/errors';
import { GetMyPlansDatabase } from '../../../src/data/useCases';
import GetDatabaseSpy from '../database/getDatabaseSpy';

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
