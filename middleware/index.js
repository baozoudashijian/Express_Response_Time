
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
  console.log(opts);
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

