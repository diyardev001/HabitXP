Dieses Readme ist Teil der App **"HabitXP"**, einer Habit-Tracking-Anwendung mit Gaming Mechanismen.

## Team
Members:
[Dustin](https://www.github.com/),
[Yassine](https://www.github.com/),
[Diyar](https://www.github.com/diyardev001),
[Kathrin](https://www.github.com/kathrinple)

## Quickstart

### Backend
Go to the project directory

```bash, ignore
  cd backend
```

Start the server

```bash, ignore
  ./mvnw spring-boot:run
```
⚠️ MongoDB muss im Hintergrund laufen

### Frontend
Go to the project directory

```bash, ignore
  cd mobile
```

Start Expo
```bash, ignore
  npx expo start
  
  ODER
  
  npm run web
```

## Prerequisites

Operating System: Windows

- Java 17+
- Maven
- MongoDB lokal installiert (läuft auf `mongodb://localhost:27017`)

## Installation and Setup

1. Clone the repository:
```bash,ignore
$ git clone https://github.com/diyardev001/HabitXP.git
```

2. Navigate to the project directory:
```bash,ignore
$ cd HabitXP
```

3. Adjust configuration files:

Modify configuration files (e.g., `.env`, `application.properties`) as required.

## Authentifizierungs-Endpunkte

#### Register

```http
  POST /auth/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. Username des Users |
| `email` | `string` | **Required**. E-Mail-Adresse |
| `password` | `string` | **Required**. Sicheres Passwort |

#### Login

```http
  POST /auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. E-Mail-Adresse |
| `password`   | `string` | **Required**. Passwort |

#### Get User Profile

```http
  GET /user/profile
```

| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization` | `string` | **Required**. Bearer `<JWT_TOKEN>` |

## Project structure
Provide an overview of the directory structure to help contributors navigate the project:

### Backend
Die Backend-Struktur basiert auf einem typischen Spring Boot Setup mit klarer Trennung von Verantwortlichkeiten:

```bash,ignore
backend/
├── .mvn/                     # Maven Wrapper Dateien
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com.habitxp.backend/
│   │   │       ├── controller/       # REST Controller (Auth, User)
│   │   │       ├── dto/              # Daten-Transfer-Objekte (LoginRequest, RegisterRequest, AuthResponse)
│   │   │       ├── model/            # Datenmodelle (z.B. User)
│   │   │       ├── repository/       # JPA/Mongo Repositories
│   │   │       ├── security/         # JWT Konfiguration & Filter
│   │   │       ├── service/          # Business-Logik (z.B. AuthService)
│   │   │       └── BackendApplication.java  # Main-Klasse
│   │   └── resources/
│   │       ├── static/               # Statische Ressourcen (z.B. Bilder, JS)
│   │       ├── templates/            # (optional) HTML-Templates
│   │       └── application.properties # Konfigurationsdatei
│
├── test/                  # Testklassen
├── mvnw / mvnw.cmd        # Maven Wrapper
├── .gitignore
├── README.md
└── HELP.md
```

### Mobile (Frontend)
Das mobile Frontend basiert auf Expo und folgt einer modularen Projektstruktur:

```bash,ignore
mobile/
├── .expo/                   # Expo spezifische Cache-Daten
├── app/                     # App Entry-Point und Routing
│   ├── (tabs)/              # Tab-Navigation
│   │   ├── _layout.tsx      # Hauptlayout für Tabs
│   │   └── index.tsx        # Startseite (z.B. Dashboard)
│
├── assets/                  # Bilder, Fonts, etc.
├── components/              # Wiederverwendbare UI-Komponenten
├── node_modules/            # Abhängigkeiten
├── app.json                 # Expo Konfiguration
├── expo-env.d.ts            # TypeScript Setup für Expo-Module
├── package.json             # Projektabhängigkeiten & Skripte
├── tsconfig.json            # TypeScript Konfiguration
├── .gitignore
└── README.md
```