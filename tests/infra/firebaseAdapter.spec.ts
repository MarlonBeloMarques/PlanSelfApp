import firebaseRemoteConfig, {
  FirebaseRemoteConfigTypes,
} from '@react-native-firebase/remote-config';
import firebaseDatabase, {
  FirebaseDatabaseTypes,
} from '@react-native-firebase/database';
import FirebaseAdapter from '../../src/infra/firebaseAdapter';

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
    const { sut, setDefaultsSpy } = makeSut({} as MakeSutParams);
    await sut.startConfigDefault();

    expect(setDefaultsSpy).toHaveBeenCalledWith({ addPlan: true });
  });

  test('should fetch and active the values of remote config returning result with success', async () => {
    const fetchAndActivateResponse = true;
    const { sut, fetchAndActivateSpy } = makeSut({
      fetchAndActivateResponse,
    } as MakeSutParams);
    const result = await sut.fetchAndActivate();

    expect(fetchAndActivateSpy).toHaveBeenCalledTimes(1);
    expect(result).toEqual(fetchAndActivateResponse);
  });

  test('should get values of remote config reading values and returning with success', async () => {
    const valueObject: ValueObject = { param: 'addPlan', result: false };
    const { sut, getValueSpy } = makeSut({
      valueObject,
    } as MakeSutParams);
    const value = await sut.getConfig(valueObject.param);

    expect(getValueSpy).toHaveBeenCalledTimes(1);
    expect(value.asBoolean()).toEqual(valueObject.result);
  });

  test('should update path for the reference of database with success when call getData', async () => {
    const path = FirebaseAdapter.convertToPath({
      user: 'user',
      myPlans: 'myPlans',
    });

    expect(path).toEqual('user/myPlans/');
  });

  test('should call getData using reference of Database returning value with success', async () => {
    const path = FirebaseAdapter.convertToPath({
      user: 'user',
      myPlans: 'myPlans',
    });

    const dataResponse: DataResponse = {
      progress: 50,
      startDate: '24/09/1997',
      title: 'any_title',
    };

    const { sut } = makeSut({ path, dataResponse } as MakeSutParams);

    const data = await sut.getData();
    expect(data?.val()).toEqual(dataResponse);
  });
});

type MakeSutParams = {
  fetchAndActivateResponse: boolean;
  valueObject?: ValueObject;
  path: string;
  dataResponse?: DataResponse;
};

const makeSut = ({
  fetchAndActivateResponse = false,
  valueObject = {} as ValueObject,
  path = '',
  dataResponse = {} as DataResponse,
}: MakeSutParams) => {
  let getValueSpy;

  const remoteConfig = firebaseRemoteConfig();
  const database = firebaseDatabase();
  const databaseReference = database.ref(path);

  const remoteConfigMocked = remoteConfig as jest.Mocked<typeof remoteConfig>;

  const setDefaultsSpy = jest
    .spyOn(remoteConfigMocked, 'setDefaults')
    .mockImplementationOnce(() => Promise.resolve(null));

  const fetchAndActivateSpy = jest
    .spyOn(remoteConfigMocked, 'fetchAndActivate')
    .mockResolvedValueOnce(fetchAndActivateResponse);

  if (valueObject) {
    getValueSpy = jest
      .spyOn(remoteConfigMocked, 'getValue')
      .mockReturnValueOnce({
        asBoolean: () => valueObject.result,
      } as FirebaseRemoteConfigTypes.ConfigValue);
  }

  jest.spyOn(databaseReference, 'once').mockReturnValueOnce({
    val: () => dataResponse,
  } as unknown as Promise<FirebaseDatabaseTypes.DataSnapshot>);

  const sut = new FirebaseAdapter(remoteConfig, databaseReference);

  return { sut, setDefaultsSpy, fetchAndActivateSpy, getValueSpy };
};

type ValueObject = {
  param: string;
  result: boolean;
};

type DataResponse = {
  progress: number;
  startDate: string;
  title: string;
};
