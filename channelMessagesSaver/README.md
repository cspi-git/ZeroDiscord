# channelMessagesSaver
Saves specific amount of messages of a Discord channel.

## Installation
NpmJS:
```
npm i argparse request-async delay
```

## Usage
```
usage: index.js [-h] -ci CHANNELID -a AMOUNT -o OUTPUT -t TOKEN

optional arguments:
  -h, --help            show this help message and exit
  -ci CHANNELID, --channelID CHANNELID
                        The target channel ID.
  -a AMOUNT, --amount AMOUNT
                        The amount of messages to save.
  -o OUTPUT, --output OUTPUT
                        The output file in where to save the messages.
  -t TOKEN, --token TOKEN
                        Discord account token to used.
```