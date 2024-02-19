(async () => {
  const puppeteer = require('puppeteer')
  const scrape = require('./scrape.js')
  const request = require('request')
  const fs = require('fs')

  const results = []
  const maxPlayers = 10
  let playerX = 0

  const browser = await puppeteer.launch({ headless: false, executablePath: 'google-chrome-stable'})
  const page = await browser.newPage()
  await page.setViewport({ width: 1920, height: 1024 })

  // Navigate the page to a URL
  await page.goto('https://www.voobly.com/ladder/view/Age-of-Mythology-The-Titans/1v1-Supremacy')

  // Type into search box
  await page.waitForSelector('#username')
  await page.type('#username', process.env.VOOBLY_USERNAME)
  await page.waitForSelector('#password')
  await page.type('#password', process.env.VOOBLY_PASSWORD)
  await page.waitForSelector('.login-button')
  await page.click('.login-button')
  await nextPlayer()

  function delay (time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time)
    })
  }

  /**
 *
 * Go to player X
 *
 */
  async function nextPlayer () {
    function incrementPlayer () {
      return 2 + playerX++
    }

    await delay(3000)
    // 1v1 main page
    await page.goto('https://www.voobly.com/ladder/view/Age-of-Mythology-The-Titans/1v1-Supremacy')
    // Click Player x
    await page.waitForSelector('#pagebrowser1 > div.comments > table > tbody', 3000)
    await page.click('#pagebrowser1 > div.comments > table > tbody > tr:nth-child(' + incrementPlayer() + ') > td:nth-child(2) a:last-child')
    await page.waitForSelector('#tabbar > div:nth-child(5)')
    // Click Matches
    await page.click('#tabbar > div:nth-child(5) > a')
    const url = page.url()
    await scrapeMatches(url)
  }

  /**
 *
 * Go through all matches for player x and page 1
 * And gather data for download
 * @param {type} url The url to player X
 *
 */
  async function scrapeMatches (url) {
    let increment = 0

    const matchUrls = Array(maxPlayers.length).fill(url)

    for (let i = 0; i < matchUrls.length; i++) {
      /**
       *
       * Go through all match links and capture link and metadata per qualifed match
       *
       */

      function incrementMatch () {
        return 2 + increment++
      }

      await page.goto(matchUrls[i])
      await page.waitForSelector('#pagebrowser1 > div.comments > table > tbody')
      await page.click('#pagebrowser1 > div.comments > table > tbody > tr:nth-child(' + incrementMatch() + ') > td:nth-child(6) > a:last-child')
      await page.waitForSelector('#tab-content > div > table:nth-child(6) > tbody > tr:nth-child(2) > td:nth-child(1) > table > tbody > tr')
      const is1v1 = await page.evaluate(() => {
        const selector = document.querySelector('#tab-content > div > table:nth-child(6) > tbody > tr:nth-child(2) > td:nth-child(1) > table > tbody > tr').innerHTML
        return !selector.includes('<b>')
      })

      if (is1v1) {
        scrape(page)
          .then(function (file) {
            results.push(file)
            return results
          })
          .catch((error) => {
            console.log(error)
            // nightmare.halt()
          })
      }
    }



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
      browser.close()
    }
  }

  /**
 *
 * TODO - Download zip file, unzip it, then provide new filename
 *
 * Download zip file
 *
 * @param {*} url The url for download
 * @param {*} filename The descriptive filename
 * @param {*} callback Close fs
 */
  function download (url, filename, callback) {
  // const newFilename = (filename.substring(0, filename.length - 3)).concat('rcx')

    request.head(url, function (error, response, body) {
      if (error) {
        console.error(error)
      } else {
      // request(url).pipe(unzipper.Extract({ path: newFilename })).on('close', callback)
      console.log('debug fuilenane: ' + filename)  
      request(url).pipe(fs.createWriteStream(filename)).on('close', callback)
      }
    })
  }
})()
