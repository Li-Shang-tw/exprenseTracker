const express = require('express')
const router = express.Router()
const rstModels = require('../models/restaurant') //導入models
// 載入 auth middleware
const { authenticated } = require('../config/auth')


//home router

router.get('/', authenticated, (req, res) => {
  rstModels.find({ userId: req.user._id })
    .exec((err, rst) => {
      if (err) return console.error(err)
      return res.render('index', { rst })
    })

})




module.exports = router