# IAM System -- Keycloak & Angular Demo

Dieses Projekt demonstriert, wie ein **Identity and Access Management
(IAM)** System mit **Keycloak** als Identity Provider und einer
**Angular** Anwendung als Client implementiert werden kann.

## Projektstruktur

- `/keycloak`: Enthält das Docker-Compose Setup sowie die
  Realm-Import-Konfiguration.
- `/frontend`: Eine Angular-21-Anwendung mit Keycloak-Integration und
  Styling mit Tailwind CSS v4.

## Voraussetzungen

- Docker
  - Windows: [Docker Desktop](https://www.docker.com/products/docker-desktop/)
  - Linux: [Docker](https://docs.docker.com/engine/install/)
- [Node.js](https://nodejs.org/) (Version 18 oder höher)
- npm (wird mit Node.js installiert)

---

## 1. Keycloak (IAM) einrichten

Das IAM-System ist so vorkonfiguriert, dass beim Start automatisch ein
Realm, ein Client und Demo-Benutzer erstellt werden.

### Service starten

In das Keycloak-Verzeichnis wechseln und docker compose ausführen:

```bash
cd keycloak
docker compose up -d
```

### Zugriff auf Keycloak

- **Admin-Konsole:** http://localhost:8080
- **Admin-Zugangsdaten:** `admin` / `admin`
- **Realm:** `school-realm`

---

## 2. Angular-Anwendung einrichten

Das Frontend wurde mit Angular 21 erstellt und verwendet `keycloak-js`
für die Authentifizierung.

### Installation

In das Frontend-Verzeichnis wechseln und die Abhängigkeiten
installieren:

```bash
cd frontend
npm install
```

### Anwendung starten

```bash
npm start
```

Die Anwendung ist anschliessend unter http://localhost:4200 erreichbar.

---

## 3. Demo-Accounts

Mit folgenden vorkonfigurierten Accounts kann das **Role-Based Access Control (RBAC)** getestet werden:

| Benutzername | Passwort | Rollen          | Anwendungsfall                   |
| ------------ | -------- | --------------- | -------------------------------- |
| **alice**    | alice    | `user`          | Standard-Studentenansicht        |
| **bob**      | bob      | `admin`, `user` | Admin-Ansicht mit Secret-Zugriff |

## Demonstrierte Funktionen

### Single Sign-On (SSO)

Benutzer melden sich einmal über Keycloak an und sind danach in der
gesamten Anwendung authentifiziert.

### Silent Check-SSO

Beim Laden der Seite wird im Hintergrund geprüft, ob bereits eine
bestehende Session vorhanden ist.

### Identity Propagation

Benutzerinformationen (Name, E-Mail, Benutzername) werden direkt aus dem
IAM-System geladen.

### Role-Based Access Control (RBAC)

UI-Elemente werden abhängig von den in Keycloak vergebenen Rollen
angezeigt.

- Benutzer mit der Rolle `admin` sehen den Bereich **"Admin Secret
  Access"**
- Normale Benutzer sehen die **"Student View"**

### Zentrale Benutzerverwaltung

Benutzer, Passwörter und Rollen werden vollständig in Keycloak
verwaltet und nicht im Anwendungscode.

---

## Sicherheitshinweise

- Dieses Setup verwendet den **Keycloak `start-dev` Modus** und ist
  **nur für Demonstrations- oder Schulprojekte gedacht**.
- In einer Produktionsumgebung sollte immer **HTTPS verwendet werden**
  und **Zugangsdaten niemals im Klartext gespeichert werden**.
