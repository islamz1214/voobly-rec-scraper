# voobly-rec-server

Simple API to provide filenames.

## Setup

Create a .env file in the root directory and paste the following (folder name must be aomrecs):

    CORS_ORIGIN=[ex. http://localhost:8080]
    FILE_PATH=[ex. /home/zahidulislam/Desktop/voobly-rec-scraper/downloads/aomrecs]

    
## Run

```shell
$ npm install
$ node index.js
```

## Results

If testing locally, go to http://www.localhost:3000/rcx and you should see all the files names from the FILE_PATH location.
