const jwt = require("jsonwebtoken");
require("dotenv").config;

const authVerify = (role) => (req, res, next) => {
  const accessToken = req.headers.authorization;

  jwt.verify(accessToken, process.env.API_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "Authorization token is not valid" });
    } else {
      const decode = jwt.decode(accessToken);
      if (decode.role === role) {
        next();
      } else {
        res.status(403).json({ message: "Access denied" });
      }
    }
  });
};
const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.API_SECRET, {});
  return token;
};

module.exports = {
  authTokenVerify: authVerify("Admin"),
  authTokenVerifyUser: authVerify("user"),
  generateToken,
};
