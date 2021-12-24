const { Router } = require('express')
const router = Router()

const createHash = require('../vendor/createHash')
const Deal = require('../models/Deal')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')

let dealUrl

//* /deal/
router.get('/', async (req, res) => {
  try {

    return res.status(200).json({ message: 'Всё ок' })
    //! в бд ищем по ХЕШ и выдаём сделку
  } catch (e) {
    const error = e
    res.status(501).json({ 
      message: 'Что-то пошло не так, попробуйте снова', 
      error: `Детали: ${error}` 
    })
  }
})

//* /deal/generate
router.post('/generate', auth, async (req, res) => {
  try {
    const price = req.body.price
    const userId = req.body.id

    let isUser = await User.findOne({ userId })

    if(isUser) console.log(isUser)

    let hash

    async function createDeal() {
      hash = createHash()
      const candidateDeal = await Deal.findOne({ hash })

      if(candidateDeal) createDeal() // в случае, если хэш уже занят, генерируем новый хэш
    }

    createDeal()

    const deal = new Deal({
      hash, emailCustomer: isUser.email, price, status: 'data collection'
    })

    await deal.save()

    return res.status(200).json({ message: 'Всё ок', hash })
  } catch (e) {
    const error = e
    res.status(501).json({ 
      message: 'Что-то пошло не так, попробуйте снова', 
      error: `Детали: ${error}` 
    })
  }
})

//* /deal/:3Hc8e
router.get('/:hash', async (req, res) => {
  try {
    let hash = req.params.hash.split(':')[1]
    dealUrl = hash

    const candidateHash = await Deal.findOne({ hash })

    if(candidateHash) {
      return res.status(200).json({ 
        message: 'Запрос выдал следующие данные', 
        price: candidateHash.price, 
        customer: candidateHash.emailCustomer, 
        executor: candidateHash.emailExecutor, 
        status: candidateHash.status 
      })
    } else {
      return res.status(405).json({ error: 'Сделка по данному запросу не найдена' }) 
    }
  } catch (e) {
    const error = e
    res.status(501).json({ 
      message: 'Что-то пошло не так, попробуйте снова', 
      error: `Детали: ${error}` 
    })
  }
})

//* /deal/change
router.post('/change', async (req, res) => {
  try {
    const hash = req.body.hash
    let chahgeOptions = { ...req.body.option }
    let status = req.body.status

    const candidateDeal = await Deal.findOne({hash})

    async function changeDeal(key, meaning, status) {
      await candidateDeal.updateOne({
        key: meaning,
        status
      })
    }

    const commis = Number(candidateDeal.price) / 100 * 10

    if(status === 'agreement of a condition') {

      changeDeal(agreement, true, 'waiting for payment')
      changeDeal(commisiom, commis, 'waiting for payment')
      changeDeal(commissionExecutor, chahgeOptions.commissionExecutor, 'waiting for payment')

      return res.status(200).json({ 
        message: 'Всё ок, специалист согласился',
        status: 'waiting for payment'
      })
    }

    if(status === 'waiting for payment') {
      // ! Тут должна быть система оплаты

      return res.status(200).json({ 
        message: 'Всё ок, покупатель оплатил сделку',
        status: 'waiting for a specialist'
      })
    }

    if(status === 'waiting for a specialist') {

      // ! Передаём данные покупателю, если есть 

      return res.status(200).json({ 
        message: 'Всё ок. Ожидаем выполненного задания от специалиста',
        status: 'completion of the transaction'
      })
    }
    
    return res.status(200).json({ message: 'Всё ок' })
  } catch (e) {
    const error = e
    res.status(501).json({ 
      message: 'Что-то пошло не так, попробуйте снова', 
      error: `Детали: ${error}` 
    })
  }
})

//* /deal/noAgreement
router.post('/noAgreement', async (req, res) => {
  try {
    const hash = req.body.hash

    const deal = await Deal.findOne({ hash })

    deal.deleteOne({ hash })
    
    return res.status(200).json({ message: 'Сделка удалена, специалист отказасля от сделки' })
  } catch (e) {
    const error = e
    res.status(501).json({ 
      message: 'Что-то пошло не так, попробуйте снова', 
      error: `Детали: ${error}` 
    })
  }
})

//* /deal/moderators
router.post('/moderators', async (req, res) => {
  try {
    const hash = req.body.hash
    let moderator = 'moderator.garant.gg@mail.ru'

    const deal = await Deal.findOne({ hash })

    async function changeDeal() {
      await deal.updateOne({
        moderators: moderator,
        status: 'the issue is decided by the moderators'
      })
    }
    changeDeal()

    return res.status(200).json({ message: 'Сделка удалена, специалист отказасля от сделки' })
  } catch (e) {
    const error = e
    res.status(501).json({ 
      message: 'Что-то пошло не так, попробуйте снова', 
      error: `Детали: ${error}` 
    })
  }
})

// 1) data collection
// 2) agreement of a condition
// 3) waiting for payment
// 4) waiting for a specialist
// 5) completion of the transaction
// moder)  the issue is decided by the moderators

module.exports = router