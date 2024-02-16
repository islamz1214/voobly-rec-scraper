require('dotenv').config()

const Nightmare = require('nightmare')
const nightmare = Nightmare({
  show: true
})
const fs = require('fs')
const request = require('request')
const results = []
const maxPlayers = 10
let playerX = 0

/**
 *
 * Login to voobly
 *
 */

login()
function login () {
  return nightmare
    .goto('https://www.voobly.com/ladder/view/Age-of-Mythology-The-Titans/1v1-Supremacy')
    .type('#username', process.env.VOOBLY_USERNAME)
    .type('#password', process.env.VOOBLY_PASSWORD)
    .click('.login-button')
    .then(() => {
      nextPlayer()
    })
    .catch((err) => {
      console.log(err)
    })
}

/**
 *
 * Go to player X
 *
 */
function nextPlayer () {
  function incrementPlayer () {
    return 2 + playerX++
  }
  return nightmare
    // 1v1 main page
    .wait(3000)
    .goto('https://www.voobly.com/ladder/view/Age-of-Mythology-The-Titans/1v1-Supremacy')
    .wait('#pagebrowser1 > div.comments > table > tbody', 3000)
    // Click Player x
    .click('#pagebrowser1 > div.comments > table > tbody > tr:nth-child(' + incrementPlayer() + ') > td:nth-child(2) a:last-child')
    .wait('#tabbar > div:nth-child(5)')
    // Click Matches
    .click('#tabbar > div:nth-child(5) > a')
    .url()
    .then((url) => {
      scrapeMatches(url)
    })
    .catch((err) => {
      console.log(err)
    })
}

/**
 *
 * Go through all matches for player x and page 1
 * And gather data for download
 * @param {type} url The url to player X
 *
 */
function scrapeMatches (url) {
  let increment = 0

  const matchUrls = Array(10).fill(url)
  const matchPromise = matchUrls.reduce(function (acc, matchURL) {
    return acc.then(() => {
      /**
       *
       * Go through all match links and capture link and metadata per qualifed match
       *
       */

      function incrementMatch () {
        return 2 + increment++
      }

      return nightmare
        .goto(matchURL)
        .wait('#pagebrowser1 > div.comments > table > tbody')
        .click('#pagebrowser1 > div.comments > table > tbody > tr:nth-child(' + incrementMatch() + ') > td:nth-child(6) > a:last-child')
        .wait('#tab-content > div > table:nth-child(6) > tbody > tr:nth-child(2) > td:nth-child(1) > table > tbody > tr')
        .evaluate(() => {
          const selector = document.querySelector('#tab-content > div > table:nth-child(6) > tbody > tr:nth-child(2) > td:nth-child(1) > table > tbody > tr').innerHTML
          return !selector.includes('<b>')
        })

        .then((is1v1) => {
          if (is1v1) {
            return nightmare
              .inject('js', './lib/Scrape.js')
              .then(function (file) {
                console.log('debug file: ' + JSON.stringify(file))
                results.push(file)
                return results
              })
              .catch((error) => {
                console.log(error)
                nightmare.halt()
              })
          }
        })
    })
  }, Promise.resolve())
  matchPromise.then(() => {
    /**
     *
     * Download all qualified matches for Player X
     *
     */
    for (let i = 0; i < results.length; i++) {
      if (results[i].url !== false && results[i].filename !== false) {
        console.log('url: ' + results[i].url)
        console.log('filename: ' + results[i].filename)

        download(results[i].url, process.env.DOWNLOADS_PATH + results[i].filename, function () { })
      }
    }

    /**
     *
     * Repeat until max players
     *
     */
    if (playerX < maxPlayers) {
      nextPlayer()
    } else {
      return nightmare.end()
    }
  })

  matchPromise.catch((error) => {
    console.log(error)
  })
}

/**
 *
 * Download process
 *
 * @param {*} url The url for download
 * @param {*} filename The descriptive filename
 * @param {*} callback Close fs
 */
function download (url, filename, callback) {
  request.head(url, function (error, response, body) {
    if (error) {
      console.error(error)
    } else {
      request(url).pipe(fs.createWriteStream(filename)).on('close', callback)
    }
  })
}
