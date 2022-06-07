import { GetRemoteConfig } from '../../src/data/remoteConfig';
import { getStatusAddPlanRemoteConfig } from '../../src/data/useCases';

describe('Data: GetStatusAddPlanRemoteConfig', () => {
  test('should get with GetRemoteConfig call correct param', async () => {
    const remoteConfigSpy = new RemoteConfigSpy();
    const sut = new getStatusAddPlanRemoteConfig(remoteConfigSpy);
    await sut.get('addPlan');
    expect(remoteConfigSpy.param).toEqual('addPlan');
  });
});

class RemoteConfigSpy implements GetRemoteConfig {
  private _param!: string;

  async get(param: string): Promise<any> {
    this._param = param;
    return true;
  }

  get param(): string {
    return this._param;
  }
}
