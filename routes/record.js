const express = require('express')
const router = express.Router()
const Record = require('../models/Record') //導入models
// 載入 auth middleware
const { authenticated } = require('../config/auth')

//route
//create
//到create的頁面
router.get('/new', authenticated, (req, res) => {
  return res.render('new')
})

//create的行為
router.post('/', authenticated, (req, res) => {
  const restaurant = Record(req.body)

  restaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})


//Edit頁面

router.get('/:id/edit', authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, rst) => {
    if (err) return console.error(err)
    return res.render('edit', { rst })
  })
})

//Edit行為

router.put('/:id', authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.error(err)
    //將目標資料的內容全部指定為表單的填入值
    Object.assign(restaurant, req.body)
    rst.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/restaurants/${req.params.id}`)
    })
  })
})
//delete
router.delete('/:id/delete', authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, rst) => {
    if (err) return console.error(err)
    rst.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})


module.exports = router

