import firebaseRemoteConfig, {
  FirebaseRemoteConfigTypes,
} from '@react-native-firebase/remote-config';
import { GetRemoteConfig } from '../../src/data/remoteConfig';

jest.mock('@react-native-firebase/remote-config', () => () => ({
  setDefaults: () => jest.fn(),
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
});

class FirebaseAdapter implements GetRemoteConfig {
  constructor(readonly remoteConfig: FirebaseRemoteConfigTypes.Module) {}

  async startConfigDefault(): Promise<void> {
    await this.startRemoteConfigDefault();
  }

  async get(param: string): Promise<any> {
    return param;
  }

  private async startRemoteConfigDefault(): Promise<void> {
    await this.remoteConfig.setDefaults({
      addPlan: true,
    });
  }
}
