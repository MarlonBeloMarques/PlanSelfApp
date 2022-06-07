import { GetRemoteConfig } from '../../src/data/remoteConfig';
import {
  UnexpectedError,
  getStatusAddPlanRemoteConfig,
} from '../../src/data/useCases';

describe('Data: GetStatusAddPlanRemoteConfig', () => {
  test('should get with GetRemoteConfig call correct param', async () => {
    const remoteConfigSpy = new RemoteConfigSpy();
    const sut = new getStatusAddPlanRemoteConfig(remoteConfigSpy);
    await sut.get('addPlan');
    expect(remoteConfigSpy.param).toEqual('addPlan');
  });

  test('should get with GetRemoteConfig returning successfully', async () => {
    const remoteConfigSpy = new RemoteConfigSpy();
    const sut = new getStatusAddPlanRemoteConfig(remoteConfigSpy);
    remoteConfigSpy.completeWithStatus(true);
    const result = await sut.get('addPlan');
    expect(result).toBe(true);
  });

  test('should return exception if not get with success via GetRemoteConfig', async () => {
    const remoteConfigSpy = new RemoteConfigSpy();
    const sut = new getStatusAddPlanRemoteConfig(remoteConfigSpy);
    remoteConfigSpy.completeWithStatus(true);
    remoteConfigSpy.completeWithUnexpectedError();

    try {
      await sut.get('addPlan');
      throw new Error('something unexpected occurred in your test');
    } catch (error) {
      expect(error).toEqual(new UnexpectedError());
    }
  });
});

class RemoteConfigSpy implements GetRemoteConfig {
  private _param!: string;
  private result = false;
  private unexpectedErrorOccurred = false;

  async get(param: string): Promise<any> {
    if (this.unexpectedErrorOccurred) throw new UnexpectedError();
    this._param = param;
    return this.result;
  }

  get param(): string {
    return this._param;
  }

  completeWithStatus(status: boolean) {
    this.result = status;
  }

  completeWithUnexpectedError() {
    this.unexpectedErrorOccurred = true;
  }
}
