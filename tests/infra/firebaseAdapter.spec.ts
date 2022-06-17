import firebaseRemoteConfig, {
  FirebaseRemoteConfigTypes,
} from '@react-native-firebase/remote-config';
import { GetRemoteConfig } from '../../src/data/remoteConfig';

jest.mock('@react-native-firebase/remote-config', () => () => ({
  setDefaults: () => jest.fn(),
  fetchAndActivate: () => jest.fn().mockReturnValueOnce(false),
  getValue: () => jest.fn(),
}));

describe('Infra: FirebaseAdapter', () => {
  test('should start the default remote configuration correctly', async () => {
    const remoteConfig = firebaseRemoteConfig();

    const remoteConfigMocked = remoteConfig as jest.Mocked<typeof remoteConfig>;

    const setDefaultsSpy = jest
      .spyOn(remoteConfigMocked, 'setDefaults')
      .mockImplementationOnce(() => Promise.resolve(null));

    const sut = new FirebaseAdapter(remoteConfig);

    await sut.startConfigDefault();

    expect(setDefaultsSpy).toHaveBeenCalledWith({ addPlan: true });
  });

  test('should fetch and active the values of remote config returning result with success', async () => {
    const remoteConfig = firebaseRemoteConfig();

    const remoteConfigMocked = remoteConfig as jest.Mocked<typeof remoteConfig>;

    const fetchAndActivateResponse = true;

    const fetchAndActivateSpy = jest
      .spyOn(remoteConfigMocked, 'fetchAndActivate')
      .mockResolvedValueOnce(fetchAndActivateResponse);

    const sut = new FirebaseAdapter(remoteConfig);

    const result = await sut.fetchAndActivate();

    expect(fetchAndActivateSpy).toHaveBeenCalledTimes(1);
    expect(result).toEqual(fetchAndActivateResponse);
  });

  test('should get values of remote config reading values and returning with success', async () => {
    const remoteConfig = firebaseRemoteConfig();

    const remoteConfigMocked = remoteConfig as jest.Mocked<typeof remoteConfig>;

    const valueObject = {
      param: 'addPlan',
      result: false,
    };

    const getValueSpy = jest
      .spyOn(remoteConfigMocked, 'getValue')
      .mockReturnValueOnce({
        asBoolean: () => valueObject.result,
      } as FirebaseRemoteConfigTypes.ConfigValue);

    const sut = new FirebaseAdapter(remoteConfig);

    const value = await sut.get(valueObject.param);

    expect(getValueSpy).toHaveBeenCalledTimes(1);
    expect(value.asBoolean()).toEqual(valueObject.result);
  });
});

class FirebaseAdapter
  implements GetRemoteConfig<FirebaseRemoteConfigTypes.ConfigValue>
{
  constructor(readonly remoteConfig: FirebaseRemoteConfigTypes.Module) {}

  async startConfigDefault(): Promise<void> {
    await this.startRemoteConfigDefault();
  }

  async get(param: string) {
    return this.remoteConfig.getValue(param);
  }

  private async startRemoteConfigDefault(): Promise<void> {
    await this.remoteConfig.setDefaults({
      addPlan: true,
    });
  }

  async fetchAndActivate(): Promise<boolean> {
    return await this.remoteConfig.fetchAndActivate();
  }
}
