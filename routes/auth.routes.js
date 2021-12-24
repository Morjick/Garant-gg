const { Router } = require('express')
const router = Router()

const User = require('../models/User')
const nodemailer = require('../vendor/nodemailer')

const config = require('config')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { check, validationResult } = require("express-validator")


// /auth/register
router.post('/register',
  [
    check("email", "Введите коректный email").isEmail(),
    check("password", "Минимальная длинна пароля составляет 6 символов").isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Получены неверные данные при регистрации"
        })
      }

      const { email, password } = req.body

      const candidate = await User.findOne({ email })

      if (candidate) {
        return res.status(400).json({ message: "Такой пользователь уже существует" })
      }

      const hashedPassword = await bcrypt.hash(password, 12)

      const user = new User({ email, password: hashedPassword })

      await user.save()

      nodemailer('Матвей Храмов', 'Аккаунт с этим email был зарегистрирован на платформе garant.gg(https://garant.gg.ru). Если вы этого не делали, пожалуйста, свяжитесь с технической поддержкой платформы. C уважением, garant.gg!')

      const isMatch = await bcrypt.compare(password, user.password)

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: "30d" }
      )

      return res.status(200).json({ message: 'Всё ок', token, userId: user.id })
    } catch (e) {
      const error = e
      res.status(501).json({ message: 'Что-то пошло не так, попробуйте снова', error: `Детали: ${error}` })
    }
  })


// /auth/login
router.post('/login',
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при входе в систему'
        })
      }

      const { email, password } = req.body

      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден' })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: "30d" }
      )

      return res.status(200).json({ message: 'Всё ок', token, userId: user.id })
    } catch (e) {
      const error = e
      res.status(501).json({ message: 'Что-то пошло не так, попробуйте снова', error: `Детали: ${error}` })

      console.log(error)
    }
  })

// /auth/delete/
router.post('/delete/', async (req, res) => {
  try {
    const email = req.body.email
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: "Такой пользователь не найден" })
    }

    User.deleteOne({ email })

    nodemailer('Матвей Храмов', 'Аккаунт с этим email был удалён с платформе garant.gg(https://garant.gg.ru). Если вы не удаляли аккаунт или хотите узнать причину блокировки, пожалуйста, свяжитесь с технической поддержкой платформы. C уважением, garant.gg!')

    return res.status(200).json({ message: 'Пользователь удалён' })
  } catch (e) {
    const error = e
    res.status(501).json({ message: 'Что-то пошло не так, попробуйте снова', error: `Детали: ${error}` })
  }
})

module.exports = router