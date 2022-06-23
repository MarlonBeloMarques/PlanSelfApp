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

jest.mock('@react-native-firebase/database', () => () => ({
  ref: () => {
    return { once: () => jest.fn() };
  },
}));

describe('Infra: FirebaseAdapter', () => {
  test('should start the default remote configuration correctly', async () => {
    const remoteConfig = firebaseRemoteConfig();
    const database = firebaseDatabase();
    const databaseReference = database.ref();

    const remoteConfigMocked = remoteConfig as jest.Mocked<typeof remoteConfig>;

    const setDefaultsSpy = jest
      .spyOn(remoteConfigMocked, 'setDefaults')
      .mockImplementationOnce(() => Promise.resolve(null));

    const sut = new FirebaseAdapter(remoteConfig, databaseReference);

    await sut.startConfigDefault();

    expect(setDefaultsSpy).toHaveBeenCalledWith({ addPlan: true });
  });

  test('should fetch and active the values of remote config returning result with success', async () => {
    const remoteConfig = firebaseRemoteConfig();
    const database = firebaseDatabase();
    const databaseReference = database.ref();

    const remoteConfigMocked = remoteConfig as jest.Mocked<typeof remoteConfig>;

    const fetchAndActivateResponse = true;

    const fetchAndActivateSpy = jest
      .spyOn(remoteConfigMocked, 'fetchAndActivate')
      .mockResolvedValueOnce(fetchAndActivateResponse);

    const sut = new FirebaseAdapter(remoteConfig, databaseReference);

    const result = await sut.fetchAndActivate();

    expect(fetchAndActivateSpy).toHaveBeenCalledTimes(1);
    expect(result).toEqual(fetchAndActivateResponse);
  });

  test('should get values of remote config reading values and returning with success', async () => {
    const remoteConfig = firebaseRemoteConfig();
    const database = firebaseDatabase();
    const databaseReference = database.ref();

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

    const sut = new FirebaseAdapter(remoteConfig, databaseReference);

    const value = await sut.getConfig(valueObject.param);

    expect(getValueSpy).toHaveBeenCalledTimes(1);
    expect(value.asBoolean()).toEqual(valueObject.result);
  });

  test('should update path for the reference of database with success when call getData', async () => {
    const remoteConfig = firebaseRemoteConfig();
    const database = firebaseDatabase();
    const databaseReference = database.ref();

    const sut = new FirebaseAdapter(remoteConfig, databaseReference);

    await sut.getData({ user: 'user', myPlans: 'myPlans' });
    expect(sut.path).toEqual('user/myPlans/');
  });

  test('should call getData using reference of Database returning value with success', async () => {
    const remoteConfig = firebaseRemoteConfig();
    const database = firebaseDatabase();
    const databaseReference = database.ref();

    const getDataResponse = {
      progress: 50,
      startDate: '24/09/1997',
      title: 'any_title',
    };

    jest.spyOn(databaseReference, 'once').mockReturnValueOnce({
      val: () => getDataResponse,
    } as unknown as Promise<FirebaseDatabaseTypes.DataSnapshot>);

    const sut = new FirebaseAdapter(remoteConfig, databaseReference);

    const data = await sut.getData({ user: 'user', myPlans: 'myPlans' });
    expect(data?.val()).toEqual(getDataResponse);
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
    readonly databaseReference: FirebaseDatabaseTypes.Reference,
  ) {}

  async startConfigDefault(): Promise<void> {
    await this.startRemoteConfigDefault();
  }

  async getConfig(param: string) {
    return this.remoteConfig.getValue(param);
  }

  async getData(
    reference: GetDatabase.Reference,
  ): Promise<FirebaseDatabaseTypes.DataSnapshot | undefined> {
    this.convertToPath(reference);

    try {
      const snapshot = await this.databaseReference.once('value');
      return snapshot;
    } catch (error) {}
  }

  private convertToPath(reference: GetDatabase.Reference) {
    this.path = '';
    Object.entries(reference).forEach((line) => {
      this.path += `${line[1]}/`;
    });
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
