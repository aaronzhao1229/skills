const readline = require('readline')

class Efficiency {
  constructor(CMP, highScore, mediumScore, lowScore) {
    this.CMP = CMP
    this.highScore = highScore
    this.mediumScore = mediumScore
    this.lowScore = lowScore
  }
  efficiencyScore() {
    if (this.CMP >= 0 && this.CMP < 10) {
      return this.lowScore
    } else if (this.CMP >= 10 && this.CMP < 20) {
      return this.mediumScore
    } else if (this.CMP >= 20) {
      return this.highScore
    } else {
      return null
    }
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

// check if one through-road is busy, and the other is quiet
function roundAboutMoreEffiency(Road1CPM, Road2CPM, Road3CPM, Road4CPM) {
  if (
    Road1CPM + Road3CPM > (Road2CPM + Road4CPM) * 2 ||
    Road2CPM + Road4CPM > (Road1CPM + Road3CPM) * 2
  ) {
    return true
  } else {
    return false
  }
}

function checkEfficiency(Road1CPM, Road2CPM, Road3CPM, Road4CPM) {
  const totalCMP = Road1CPM + Road2CPM + Road3CPM + Road4CPM

  // call class
  let roundAboutEfficiency = new Efficiency(totalCMP, 50, 75, 90)
  let stopSignsEfficiency = new Efficiency(totalCMP, 20, 30, 40)
  let trafficLightsEfficiency = new Efficiency(totalCMP, 90, 75, 30)
  let efficiency = [
    roundAboutEfficiency.efficiencyScore(),
    stopSignsEfficiency.efficiencyScore(),
    trafficLightsEfficiency.efficiencyScore(),
  ]

  if (roundAboutMoreEffiency(Road1CPM, Road2CPM, Road3CPM, Road4CPM) === true) {
    efficiency[0] += 10
  }

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
  return new Promise((resolve, reject) => {
    rl.question('Please input the first road CMP: ', function (input) {
      collectCMPs(input)
      resolve()
    })
  })
}

function secondInput() {
  return new Promise((resolve, reject) => {
    rl.question('Please input the second road CMP: ', function (input) {
      collectCMPs(input)
      resolve()
    })
  })
}

function thirdInput() {
  return new Promise((resolve, reject) => {
    rl.question('Please input the third road CMP: ', function (input) {
      collectCMPs(input)
      resolve()
    })
  })
}

function fourthInput() {
  return new Promise((resolve, reject) => {
    rl.question('Please input the fourth road CMP: ', function (input) {
      collectCMPs(input)
      resolve()
    })
  })
}

const costinputs = []

function collectCosts(num) {
  costinputs.push(num)
}

function roundaboutCostInput() {
  return new Promise((resolve, reject) => {
    rl.question('Please input the cost of roundabout (k): ', function (input) {
      collectCosts(input)
      resolve()
    })
  })
}

function stopSignCostInput() {
  return new Promise((resolve, reject) => {
    rl.question('Please input the cost of stop sign (k): ', function (input) {
      collectCosts(input)
      resolve()
    })
  })
}

function trafficLightsCostInput() {
  return new Promise((resolve, reject) => {
    rl.question(
      'Please input the cost of traffic lights (k): ',
      function (input) {
        collectCosts(input)
        resolve()
      }
    )
  })
}

function cpmPerDollar(cmpNumbers, costNumbers) {
  const totalCMP = cmpNumbers.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  )
  const cpmPerDollarValue = []
  costNumbers.forEach((e) => cpmPerDollarValue.push(totalCMP / e))

  for (let i = 0; i < cpmPerDollarValue.length; i++) {
    console.log(
      `\n CPM-per-dollar for ${controlMethod(i)}: ${cpmPerDollarValue[i]}%`
    )
  }
}

const main = async () => {
  await firstInput()
  await secondInput()
  await thirdInput()
  await fourthInput()
  await roundaboutCostInput()
  await stopSignCostInput()
  await trafficLightsCostInput()
  const cmpNumbers = []
  cmpinputs.forEach((e) => cmpNumbers.push(Number(e)))
  const costNumbers = []
  costinputs.forEach((e) => costNumbers.push(Number(e) * 1000))
  checkEfficiency(...cmpNumbers)
  cpmPerDollar(cmpNumbers, costNumbers)
  rl.close()
}

main()
