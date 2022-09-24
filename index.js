const readline = require('readline')

function roundAboutEfficiencyScore(CMP) {
  if (CMP >= 0 && CMP < 10) {
    return 90
  } else if (CMP >= 10 && CMP < 20) {
    return 75
  } else if (CMP >= 20) {
    return 50
  } else {
    return null
  }
}

function stopSignsEfficiencyScore(CMP) {
  if (CMP >= 0 && CMP < 10) {
    return 40
  } else if (CMP >= 10 && CMP < 20) {
    return 30
  } else if (CMP >= 20) {
    return 20
  } else {
    return null
  }
}

function trafficLightsEfficiencyScore(CMP) {
  if (CMP >= 0 && CMP < 10) {
    return 30
  } else if (CMP >= 10 && CMP < 20) {
    return 75
  } else if (CMP >= 20) {
    return 90
  } else {
    return null
  }
}

function controlMethod(index) {
  switch (index) {
    case 0:
      return 'Roundabout'
    case 1:
      return 'Stop signs'
    case 2:
      return 'Traffic Lights'
  }
}

function checkEfficiency(Road1CPM, Road2CPM, Road3CPM, Road4CPM) {
  const totalCMP = Road1CPM + Road2CPM + Road3CPM + Road4CPM
  const efficiency = [
    roundAboutEfficiencyScore(totalCMP),
    stopSignsEfficiencyScore(totalCMP),
    trafficLightsEfficiencyScore(totalCMP),
  ]
  for (let i = 0; i < efficiency.length; i++) {
    console.log(
      `\n Efficiency Score for ${controlMethod(i)}: ${efficiency[i]}%`
    )
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const cmpinputs = []

function collectCMPs(num) {
  cmpinputs.push(num)
}

function firstInput() {
  rl.question('Please input the first road CMP: ', function (input) {
    collectCMPs(input)
    secondInput()
  })
}

function secondInput() {
  rl.question('Please input the second road CMP: ', function (input) {
    collectCMPs(input)
    thirdInput()
  })
}

function thirdInput() {
  rl.question('Please input the third road CMP: ', function (input) {
    collectCMPs(input)
    fouthInput()
  })
}

function fouthInput() {
  rl.question('Please input the fourth road CMP: ', function (input) {
    collectCMPs(input)
    const cmpNumbers = []
    cmpinputs.forEach((e) => cmpNumbers.push(Number(e)))
    checkEfficiency(...cmpNumbers)
    rl.close()
  })
}

firstInput()

// checkEfficiency(Road1, Road2, Road3, Road4)
