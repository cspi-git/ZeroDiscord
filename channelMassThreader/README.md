# channelMassThreader
A channel mass threader or a channel flooder via threads.

## Installation
NpmJS:
```
npm i argparse request-async delay
```

## Usage
```
usage: index.js [-h] -ci CHANNELID -a AMOUNT -tn THREADNAME -t TOKEN

optional arguments:
  -h, --help            show this help message and exit
  -ci CHANNELID, --channelID CHANNELID
                        The target channel ID.
  -a AMOUNT, --amount AMOUNT
                        The amount of thread to make.
  -tn THREADNAME, --threadName THREADNAME
                        Thread name.
  -t TOKEN, --token TOKEN
                        Discord account token to use.
```