import { GetStatusAddPlanRemoteConfigError } from '../../../src/data/errors';
import { getStatusAddPlanRemoteConfig } from '../../../src/data/useCases';
import { RemoteConfigSpy } from '../remoteConfig/remoteConfigSpy';

describe('Data: GetStatusAddPlanRemoteConfig', () => {
  test('should get with GetRemoteConfig call correct param', async () => {
    const { sut, remoteConfigSpy } = makeSut();
    await sut.get('addPlan');
    expect(remoteConfigSpy.param).toEqual('addPlan');
  });

  test('should get with GetRemoteConfig returning successfully', async () => {
    const { sut, remoteConfigSpy } = makeSut();
    remoteConfigSpy.completeWithStatus(true);
    const result = await sut.get('addPlan');
    expect(result).toBe(true);
  });

  test('should return exception if not get with success via GetRemoteConfig', async () => {
    const { sut, remoteConfigSpy } = makeSut();
    remoteConfigSpy.completeWithStatus(true);
    remoteConfigSpy.completeWithUnexpectedError();

    try {
      await sut.get('addPlan');
      throw new Error('something unexpected occurred in your test');
    } catch (error) {
      expect(error).toEqual(new GetStatusAddPlanRemoteConfigError());
    }
  });
});

const makeSut = () => {
  const remoteConfigSpy = new RemoteConfigSpy();
  const sut = new getStatusAddPlanRemoteConfig(remoteConfigSpy);

  return { sut, remoteConfigSpy };
};
