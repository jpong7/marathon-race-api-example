const express = require('express')
const router = express.Router()
//const passport = require('passport');

//Load Profile Model
const Race = require('../../models/Race')

// @route   GET api/race
// @desc    Get all races
router.get('/', (req, res) => {
  Race.find()
    .then((result) => res.json(result))
    .catch((err) => res.status(404).json({ error: err }))
})

// @route   GET api/race/:id
// @desc    Get race by id
router.post('/', (req, res) => {
  const newRace = new Race({
    title: req.body.title,
    distance: req.body.distance,
  })
  newRace.save().then((result) => res.json(result))
})

// @route   PUT api/race/:id
// @desc    Update race by id
router.put('/:id', (req, res) => {
  Race.findOne({ _id: req.params.id }).then((race) => {
    if (!race) {
      return res.json({ message: 'No ID' })
    }

    if (req.body.title) race.title = req.body.title
    if (req.body.distance) race.distance = req.body.distance

    race.save().then((race) => res.json(race))
  })
})

module.exports = router
