import { NavigationContainerRef } from '@react-navigation/native';

let navigator: NavigationContainerRef<any>;

const setTopLevelNavigator = (
  navigatorRef: NavigationContainerRef<any>,
): void => {
  navigator = navigatorRef;
};

export { setTopLevelNavigator, navigator };

export { Routes } from './routes';
export { default as Navigation } from './navigation';
