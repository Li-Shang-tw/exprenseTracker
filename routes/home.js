const express = require('express')
const router = express.Router()
const rstModels = require('../models/resturantWeb') //導入models


//home router

router.get('/', (req, res) => {


  rstModels.find((err, rst) => {
    if (err) return console.error(err)
    return res.render('index', { rst })
  })

})




module.exports = router