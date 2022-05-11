# purifier
Finds malicious files in your Discord directories, this is really useful If something is happening with your account without you doing or If someone injected a malicious code in your Discord.

## Installation
NpmJS:
```
npm i recursive-readdir-async parallel-park chalk
```

## Usage
```
node index.js
```

## Note
This does not work in non Windows unless you know how to change the **local** & **roaming** path in the code & this does not gurantee 100% security as Discord malwares can run persistently without injecting into Discord directories but It can be use for quick auditing & checking.