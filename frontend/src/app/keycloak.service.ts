import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private keycloak: Keycloak;
  private _profile: any;

  constructor() {
    this.keycloak = new Keycloak({
      url: 'http://localhost:8080',
      realm: 'school-realm',
      clientId: 'school-frontend'
    });
  }

  async init() {
    const authenticated = await this.keycloak.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
    });

    if (authenticated) {
      this._profile = await this.keycloak.loadUserProfile();
    }

    return authenticated;
  }

  login() {
    this.keycloak.login();
  }

  logout() {
    this.keycloak.logout({ redirectUri: window.location.origin });
  }

  get isLoggedIn() {
    return this.keycloak.authenticated;
  }

  get profile() {
    return this._profile;
  }

  get token() {
    return this.keycloak.token;
  }

  get roles() {
    return this.keycloak.tokenParsed?.realm_access?.roles || [];
  }

  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }
}
