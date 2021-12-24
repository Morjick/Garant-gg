const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')

const app = express()

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*/")
  res.header("Access-Control-Allow-Origin", "https://young-bastion-69652.herokuapp.com/")
  res.header("Access-Control-Allow-Origin", "https://young-bastion-69652.herokuapp.com") // обновляем в соответствии с доменом, из которого вы будете делать запрос

  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "HEAD, OPTIONS, GET, POST, PUT, DELETE")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")

  next()
})

app.use(express.json({ extended: true }))
app.use(express.static('client'))
app.get('/', (req, res) => {
  // express.static(path.resolve(__dirname, 'client', 'css', 'normalize.css'))
  // express.static(path.resolve(__dirname, 'client', 'less', 'less.min.js'))
  // express.static(path.resolve(__dirname, 'client', 'less', 'style.less'))
  // res.sendFile(path.resolve(__dirname, 'client', 'css', 'normalize.css'))
  // res.sendFile(path.resolve(__dirname, 'client', 'less', 'less.min.js'))
  // res.sendFile(path.resolve(__dirname, 'client'))
  console.log('worked')
})

app.use('/deal', require('./routes/deal.routes'))
app.use('/auth', require('./routes/auth.routes'))
app.use('/chat', require('./routes/chat.routes'))

const PORT = config.get('PORT') || 3000

async function start() {
  try {
    await mongoose.connect(config.get('mongoUrl'), {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('connect to data bse')
  } catch (e) {
    console.log('Server Error: Error to connect to DataBase. Details:', e.message)
    process.exit(1)
  }
}

start()

app.listen(PORT, () => {
  console.log('Server has been started on port ' + PORT)
})