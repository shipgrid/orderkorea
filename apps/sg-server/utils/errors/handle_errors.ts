const parseError      = require('./parse_error')
const logError        = require('./log_error')
const sendClientError = require('./send_client_error')

/**
 * parseError = Adds any missing properties of the error object with default values (e.g. error.statusCode, error.clientMessage, etc).
 * datadogLog = Logs error to data dog. 
 * sendClientError = Sends error to client. 
 */
module.exports = [
  parseError, 
  logError, 
  sendClientError
]
