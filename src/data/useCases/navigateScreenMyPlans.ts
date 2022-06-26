import { Navigate } from '~/domain/useCases';
import { Routes } from '~/main/navigation';
import { RouteParams } from '../../domain/models';
import { NavigateScreen } from '../navigate';

export class NavigateScreenMyPlans implements Navigate {
  constructor(readonly navigateScreen: NavigateScreen) {}

  navigateToMyPlans(params?: RouteParams | undefined): void {
    this.navigateScreen.navigate(Routes.ACTIVITY, params);
  }
}
