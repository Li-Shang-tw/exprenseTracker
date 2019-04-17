const express = require('express')
const router = express.Router()
const rstModels = require('../models/resturantWeb') //導入models

// router to  search

router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  rstModels.find((err, rsts) => {
    if (err) return console.log(err)
    const rstSearchResults = rsts.filter(
      rst => rst.name.toLowerCase()
        .includes(keyword.toLowerCase()) ||
        rst.category.toLowerCase()
          .includes(keyword.toLowerCase())
    )
    res.render('index', { rst: rstSearchResults })
  })
})

//sort  list
function sorting(route, conOb) { //輸入 route 路徑 與 conObj 排序條件物件(屬性:排序方式)

  router.get(route, (req, res) => {
    rstModels.find({})
      .sort(conOb)
      .exec((err, rst) => {
        if (err) return console.error(err)
        return res.render('index', { rst })
      })

  })
}

//name
sorting('/sortByName', { name: 'asc' })


//category
sorting('/sortByCategory', { category: 'asc' })


//LOCATION

sorting('/sortBylocation', { location: 'asc' })

//rating

sorting('/sortByRate', { rating: 'asc' })



module.exports = router
