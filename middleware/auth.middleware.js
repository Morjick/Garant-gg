const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    // const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"
    const token = req.headers.authorization
    const userId = req.headers.userId

    if (!token && !userId) {
      return res.status(411).json({ message: 'Нет авторизации' })
    }

    const decoded = jwt.verify(token, config.get('jwtSecret'))
    console.log(userId)
    req.user = decoded
    next()
  } catch (e) {
    res.status(401).json({ message: 'Нет авторизации' })
  }
}