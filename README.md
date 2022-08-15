# Log parser

A javascript application for parsing all the log files in a given directory and returning certain pieces of data on each.

## Assumptions

I thought that the parser should be scaleable - in other words that it should be able to easily
perform operations on however many log files required, without demanding user input outside of pointing it
to where the logs are located. I also created a helper function to parse the file path so that the user is not required to write the trailing slash.

Given the scale and specified functionality of the assignment I decided not to involve a frontend component, but to write the 'backend' logic which could easily be adapted to e.g. React.

I took a modular approach because it feels more modern and clean. This way we end up with more files but each 
has a clear purpose and is easier to read. Static variables are stored in a general 'config' file and then imported
where required - this makes it much simpler to later update values. Functions that have a general purpose, such as
counting the unique number of items in an array, are stored in a 'utils' file and imported as needed. These could 
later be refractored to increase their use. My goal is to only define code in main.js which is specific to that file's purpose and unlikely to be reused elsewhere.

The method I used for finding the most common IP and URL does not handle draw cases. To account for draws would require more complex code and therefore I felt should not be included unless explicitly desired.

I used jest to write some simple tests stored in their own subfolder. I would have liked also to store the 'mockdata' which I use in its own JSON file so as to unclutter the test file.

With more time it would have been nice to think out a better map structure, but this is often something it is nice to collaborate on with others who will be working on the same project.

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
