# School IAM System - Keycloak & Angular Demo

This project demonstrates how to implement an Identity and Access Management (IAM) system using **Keycloak** as the provider and an **Angular** application as the client.

## Project Structure

- `/keycloak`: Contains the Docker Compose setup and realm import configuration.
- `/frontend`: An Angular 19 application integrated with Keycloak and styled with Tailwind CSS v4.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (installed with Node.js)

---

## 1. Setting up Keycloak (IAM)

The IAM system is pre-configured to automatically create a realm, client, and demo users on startup.

### Start the Service
From the root directory, run:
```bash
docker compose -f keycloak/docker-compose.yaml up -d
```

### Access Keycloak
- **Admin Console:** [http://localhost:8080](http://localhost:8080)
- **Admin Credentials:** `admin` / `admin`
- **Realm:** `school-realm`

---

## 2. Setting up the Angular App

The frontend is built with Angular 19 and uses `keycloak-js` for authentication.

### Installation
Navigate to the frontend directory and install dependencies:
```bash
cd frontend
npm install
```

### Start the Application
```bash
npm start
```
The app will be available at [http://localhost:4200](http://localhost:4200).

---

## 3. Demo Accounts

You can test the Role-Based Access Control (RBAC) using these pre-configured accounts:

| Username  | Password | Roles           | Use Case                       |
| :-------- | :------- | :-------------- | :----------------------------- |
| **alice** | alice    | `user`          | Standard student view.         |
| **bob**   | bob      | `admin`, `user` | Admin view with secret access. |

---

## Features Demonstrated

1.  **Single Sign-On (SSO):** Users log in once via Keycloak and are authenticated across the application.
2.  **Silent Check-SSO:** The app checks for an existing session in the background on page load.
3.  **Identity Propagation:** User profile information (Name, Email, Username) is fetched directly from the IAM.
4.  **Role-Based Access Control (RBAC):** UI elements are conditionally rendered based on the roles assigned in Keycloak:
    -   `admin` role sees the "Admin Secret Access" section.
    -   Regular users see the "Student View".
5.  **Centralized Management:** All users, passwords, and roles are managed in Keycloak, not in the application code.

## Security Notes
- This setup uses `start-dev` mode for Keycloak and is intended for **demonstration and school project purposes only**.
- In a production environment, always use HTTPS and never store credentials in plain text files.
