const jwt = require("jsonwebtoken");

const secrets = require("../config/secrets");

module.exports = function restricted(req, res, next) {
  const { authorization } = req.headers;
  if (authorization) {
    jwt.verify(authorization, secrets.jwtSecret, function(err, decodeToken) {
      if (err) {
        res.status(401).json({ message: "Invalid Token" });
      } else {
        req.token = decodeToken;
        next();
      }
    });
    // next();
  } else {
    return res.status(400).json({ message: "Provide valid credentials" });
  }
};
