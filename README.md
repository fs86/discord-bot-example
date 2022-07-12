# Beispielprojekt für einen Python Discord-Bot inkl. React Dashboard


## 1. Python und Node.js installieren
Zum Ausführen des Projektes ist eine [aktuelle Python Version](https://www.python.org/downloads/), sowie eine [aktuelle Node.js Version](https://nodejs.org/en/download/) erforderlich. Vergewissere dich, dass beides auf deinem System isntalliert ist, bevor du weitermachst.

## 2. Paketmanager **yarn** installieren (optional)
Als Node.js Paketmanager empfehle ich **yarn**. Dieser kann mit folgendem Befehl installiert werden: `npm install -g yarn`

## 3. Python Pakete installieren
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

## 4. Node.js Pakete installieren
Das gleiche musst du nun auch noch für die Node.js Pakete tun. Führe hierzu im Unterverzeichnis **src/dashboard** einen der folgenden Befehle (je nach eingesetztem Paketmanager) aus:
```sh
cd src/dashboard

# Paketmanager "npm":
npm install

# Paketmanager "yarn":
yarn
```