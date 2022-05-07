# auditLogFlooder
Flood any Discord server audit log by sending junk invite links.

## Installation
NpmJS:
```
npm i argparse request-async delay
```

## Usage
```
usage: index.js [-h] -ci CHANNELID -a AMOUNT -t TOKEN

optional arguments:
  -h, --help            show this help message and exit
  -ci CHANNELID, --channelID CHANNELID
                        Any channel ID on the target server.
  -a AMOUNT, --amount AMOUNT
                        The amount of junk log to send in the server's audit log.
  -t TOKEN, --token TOKEN
                        Discord account token to use.
```