const express = require('express')
const router = express.Router()
const rstModels = require('../models/resturantWeb') //導入models

//route
//create
//到create的頁面
router.get('/new', (req, res) => {
  return res.render('new')
})

//create的行為
router.post('/', (req, res) => {
  const restaurant = rstModels(req.body )

  restaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})

//read-detail頁面

router.get('/:id', (req, res) => {
  rstModels.findById(req.params.id, (err, rst) => {
    if (err) return console.error(err)
    return res.render('detail', { rst })
  })

})

//Edit頁面

router.get('/:id/edit', (req, res) => {
  rstModels.findById(req.params.id, (err, rst) => {
    if (err) return console.error(err)
    return res.render('edit', { rst })
  })
})

//Edit行為

router.put('/:id', (req, res) => {
  rstModels.findById(req.params.id, (err,restaurant) => {
    if (err) return console.error(err)
    //將目標資料的內容全部指定為表單的填入值
    //Object.assign is available for passing req.body to mongodb since there is no other unwanted params in this case.
    Object.assign(restaurant, req.body)
    rst.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/restaurants/${req.params.id}`)
    })
  })
})
//delete
router.delete('/:id/delete', (req, res) => {
  rstModels.findById(req.params.id, (err, rst) => {
    if (err) return console.error(err)
    rst.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})


module.exports = router

