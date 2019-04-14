

//導入express,設定server related variable
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')  //導入handlebars
const mongoose = require('mongoose')   // 載入 mongoose
const rstModels = require('./models/resturantWeb') //導入models
const bodyParser = require('body-parser') // 引用 body-parser

// 設定 bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/restList', { useNewUrlParser: true })   // 設定連線到 mongoDB

// mongoose 連線後透過 mongoose.connection 拿到 Connection 的物件
const db = mongoose.connection

// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})

// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})


//set template engine

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files

app.use(express.static('public'))

//setting router and corresponding response


//route to homepage

app.get('/', (req, res) => {
  rstModels.find((err, rst) => {
    if (err) return console.error(err)
    return res.render('index', { rst })
  })
})


//create
//到create的頁面
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

//create的行為
app.post('/restaurants', (req, res) => {
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

app.get('/restaurants/:id', (req, res) => {
  rstModels.findById(req.params.id, (err, rst) => {
    if (err) return console.error(err)
    return res.render('detail', { rst })
  })

})

//Edit頁面

app.get('/restaurants/:id/edit', (req, res) => {
  rstModels.findById(req.params.id, (err, rst) => {
    if (err) return console.error(err)
    return res.render('edit', { rst })
  })
})

//Edit行為

app.post('/restaurants/:id', (req, res) => {
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
app.post('/restaurants/:id/delete', (req, res) => {
  rstModels.findById(req.params.id, (err, rst) => {
    if (err) return console.error(err)
    rst.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

// router to  search

app.get('/search', (req, res) => {
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


//listen to  and start server
app.listen(port, () => {
  console.log(`Express is running  on http://localhost:${port}`)

})
