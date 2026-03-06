import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  KEYCLOAK_EVENT_SIGNAL,
  KeycloakEventType,
  ReadyArgs,
  typeEventArgs,
} from 'keycloak-angular';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, RouterLink],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private readonly keycloak = inject(Keycloak);

  protected authenticated = signal(false);
  protected userInfo = signal<any>(null);
  protected isAdmin = signal(false);

  protected status = signal(localStorage.getItem('global_status') || 'Willkommen zum TEKO Security Portal!');
  protected newStatus = signal(this.status());

  constructor() {
    const keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL);

    effect(async () => {
      const keycloakEvent = keycloakSignal();

      if (keycloakEvent.type === KeycloakEventType.Ready) {
        this.authenticated.set(typeEventArgs<ReadyArgs>(keycloakEvent.args));
      }

      if (keycloakEvent.type === KeycloakEventType.AuthSuccess) {
        this.authenticated.set(true);
      }

      if (keycloakEvent.type === KeycloakEventType.AuthLogout) {
        this.authenticated.set(false);
      }

      if (this.authenticated()) {
        const profile = this.keycloak.idTokenParsed ?? null;
        this.userInfo.set(profile);
        this.isAdmin.set(this.keycloak.hasRealmRole('admin'));
      } else {
        this.userInfo.set(null);
        this.isAdmin.set(false);
      }
    });
  }

  async login(): Promise<void> {
    await this.keycloak.login();
  }

  logout(): void {
    this.keycloak.logout();
  }

  updateStatus(): void {
    if (this.isAdmin()) {
      const updatedValue = this.newStatus();
      this.status.set(updatedValue);
      localStorage.setItem('global_status', updatedValue);
    }
  }
}
