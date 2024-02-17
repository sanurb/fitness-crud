import { ApplicationConfig } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { appRoutes } from './app.routes';
import { APP_CONFIG } from '@fitness-crud/shared/util-config';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: APP_CONFIG, useValue: environment },
    provideHttpClient(withFetch()),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
  ],
};
