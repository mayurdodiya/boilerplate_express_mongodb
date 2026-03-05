const jwt = require("jsonwebtoken");
const config = require("../config/config");
const apiResponse = require("../utils/api.response");
const message = require("../utils/message");
const { UserModel } = require("../models");
const { ROLE } = require("../utils/enums");

module.exports = {
  auth: ({ isTokenRequired = true, usersAllowed = [] } = {}) => {
    return async (req, res, next) => {
      const token = req.header("x-auth-token");

      if (isTokenRequired && !token) return apiResponse.BAD_REQUEST({ res, message: message.REQUIRED("Token") });
      if (!isTokenRequired && !token) return next();
      try {
        let decoded = await jwt.verify(token, config.JWT_SECRET);
        let user = await UserModel.findOne({ _id: decoded.userId }).lean();
        if (!user) return apiResponse.UNAUTHORIZED({ res, message: message.INVALID("Token") });
        req.user = user;

        if (usersAllowed.length) {
          if (req.user.role === ROLE.ADMIN) return next();
          if (usersAllowed.includes("*")) return next();
          if (usersAllowed.includes(req.user.role)) return next();
          return apiResponse.UNAUTHORIZED({ res, message: message.UNAUTHORIZED });
        } else {
          if (req.user.role === ROLE.ADMIN) return next();

          return apiResponse.UNAUTHORIZED({ res, message: message.UNAUTHORIZED });
        }
      } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
      }
    };
  },
};