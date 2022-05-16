
const deprecate = require('depd')('response-time')
const onHeaders = require('on-headers')

module.exports = responseTime

function responseTime(options) {
  let opts = options || {}

  if(typeof opts === 'number') {
    deprecate('number argument: use {digits: ' + JSON.stringify(options) + '} instead')
    opts = { digits: options }
  }

  let fn = typeof opts !== 'function' ? createSetHeader(opts) : opts

  return function responseTime(req, res, next) {
    let startAt = process.hrtime()

    onHeaders(res, function() {
      let diff = process.hrtime(startAt)
      let time = diff[0] * 1e3 + diff[1] * 1e-6

      fn(req, res, time)
    })
  }
}

function createSetHeader(options) {
  let digits = options.digits !== undefined ? options.digits : 3

  let header = options.header || 'X-Response-Time'

  let suffix = options.suffix !== undefined ? Boolean(options.suffix) : true

  return function setResponseHeader(req, res, time) {
    if(res.getHeader(header)) {
      return
    }

    let val = time.toFixed(digits)

    if(suffix) {
      val += 'ms'
    }

    res.setHeader(header, val)
  }
}

