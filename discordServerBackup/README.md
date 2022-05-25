# discordServerBackup
A simple bot to backup your Discord servers.

## Installation
NpmJS:
```
npm i discord-backup discord.js path
```

## Setup
1. Open index.js
2. Find **dsb > token** then place your Discord bot token there and add your Discord user id in **dsb > access**.
3. Save it.

## Usage
Running the bot:
```
node index.js
```

Backup the current server:
```
dsb.backup
```

Restore specific backup in the current server:
```
dsb.restore <backupID>
```