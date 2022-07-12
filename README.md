# 🇩🇪 Beispielprojekt: Python Discord-Bot mit React Dashboard
Dieses Beispielprojekt soll dir einen Überblick darüber verschaffen, wie du den Programmcode deines Discord-Bots sauber strukturieren kannst und wie du deinen Bot mit einer Verwaltungsoberfläche (Dashboard) verknüpfen kannst. Alles, was du hier vorfindest, sind lediglich **Ideen** bzw. **Anregungen** für eine spätere Umsetzung.

> Für die Datenspeicherung wird in diesem Beispiel [MongoDB](https://www.mongodb.com/cloud/atlas/register) verwendet. Nach der Registrierung auf mongodb.com bekommst du eine kostenlose Cloud Datenbank mit einer Kapazität von bis zu 500 MB. Das sollte für die meisten Hobby-Projekte ausreichen.

## Wie führe ich das Projekt aus?
Folgende Schritte sind notwendig, um den Discord-Bot, bzw. das Dashboard auf deinem Rechner auszuführen:

### 1. Python und Node.js installieren
Zum Ausführen des Projektes ist eine [aktuelle Python Version](https://www.python.org/downloads/), sowie eine [aktuelle Node.js Version](https://nodejs.org/en/download/) erforderlich. Vergewissere dich, dass beides auf deinem System isntalliert ist, bevor du weitermachst.

### 2. Paketmanager **yarn** installieren (optional)
Als Node.js Paketmanager empfehle ich **yarn**. Dieser kann mit folgendem Befehl installiert werden: `npm install -g yarn`

### 3. Python Pakete installieren
Die im Projekt enthaltenen Datei **requirements.txt** und **pyproject.toml** beschreiben die Python Pakete, die notwendig sind, um den Bot auszuführen. Diese musst du zunächst mit dem Paketmanager deiner Wahl installieren. Führe dazu einen der folgenden Befehle (je nach eingesetztem Paketmanager) im Unterverzeichnis **src/bot** aus.

```sh
cd src/bot

# Paketmanager "pip":
pip install -r requirements.txt

# Paketmanager "pipenv":
pipenv install -r requirements.txt

# Paketmanager "poetry":
poetry install
```

### 4. Node.js Pakete installieren
Das gleiche musst du nun auch noch für die Node.js Pakete tun. Führe hierzu im Unterverzeichnis **src/dashboard** einen der folgenden Befehle (je nach eingesetztem Paketmanager) aus:
```sh
cd src/dashboard

# Paketmanager "npm":
npm install

# Paketmanager "yarn":
yarn
```

### 5. Konfigurationsdateien anlegen
Es müssen zwei Konfigurationsdateien angelegt werden. Eine für den Bot (src/bot/**config.yml**) und eine für das Dashboard (src/dashboard/**.env**). Nachfolgend findest du Beispiele der beiden Konfigurationsdateien. Werte in spitzen Klammern `< >` müssen durch echte Werte ersetzt werden.
#### src/bot/**config.yml**
```yml
common:
  dev_mode: true
  return_exceptions: false

ipc:
  secret_key: <RANDOM SECRET KEY> # Beliebige zufällige Zeichenfolge

db:
  host: <DATABASE HOST> # Hostname des MongoDB Systems
  name: <DATABASE NAME> # Name der Datenbank
  user: <DATABASE USER> # Benutzername
  password: <DATABASE PASSWORD> # Passwort
  use_dns_seed_list: true
  retry_writes: true
  write_concern: majority

bot:
  token: <BOT TOKEN> # Bot Token
  dev_server_id: <ID OF DEV SERVER> # ID des Dev-Servers
  owner_id: <ID OF BOT OWNER> # Member ID des Bot Owners

api:
  enabled: true

oauth:
  client_id: <CLIENT ID> # Client ID der Applikation
  client_secret: <CLIENT SECRET> # Client Secret der Applikation
  redirect_uri: <REDIRECT URI> # Redirect URI
  scopes:
    - identify
    - email
    - guilds
```
#### src/dashboard/**.env**
```ini
VITE_DC_CLIENT_ID=<CLIENT ID> # Client ID der Applikation
VITE_API_URL=http://127.0.0.1:8000
VITE_LANDING_PAGE_TITLE=Bot Dashboard
```