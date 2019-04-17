

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






// 設定 method-override
app.use(methodOverride('_method'))

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

//setting router 
//home
app.use('/', require('./routes/home'))
//restaurants
app.use('/restaurants', require('./routes/restaurant'))
//search
app.use('/search', require('./routes/search'))
//sort
app.use('/sort', require('./routes/sort'))






//listen to  and start server
app.listen(port, () => {
  console.log(`Express is running  on http://localhost:${port}`)

})
