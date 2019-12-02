/* eslint-disable no-unneeded-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable no-prototype-builtins */
module.exports = function chaos (req, res, next) {
  // grab chaos-header from req header

  console.info('ChaosJS module load success')

  if (req.header('chaos-header')) {
    // e.g rawHeader = {  "responseTime": 3000, "status": 304, "likelihood": 0.7 }
    const rawHeader = req.header('chaos-header')
    try {
      const configObj = JSON.parse(rawHeader)
      console.debug(`Request RawHeader : ${rawHeader}`)
      doChaos(configObj, req, res, next)
    } catch (e) {
      // As this module is for testing purpose,
      // erroneous chaos-header should not block
      // request processing
      console.error('JSON parse Exception', e)
      next()
    }
  } else {
    next()
  }
}

function shouldDoChaos (likelihood) {
  console.info('Should do chaos')
  return likelihood > Math.random()
}

function doChaos (config, req, res, next) {
  const likelihood = config.hasOwnProperty('likelihood') == undefined ? 0 : config.likelihood
  const chaosLikelihood = shouldDoChaos(likelihood)
  var status = config.hasOwnProperty('status') == undefined ? undefined : config.status
  var responseTime = config.hasOwnProperty('responseTime') == undefined ? 0 : config.responseTime

  console.info('Should do chaos1')
  const delayedResponseTime = chaosLikelihood && responseTime != 0 ? true : false
  const delayedStatus = chaosLikelihood && delayedResponseTime && status != undefined ? true : false
  if (delayedStatus) {
    setTimeout(function () {
      res.status(parseInt(status))
      res.send('Hello Chaos')
    }, parseInt(responseTime))
  } else if (status != undefined) {
    res.status(parseInt(status))
    res.send('Hello Chaos')
  } else if (responseTime != 0) {
    setTimeout(function () {
      next()
    }, responseTime)
  }
}
