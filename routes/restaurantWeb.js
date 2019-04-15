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
  const restaurant = rstModels({
    name: req.body.name,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description,
  })

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
  rstModels.findById(req.params.id, (err, rst) => {
    if (err) return console.error(err)
    //將目標資料的內容全部指定為表單的填入值
    rst.name = req.body.name
    rst.name_en = req.body.name_en
    rst.category = req.body.category
    rst.image = req.body.image
    rst.location = req.body.location
    rst.phone = req.body.phone
    rst.google_map = req.body.google_map
    rst.rating = req.body.rating
    rst.description = req.body.description
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

