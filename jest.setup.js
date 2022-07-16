jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('./src/presentation/assets/images');
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

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
