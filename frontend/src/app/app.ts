import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  KEYCLOAK_EVENT_SIGNAL,
  KeycloakEventType,
  ReadyArgs,
  typeEventArgs,
} from 'keycloak-angular';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly keycloak = inject(Keycloak);

  protected authenticated = signal(false);
  protected userInfo = signal<any>(null);

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
      } else {
        this.userInfo.set(null);
      }
    });
  }

  async login(): Promise<void> {
    await this.keycloak.login();
  }

  logout(): void {
    this.keycloak.logout();
  }
}
