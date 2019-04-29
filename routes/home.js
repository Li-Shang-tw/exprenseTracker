const express = require('express')
const router = express.Router()
const Record = require('../models/Record') //導入models
// 載入 auth middleware
const { authenticated } = require('../config/auth')


//home router

router.get('/', authenticated, (req, res) => {
  Record.find({ userId: req.user._id })
    .exec((err, record) => {
      if (err) return console.error(err)
      return res.render('index', { record })
    })

})




module.exports = router