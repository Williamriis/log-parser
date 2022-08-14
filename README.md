# Log parser

A javascript application for parsing all the log files in a given directory and returning certain pieces of data on each.

## Getting started:

1. Clone the github repo and then navigate to it inside the terminal.
2. Run 'npm install' to install the required node modules.
3. Included in the repo is a subdirectory named 'logs' which contains one log file. Run 'npm start'
   to read the log. (Additional logs may be added, the program will read every file contained therein.)
4. The repo also includes a subdirectory named 'testlogs' with a testlog in it. Run 'npm test' to
   see that all is working as it should.

5. If you wish to read logs contained inside a different directory, supply the path to the directory as 
   an environment variable like so:

```
DIRECTORY=<path/to/log> npm start
```

6. The parser will automatically ignore hidden files. This behaviour can also be overridden with an environment    variable:

```
PARSE_HIDDEN=true npm start
```

## Troubleshooting

If you are running a version of node lower than 14 you will need to add an additional flag in order to run the parser:

```
node --experimental-modules main
```
