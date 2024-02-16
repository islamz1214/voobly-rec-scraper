# voobly-rec-scraper

Scrape and download .rcx files from voobly site.

Currently it's tailored to 1V1 expert replays for Age of Mythology Titans Expansion.

## Setup

Create a voobly account at https://www.voobly.com

Create a .env file in the root directory and paste the following:

    VOOBLY_USERNAME=[your-voobly-username]
    VOOBLY_PASSWORD=[your-voobly-password]
    DOWNLOADS_PATH=[ex. /home/zahidulislam/Desktop/voobly-rec-scraper/downloads/]
    
## Run

```shell
$ npm install
$ node index.js
```

## Results

Check the downloads folder for the .rcx files.

## Extra

The following service can GET the rec files:
- https://github.com/islamz1214/voobly-rec-server

The following service can DISPLAY the rec files:
- https://github.com/islamz1214/voobly-rec-vue
