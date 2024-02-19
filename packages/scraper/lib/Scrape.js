module.exports = async (page) => {
  async function getText (selector) {
    return await page.$eval(selector, el => el.innerHTML);
  }

  async function getHref (selector) {
    return await page.$eval(selector, el => el.href);
  }

  async function getAttribute (selector) {
    return await page.$eval(selector, el => el.attributes[0].value)
  }

  async function getPlayerOneName () {
    return await getText('#tab-content > div > table:nth-child(6) > tbody > tr:nth-child(2) > td:nth-child(1) > table > tbody > tr > td:nth-child(3) a:last-child')
  }

  async function getPlayerTwoName () {
    return await getText('#tab-content > div > table:nth-child(6) > tbody > tr:nth-child(3) > td:nth-child(1) > table > tbody > tr > td:nth-child(3) a:last-child')
  }
  async function getPlayerOneGod () {
    const src = await getAttribute('#tab-content > div > table:nth-child(4) > tbody > tr > td:nth-child(1) > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td:nth-child(2) > img', 'img', 'src')
    const godNum = src.substring(src.lastIndexOf('/') + 1, src.lastIndexOf('.'))
    return pickGod(godNum)
  }

  async function getPlayerTwoGod () {
    const src = await getAttribute('#tab-content > div > table:nth-child(4) > tbody > tr > td:nth-child(3) > table > tbody > tr > td:nth-child(1) > table > tbody > tr > td > table > tbody > tr > td:nth-child(1) > img', 'img', 'src')
    const godNum = src.substring(src.lastIndexOf('/') + 1, src.lastIndexOf('.'))
    return pickGod(godNum)
  }

  async function getPatch () {
    const gameLadderSelector = await getText('#content > div.left-column > table > tbody > tr > td:nth-child(2) > a')
    const gameTypeSelector = await getText('#tab-content > div > table:nth-child(2) > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(8) > td:nth-child(2)')

    if (gameLadderSelector === '1v1 Supremacy' || gameTypeSelector != null) {
      return gameTypeSelector
    } else {
      return 'none'
    }
  }

  async function getMap () {
    const mapElement = await getText('#tab-content > div > table:nth-child(2) > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(5) > td:nth-child(2)')

    if (mapElement === 'n/a') {
      return 'n_a'
    } else {
      return mapElement
    }
  }

  async function getDate () {
    const date = new Date()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const year = date.getFullYear()
    let dateElement = await getText('#tab-content > div > table:nth-child(2) > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(3) > td:nth-child(2)')

    console.log('debug date: ' + dateElement)
    if (dateElement.includes('ago') || dateElement.includes('Today')) {
      return month + '_' + day + '_' + year
    } else if (dateElement.includes('Yesterday')) {
      return month + '_' + (day - 1) + '_' + year
    } else {
      dateElement = dateElement.split(' ', 3)
      return getMonthNumber(dateElement[1]) + '_' + dateElement[0] + '_' + dateElement[2]
    }
  }

  async function getFilename () {
    return 'W_' + await getPlayerOneName() +
                '(' + await getPlayerOneGod() +
                ')_vs_' + await getPlayerTwoName() +
                '(' + await getPlayerTwoGod() + ')_' +
                await getPatch() + '_' + await getMap() +
                '_' + await getDate() + '.zip'
  }

  async function getRcxFileUrl () {
    const rcx = await getText('#tab-content > div > table:nth-child(2) > tbody > tr > td:nth-child(3) > table > tbody > tr:nth-child(2) > td')
    if (rcx === 'No recordings found') {
      return false
    } else {
      return await getHref('#tab-content > div > table:nth-child(2) > tbody > tr > td:nth-child(3) > table > tbody > tr:nth-child(3) > td > a')
    }
  }

  function getMonthNumber (monthName) {
    switch (monthName) {
      case 'January':
        return '01'
      case 'February':
        return '02'
      case 'March':
        return '03'
      case 'April':
        return '04'
      case 'May':
        return '05'
      case 'June':
        return '06'
      case 'July':
        return '07'
      case 'August':
        return '08'
      case 'September':
        return '09'
      case 'October':
        return 10
      case 'November':
        return 11
      case 'December':
        return 12
      default:
        return 'invalidMonth'
    }
  }

  function pickGod (num) {
    switch (num) {
      case '0':
        return 'Zeus'
      case '1':
        return 'Poseidon'
      case '2':
        return 'Hades'
      case '3':
        return 'Isis'
      case '4':
        return 'Ra'
      case '5':
        return 'Set'
      case '6':
        return 'Odin'
      case '7':
        return 'Thor'
      case '8':
        return 'Loki'
      case '9':
        return 'Kronos'
      case '10':
        return 'Oranos'
      case '11':
        return 'Gaia'
      default:
        return 'pickGodError'
    }
  }

  return {
    filename: await getFilename(),
    url: await getRcxFileUrl()
  }
}
