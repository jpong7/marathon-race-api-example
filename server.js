const express = require('express')
const bodyParser = require('body-parser')
//const passport = require('passport');
//const path = require('path');
const mongoose = require('mongoose')
const basicJsTs = require('./routes/basic-js-ts')
const race = require('./routes/api/race')
const profile = require('./routes/api/profile')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const db = require('./config/keys').mongoURI
mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('Unable to connect MongoDB', err))

// -------------- Home --------------
app.all('/', function (req, res) {
  res.send('Orange Cap Test API')
})

app.use('/basic-js-ts', basicJsTs)
app.use('/api/race', race)
app.use('/api/profile', profile)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port}`))
