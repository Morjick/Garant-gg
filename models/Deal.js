const { Schema, model } = require('mongoose')

const schema = new Schema({
  hash: { type: String, required: true, unique: true },
  emailExecutor: { type: String, required: false },
  emailCustomer: { type: String, required: false },
  types: { type: String, required: false },
  price: { type: Number, required: true },
  agreement: { type: Boolean, required: false },
  commissionExecutor: { type: Number, required: false },
  commisiom: { type: Number, required: false },
  status: { type: String, required: true },
  comments: { type: String, required: false },
  moderators: { type: String, required: false }
})

module.exports = model('Deal', schema)