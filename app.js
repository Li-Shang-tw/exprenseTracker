

//導入express,設定server related variable
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')  //導入handlebars
const mongoose = require('mongoose')   // 載入 mongoose
const restauranttModels = require('./models/restaurant') //導入models
const bodyParser = require('body-parser') // 引用 body-parser
const methodOverride = require('method-override')
const router = express.Router()
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')             // 載入 connect-flash   




// 設定 method-override
app.use(methodOverride('_method'))

// 設定 bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/restList', { useNewUrlParser: true, useCreateIndex: true })   // 設定連線到 mongoDB


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

// 使用 express session 
app.use(session({
  secret: '94879487',
  resave: 'false',
  saveUninitialized: 'false',               // secret: 定義一組自己的私鑰（字串)
}))
// 使用 Passport 
app.use(passport.initialize())
app.use(passport.session())

// 載入 Passport config
require('./config/passport')(passport)


app.use(flash())                                                  // 使用 Connect flash

//建立local varaible儲存
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  //新增兩個 flash message 變數
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')

  next()
})

//setting router 
//home
app.use('/', require('./routes/home'))
//restaurants
app.use('/restaurants', require('./routes/restaurant'))
//search
app.use('/search', require('./routes/search'))
//sort
app.use('/sort', require('./routes/sort'))
//user
app.use('/users', require('./routes/user'))
//auth
app.use('/auth', require('./routes/auths'))





//listen to  and start server
app.listen(port, () => {
  console.log(`Express is running  on http://localhost:${port}`)

})
