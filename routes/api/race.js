const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
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
  })
  newRace.save().then((result) => res.json(result))
})

module.exports = router