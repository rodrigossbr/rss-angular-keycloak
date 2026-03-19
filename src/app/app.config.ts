import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {AutoRefreshTokenService, provideKeycloak, UserActivityService, withAutoRefreshToken} from 'keycloak-angular';
import {AuthService} from './core';
import {environment} from '@env/environment';
import {firstValueFrom, timer} from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    AutoRefreshTokenService,
    UserActivityService,
    provideKeycloak({
      config: environment.keycloak,
      initOptions: {
        onLoad: 'check-sso',
        checkLoginIframe: false,
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
        enableLogging: true,
        responseMode: 'query',
        flow: 'standard'
      },
      features: [
        withAutoRefreshToken()
      ]
    }),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideAppInitializer(async () => {
      const authService = inject(AuthService);

      // Temporizador apenas pq deve aguardar subir o container do docker local,
      // pode ser removido quando não usar o docker local
      await firstValueFrom(timer(500));

      await authService.syncUser();
    }),
  ]
};
