import React from 'react';
import { render } from '@testing-library/react-native';
import { GetMyPlansDatabase } from '~/data/useCases';
import { Activity } from '~/presentation/screens';
import GetDatabaseSpy from '../../data/database/getDatabaseSpy';

describe('Presentation: Activity', () => {
  test('should call getMyPlans of GetMyPlansDatabase only once', async () => {
    const getDatabase = new GetDatabaseSpy();
    const getMyPlans = new GetMyPlansDatabase(getDatabase);

    const getMyPlansSpy = jest.spyOn(getMyPlans, 'get');

    render(<Activity getMyPlans={getMyPlans} />);

    expect(getMyPlansSpy).toHaveBeenCalledTimes(1);
  });
});
