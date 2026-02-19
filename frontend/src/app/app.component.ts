import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeycloakService } from './keycloak.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public keycloak: KeycloakService) {}

  login() {
    this.keycloak.login();
  }

  logout() {
    this.keycloak.logout();
  }
}
