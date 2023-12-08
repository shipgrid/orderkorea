module.exports = async (error, req, res, next) => {
  res.status(error.statusCode).json({code: error.statusCode, message: error.message, data: error.data })
}