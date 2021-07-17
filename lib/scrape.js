  function getPlayerOneName () {
    return document.querySelector('#tab-content > div > table:nth-child(6) > tbody > tr:nth-child(2) > td:nth-child(1) > table > tbody > tr > td:nth-child(3) a:last-child').innerHTML
  }

  function getPlayerTwoName () {
    return document.querySelector('#tab-content > div > table:nth-child(6) > tbody > tr:nth-child(3) > td:nth-child(1) > table > tbody > tr > td:nth-child(3) a:last-child').innerHTML
  }

  function getPlayerOneGod () {
    const src = document.querySelector('#tab-content > div > table:nth-child(4) > tbody > tr > td:nth-child(1) > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td:nth-child(2) > img').attributes[0].value
    const godNum = src.substring(src.lastIndexOf('/') + 1, src.lastIndexOf('.'))
    return pickGod(godNum)
  }

  function getPlayerTwoGod () {
    const src = document.querySelector('#tab-content > div > table:nth-child(4) > tbody > tr > td:nth-child(3) > table > tbody > tr > td:nth-child(1) > table > tbody > tr > td > table > tbody > tr > td:nth-child(1) > img').attributes[0].value
    const godNum = src.substring(src.lastIndexOf('/') + 1, src.lastIndexOf('.'))
    return pickGod(godNum)
  }

  function getPatch () {
    const gameLadderSelector = document.querySelector('#content > div.left-column > table > tbody > tr > td:nth-child(2) > a')
    const gameTypeSelector = document.querySelector('#tab-content > div > table:nth-child(2) > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(8) > td:nth-child(2)')

    if (gameLadderSelector === '1v1 Supremacy' || gameTypeSelector != null) {
      return gameTypeSelector.innerHTML
    } else {
      return 'none'
    }
  }

  function getMap () {
    const mapElement = document.querySelector('#tab-content > div > table:nth-child(2) > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(5) > td:nth-child(2)').innerHTML

    if (mapElement === 'n/a') {
      return 'n_a'
    } else {
      return mapElement
    }
  }

  function getDate () {
    const date = new Date()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const year = date.getFullYear()
    let dateElement = document.querySelector('#tab-content > div > table:nth-child(2) > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(3) > td:nth-child(2)').innerHTML
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

  function getFilename () {
    return 'W_' + getPlayerOneName() +
                '(' + getPlayerOneGod() +
                ')_vs_' + getPlayerTwoName() +
                '(' + getPlayerTwoGod() + ')_' +
                getPatch() + '_' + getMap() +
                '_' + getDate() + '.zip'
  }

  function getRcxFileUrl () {
    if (document.querySelector('#tab-content > div > table:nth-child(2) > tbody > tr > td:nth-child(3) > table > tbody > tr:nth-child(2) > td').innerHTML === 'No recordings found') {
      return false
    } else {
      return document.querySelector('#tab-content > div > table:nth-child(2) > tbody > tr > td:nth-child(3) > table > tbody > tr:nth-child(3) > td > a').href
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
    filename: getFilename(),
    url: getRcxFileUrl()
  }
