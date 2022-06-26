export interface NavigateScreen {
  navigate(routeName: string, params?: GenericObject | undefined): void;
}
