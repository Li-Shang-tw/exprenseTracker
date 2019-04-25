const mongoose = require('mongoose')
const Schema = mongoose.Schema

//建立schema
const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now,
  },

})

module.exports = mongoose.model('User', userSchema)