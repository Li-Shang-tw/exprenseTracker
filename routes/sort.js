const express = require('express')
const router = express.Router()
const restauranttModels = require('../models/restaurant') //導入models
const { authenticated } = require('../config/auth')




router.get('/:sortArg', authenticated, (req, res) => {
  restauranttModels.find({ userId: req.user._id })
    .sort(req.params.sortArg)
    .exec((err, restaurant) => {
      if (err) return console.error(err)
      return res.render('index', { restaurant })
    })

})


module.exports = router
