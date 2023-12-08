import logger from '../../models/logger'

module.exports = async (error, req, res, next) => {
  logger.error(JSON.stringify(error))
  next(error)
}