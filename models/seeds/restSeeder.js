const mongoose = require('mongoose')
const Rest = require('../resturantWeb')

const restJson = require('../../restaurant.json')


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
const restJsonList = restJson.results //是array

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
});
