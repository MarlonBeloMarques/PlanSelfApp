
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

jest.mock('react-native-linear-gradient', () => {});
jest.mock('react-native-shimmer-placeholder', () => {
  const React = require('react');
  const { View } = require('react-native');

  return {
    __esModule: true,
    default: jest
      .fn()
      .mockReturnValue(
        <View testID='loading_animation_id'></View>
      ),
  };
});

