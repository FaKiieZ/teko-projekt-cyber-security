# IAM System -- Keycloak & Angular Demo

Dieses Projekt demonstriert die Implementierung eines **Identity and Access Management (IAM)** Systems. Es nutzt **Keycloak** als Identity Provider und eine **Angular 21** Anwendung als Client, um moderne Authentifizierungs- und Autorisierungsmuster zu zeigen.

## Projektstruktur

- `/keycloak`: Docker-Compose Setup und Realm-Import-Konfiguration (`school-realm`).
- `/frontend`: Angular-21-Anwendung mit `keycloak-angular` Integration und Tailwind CSS v4 Styling.

## Voraussetzungen

- **Docker** (Desktop oder Engine)
- **Node.js** (^20.19.0 || ^22.12.0 || ^24.0.0) & **npm**

---

## 1. Keycloak (IAM) starten

Das System ist vorkonfiguriert (`school-realm.json`), sodass beim Start automatisch der Realm, der Client und Demo-Benutzer erstellt werden.

```bash
cd keycloak
docker compose up -d
```

- **Admin-Konsole:** http://localhost:8080 (Login: `admin` / `admin`)
- **Realm:** `school-realm`
- **Client ID:** `demo-frontend`

---

## 2. Frontend starten

```bash
cd frontend
npm install
npm start
```

Die Anwendung ist unter **http://localhost:4200** erreichbar.

---

## 3. Demo-Szenarien & Features

Das Projekt demonstriert folgende Kernkonzepte der Cyber Security:

### 🔐 Authentifizierung (OIDC/OAuth 2.0)

- **Single Sign-On (SSO):** Zentrale Anmeldung über Keycloak.
- **Silent Check-SSO:** Die Anwendung prüft beim Laden im Hintergrund die Session, ohne die UX zu unterbrechen.
- **Identity Propagation:** Benutzerprofile (Name, E-Mail) werden sicher aus dem ID-Token extrahiert.

### 🛡️ Autorisierung (RBAC)

Zwei vorkonfigurierten Accounts demonstrieren die Rollenverteilung:

| Benutzer  | Passwort | Rollen          | Berechtigungen                                                   |
| :-------- | :------- | :-------------- | :--------------------------------------------------------------- |
| **alice** | `alice`  | `user`          | Kann den globalen Status sehen.                                  |
| **bob**   | `bob`    | `admin`, `user` | Kann Status ändern & hat Zugriff auf den "Secret Admin"-Bereich. |

### 🚀 Implementierte Funktionen

- **Globaler Status:** Eine für alle sichtbare Nachricht, die nur von Administratoren geändert werden kann (simulierte Persistenz via `localStorage`).
- **Secret Admin Area:** Eine dedizierte Route (`/secret-admin`), die durch einen **Angular Functional Guard** geschützt ist. Nur Benutzer mit der Realm-Rolle `admin` können diese betreten.
- **Fehlerbehandlung:** Unbefugte Zugriffsversuche auf geschützte Routen führen zu einer automatischen Umleitung auf das Dashboard.

---

## Sicherheitshinweis

- Das Projekt nutzt den **Keycloak `start-dev` Modus** (HTTP) und dient ausschließlich **Schulungs- und Demonstrationszwecken**.
- In produktiven Umgebungen ist **HTTPS** zwingend erforderlich und Client-Secrets sollten (bei Confidential Clients) niemals im Frontend exponiert werden.
