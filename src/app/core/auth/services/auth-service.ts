import {inject, Injectable} from '@angular/core';
import {UserState} from '../models/user.state';
import {StateStoreService} from '@rssbr/state-store';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends StateStoreService<UserState> {

  private readonly keycloak = inject(Keycloak);

  constructor() {
    super('angular_keycloak', 'login', {
      useLocalStorage: true
    });
  }

  public override initialState(): UserState {
    return {
      roles: [],
      isAuthenticated: false
    };
  }

  public isAuthenticated() {
    return this.keycloak.authenticated;
  }

  /**
   * Este método agora serve para carregar os dados no seu StateStore
   * após a inicialização que ocorrerá no app.config.ts
   */
  public async syncUser(): Promise<void> {
    if (this.keycloak.authenticated) {
      const token: any = this.keycloak.tokenParsed;

      this.updatePartialState({
        id: token.sub,
        username: token.preferred_username,
        email: token.email,
        firstName: token.given_name,
        lastName: token.family_name,
        roles: this.keycloak.realmAccess?.roles || [],
        isAuthenticated: true
      });

      console.log('User Sync concluído com sucesso via Token Claims!');
    }
  }

  public async login(): Promise<void> {
    await this.keycloak.login();
  }

  public async logout(): Promise<void> {
    await this.keycloak.logout({ redirectUri: window.location.origin });
    this.updateState(this.initialState());
  }
}
