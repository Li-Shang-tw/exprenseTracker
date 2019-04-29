
//導入mongooose 使用schema
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//建立restShema
const expenseShema = new Schema({

  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true,
  },

})


//輸出schema
module.exports = mongoose.model('Recod', expenseShema)
