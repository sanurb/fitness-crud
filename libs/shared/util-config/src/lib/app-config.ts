import { InjectionToken } from '@angular/core';

export type AppConfig = {
  production: false;
  apiKey: string;
  apiHost: string;
};

export const APP_CONFIG = new InjectionToken<AppConfig>('Application config');
