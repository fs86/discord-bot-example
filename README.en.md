### 1. Install Python and Node.js
To run this project you need a [current Python version](https://www.python.org/downloads/), as well as a [current Node.js version](https://nodejs.org/en/download/). Make sure both are installed before proceeding.

### 2. Install package manager **yarn** (optional)
As Node.js package manager I recommend **yarn**. It can be installed with the following command: `npm install -g yarn`.

### 3. Install Python packages
The files **requirements.txt** and **pyproject.toml** included in the project describe the Python packages which are necessary to run the bot. You must first install these using the package manager of your choice. To do this execute one of the following commands (depending on the package manager you use) in the subdirectory **src/bot**.
```sh
cd src/bot

# Packagemanager "pip":
pip install -r requirements.txt

# Packagemanager "pipenv":
pipenv install -r requirements.txt

# Packagemanager "poetry":
poetry install
```

### 4. Install Node.js packages
Now you have to do the same for the Node.js packages. To do this execute one of the following commands (depending on the package manager you are using) in the **src/dashboard** subdirectory:
```sh
cd src/dashboard

# Packagemanager "npm":
npm install

# Packagemanager "yarn":
yarn
```

### 5. Make bot settings in Discord Developer.
The following settings must be made for the bot that will be connected to the dashboard. Here is the link to the Discord Developer Portal: https://discord.com/developers/applications
![oauth2settings](https://user-images.githubusercontent.com/39554311/178496754-b05724d4-b64d-4799-8094-ce8d1c9a88a9.jpg)
*Client ID and Client Secret on the screenshot are no longer valid ;-)*

### 6. Create configuration files
Two configuration files must be created. One for the bot (src/bot/**config.yml**) and one for the dashboard (src/dashboard/**.env**). Below you can find examples of the two configuration files. Values in brackets `< >` must be replaced by real values.
#### src/bot/**config.yml**
```yml
common:
  dev_mode: true
  return_exceptions: false

ipc:
  secret_key: <RANDOM SECRET KEY> # Any random string

db:
  host: <DATABASE HOST> # Hostname of the MongoDB system
  name: <DATABASE NAME> # Name of the database
  user: <DATABASE USER> # Username
  password: <DATABASE PASSWORD> # Password
  use_dns_seed_list: true
  retry_writes: true
  write_concern: majority

bot:
  token: <BOT TOKEN> # Bot Token
  dev_server_id: <ID OF DEV SERVER> # ID of the dev server
  owner_id: <ID OF BOT OWNER> # Member ID of the Bot owner

api:
  enabled: true

oauth:
  client_id: <CLIENT ID> # Client ID of the application (to be taken from the Discord Developer Portal)
  client_secret: <CLIENT SECRET> # Client Secret of the application (to be taken from the Discord Developer Portal)
  redirect_uri: http://localhost:8000/account/callback
  scopes:
    - identify
    - email
    - guilds
```

#### src/dashboard/**.env**
```ini
VITE_DC_CLIENT_ID=<CLIENT ID> # Client Secret of the application (to be taken from the Discord Developer Portal)
VITE_API_URL=http://localhost:8000
VITE_LANDING_PAGE_TITLE=Bot Dashboard
```
