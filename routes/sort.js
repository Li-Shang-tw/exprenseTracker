const express = require('express')
const router = express.Router()
const restauranttModels = require('../models/restaurant') //導入models




router.get('/:sortArg', (req, res) => {
  restauranttModels.find({})
    .sort(req.params.sortArg)
    .exec((err, restaurant) => {
      if (err) return console.error(err)
      return res.render('index', { restaurant })
    })

})


module.exports = router
