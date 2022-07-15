import { GetMyPlansDatabaseError } from '../../../src/data/errors';
import { GetMyPlansDatabase } from '../../../src/data/useCases';
import GetDatabaseSpy from '../database/getDatabaseSpy';
import { myPlansFake } from '../helpers';

const myPlans = myPlansFake();

describe('Data: GetMyPlansDatabase', () => {
  test('should get with GetMyPlans the returning of values with success', async () => {
    const { sut, getDatabase } = makeSut();

    getDatabase.completeWithMyPlans(myPlans);
    const response = await sut.get();
    expect(response).toEqual(myPlans);
  });

  test('should get with GetMyPlans the returning GetMyPlansDatabaseError exception', async () => {
    const { sut, getDatabase } = makeSut();
    getDatabase.completeWithUnexpectedError();

    try {
      await sut.get();
      throw new Error('something unexpected occurred in your test');
    } catch (error) {
      expect(error).toEqual(new GetMyPlansDatabaseError());
    }
  });
});

const makeSut = () => {
  const getDatabase = new GetDatabaseSpy();

  const sut = new GetMyPlansDatabase(getDatabase);

  return { sut, getDatabase };
};
