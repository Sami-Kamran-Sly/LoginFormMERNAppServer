const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  // // check header
  // const authHeader = req.headers.authorization;

  try {
    // const decoded = jwt.verify(authHeader.process.env.JWT_SECRET);
    // req.user = decoded;
    // next();

    // OR
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = auth;
