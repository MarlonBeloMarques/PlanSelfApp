import firebaseRemoteConfig, {
  FirebaseRemoteConfigTypes,
} from '@react-native-firebase/remote-config';
import firebaseDatabase, {
  FirebaseDatabaseTypes,
} from '@react-native-firebase/database';
import { GetDatabase } from '../../src/data/database';
import { GetRemoteConfig } from '../../src/data/remoteConfig';

jest.mock('@react-native-firebase/remote-config', () => () => ({
  setDefaults: () => jest.fn(),
  fetchAndActivate: () => jest.fn().mockReturnValueOnce(false),
  getValue: () => jest.fn(),
}));

jest.mock('@react-native-firebase/database', () => () => ({}));

describe('Infra: FirebaseAdapter', () => {
  test('should start the default remote configuration correctly', async () => {
    const remoteConfig = firebaseRemoteConfig();
    const database = firebaseDatabase();

    const remoteConfigMocked = remoteConfig as jest.Mocked<typeof remoteConfig>;

    const setDefaultsSpy = jest
      .spyOn(remoteConfigMocked, 'setDefaults')
      .mockImplementationOnce(() => Promise.resolve(null));

    const sut = new FirebaseAdapter(remoteConfig, database);

    await sut.startConfigDefault();

    expect(setDefaultsSpy).toHaveBeenCalledWith({ addPlan: true });
  });

  test('should fetch and active the values of remote config returning result with success', async () => {
    const remoteConfig = firebaseRemoteConfig();
    const database = firebaseDatabase();

    const remoteConfigMocked = remoteConfig as jest.Mocked<typeof remoteConfig>;

    const fetchAndActivateResponse = true;

    const fetchAndActivateSpy = jest
      .spyOn(remoteConfigMocked, 'fetchAndActivate')
      .mockResolvedValueOnce(fetchAndActivateResponse);

    const sut = new FirebaseAdapter(remoteConfig, database);

    const result = await sut.fetchAndActivate();

    expect(fetchAndActivateSpy).toHaveBeenCalledTimes(1);
    expect(result).toEqual(fetchAndActivateResponse);
  });

  test('should get values of remote config reading values and returning with success', async () => {
    const remoteConfig = firebaseRemoteConfig();
    const database = firebaseDatabase();

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

    const sut = new FirebaseAdapter(remoteConfig, database);

    const value = await sut.getConfig(valueObject.param);

    expect(getValueSpy).toHaveBeenCalledTimes(1);
    expect(value.asBoolean()).toEqual(valueObject.result);
  });

  test('should update path for the reference of database with success when call getData', async () => {
    const remoteConfig = firebaseRemoteConfig();
    const database = firebaseDatabase();

    const sut = new FirebaseAdapter(remoteConfig, database);

    await sut.getData({ user: 'user', myPlans: 'myPlans' });
    expect(sut.path).toEqual('user/myPlans/');
  });
});

class FirebaseAdapter
  implements
    GetRemoteConfig<FirebaseRemoteConfigTypes.ConfigValue>,
    GetDatabase
{
  path = '';
  constructor(
    readonly remoteConfig: FirebaseRemoteConfigTypes.Module,
    readonly database: FirebaseDatabaseTypes.Module,
  ) {}

  async startConfigDefault(): Promise<void> {
    await this.startRemoteConfigDefault();
  }

  async getConfig(param: string) {
    return this.remoteConfig.getValue(param);
  }

  async getData(reference: GetDatabase.Reference): Promise<any> {
    this.convertToPath(reference);
  }

  private convertToPath(reference: GetDatabase.Reference): string {
    this.path = '';
    Object.entries(reference).forEach((line) => {
      this.path += `${line[1]}/`;
    });
    return this.path;
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
