const apiResponse = require("../utils/api.response");
const message = require("../utils/message");
const { MulterError } = require("multer");
const { JsonWebTokenError, NotBeforeError, TokenExpiredError } = require("jsonwebtoken")


module.exports = async (error, req, res, next) => {
  console.log("ERROR MESSAGE: ", error.message, "\nERROR STACK: ", error.stack);

  if (error instanceof MulterError) return apiResponse.BAD_REQUEST({ res, message: message.INVALID("File"), data: { context: error.code } });

  if (error instanceof JsonWebTokenError || error instanceof NotBeforeError || error instanceof TokenExpiredError) return apiResponse.UNAUTHORIZED({ res, message: message.INVALID("Token") });

  return apiResponse.CATCH_ERROR({ res, message: message.INTERNAL_SERVER_ERROR, data: { context: error.message } });
};
