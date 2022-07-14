import { useEffect, useState } from 'react';
import { NavigationContainerRef } from '@react-navigation/native';
import { navigator } from '../navigation';

const useNavigate = (): NavigationContainerRef<any> => {
  const [navigate, setNavigate] = useState<NavigationContainerRef<any>>(
    {} as NavigationContainerRef<any>,
  );

  useEffect(() => {
    setNavigate(navigator);
  }, []);

  return navigate;
};

export default useNavigate;
