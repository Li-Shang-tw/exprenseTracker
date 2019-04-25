const express = require('express')
const router = express.Router()
const restauranttModels = require('../models/restaurant') //導入models
const { authenticated } = require('../config/auth')

// router to  search

router.get('/', authenticated, (req, res) => {
  const keyword = req.query.keyword
  restauranttModels.find({ userId: req.user._id })
    .exec((err, restaurants) => {
      if (err) return console.log(err)
      const rstSearchResults = restaurants.filter(
        restaurant => restaurant.name.toLowerCase()
          .includes(keyword.toLowerCase()) ||
          restaurant.category.toLowerCase()
            .includes(keyword.toLowerCase())
      )
      res.render('index', { restaurant: rstSearchResults })
    })
})



module.exports = router
