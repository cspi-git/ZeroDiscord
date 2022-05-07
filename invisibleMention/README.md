# invisibleMention
Mention the specified user invisibly.

## Installation
NpmJS:
```
npm i argparse request-async
```

## Usage
```
usage: index.js [-h] -ci CHANNELID -ui USERID -mm MASKMESSAGE -t TOKEN

optional arguments:
  -h, --help            show this help message and exit
  -ci CHANNELID, --channelID CHANNELID
                        The target channel ID.
  -ui USERID, --userID USERID
                        The target user ID.
  -mm MASKMESSAGE, --maskMessage MASKMESSAGE
                        The message to mask the mention.
  -t TOKEN, --token TOKEN
                        The Discord user token to use.
```