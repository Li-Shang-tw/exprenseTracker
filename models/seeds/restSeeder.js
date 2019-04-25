const mongoose = require('mongoose')
const Rest = require('../restaurant')
const User = require('../user')

const restJson = require('../../restaurant.json')
const userJson = require('../../user.json')


//mongoose連線到database
mongoose.connect('mongodb://localhost/restList', { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

db.once('open', () => {
  console.log('db connected!')
})

//建立seeds
const userList = userJson.results
const restJsonList = restJson.results //是array
let n = 0
userList.forEach(user => {
  let newUser = User(user)
  for (i = n; i < n + 3; i++) {

    Rest.create({
      name: restJsonList[i].name,
      name_en: restJsonList[i].name_en,
      category: restJsonList[i].category,
      image: restJsonList[i].image,
      location: restJsonList[i].location,
      phone: restJsonList[i].phone,
      google_map: restJsonList[i].google_map,
      rating: restJsonList[i].rating,
      description: restJsonList[i].description,
      userId: newUser._id

    })
  }
  n += 1
}

)


/*const restJsonList = restJson.results //是array

restJsonList.forEach(element => {
  Rest.create({

    name: element.name,
    name_en: element.name_en,
    category: element.category,
    image: element.image,
    location: element.location,
    phone: element.phone,
    google_map: element.google_map,
    rating: element.rating,
    description: element.description
  })
  console.log('done')
});*/
