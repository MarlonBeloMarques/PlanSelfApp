import { GetMyPlans } from '~/domain/useCases';
import { GetMyPlansDatabaseError } from '../../../src/data/errors';
import { GetMyPlansDatabase } from '../../../src/data/useCases';
import GetDatabaseSpy from '../database/getDatabaseSpy';
import { myPlansFake } from '../helpers';

const myPlans = myPlansFake(false);

describe('Data: GetMyPlansDatabase', () => {
  test('should get with GetMyPlans the returning of values with success', async () => {
    const { sut, getDatabase } = makeSut();

    getDatabase.completeWithMyPlans(myPlans as GetMyPlans.List<string>);
    const response = await sut.get();

    response.forEach((plan) => {
      expect(plan).toEqual({
        progress: plan.progress,
        startDate: new Date(plan.startDate),
        title: plan.title,
      });
    });
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

  test('should get with GetMyPlans the return of values without nulls', async () => {
    const { sut, getDatabase } = makeSut();

    getDatabase.completeWithMyPlans([
      null as unknown as GetMyPlans.MyPlan<string>,
      ...(myPlans as GetMyPlans.List<string>),
    ]);
    const response = await sut.get();
    expect(response).not.toContain(null);
  });
});

const makeSut = () => {
  const getDatabase = new GetDatabaseSpy();

  const sut = new GetMyPlansDatabase(getDatabase);

  return { sut, getDatabase };
};
