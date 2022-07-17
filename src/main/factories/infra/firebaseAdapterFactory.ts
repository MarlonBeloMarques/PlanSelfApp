import firebaseRemoteConfig from '@react-native-firebase/remote-config';
import firebaseDatabase from '@react-native-firebase/database';
import { FirebaseAdapter } from '~/infra';

export const startFirebaseRemoteConfig = async (firebase: FirebaseAdapter) => {
  await firebase.startConfigDefault();
  await firebase.fetchAndActivate();
};

export const firebaseAdapterFactory = () => {
  const remoteConfig = firebaseRemoteConfig();
  const path = FirebaseAdapter.convertToPath({
    user: 'user',
    myPlans: 'myPlans',
  });

  const database = firebaseDatabase();
  const databaseReference = database.ref(path);

  return new FirebaseAdapter(remoteConfig, databaseReference);
};
