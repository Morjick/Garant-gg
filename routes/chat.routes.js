const { Router } = require('express')
const router = Router()

// /chat/:hesh
router.get('/', async (req, res) => {
  try {

    

    return res.status(200).json({ message: 'Всё ок' })
  } catch (e) {
    const error = e
    res.status(501).json({ message: 'Что-то пошло не так, попробуйте снова', error: `Детали: ${error}` })
  }
})

module.exports = router