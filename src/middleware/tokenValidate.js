const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.tokenValidate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token  = authHeader?.split(' ')[1]

  if (token === null) {
    return res.sendStatus(403);
  }

  jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, user) => {
     
    if (err) return res.sendStatus(403);
    req.user = user._doc;
    next()
  })
}