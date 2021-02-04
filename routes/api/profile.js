const express = require('express')
const router = express.Router()
//const passport = require('passport');

//Load Validation
const validateProfileInput = require('../../validation/profile')
const validateProfileConfirmInput = require('../../validation/profile-confirm')

//Load Profile Model
const Profile = require('../../models/Profile')

// @route   GET api/profile
// @desc    Get all profiles
router.get('/', (req, res) => {
  Profile.find()
    .populate('race', ['title', 'distance'])
    .sort({ createdAt: -1 })
    .then((result) => res.json(result))
    .catch((err) => res.status(404).json({ error: err }))
})

// @route   GET api/profile/:id
// @desc    Get profile by id
router.get('/:id', (req, res) => {
  Profile.findById(req.params.id)
    .populate('race', ['title', 'distance'])
    .then((result) => res.json(result))
    .catch((err) =>
      res.status(404).json({ error: 'No post found with that ID' })
    )
})

// @route   POST api/profile
// @desc    Create profile
router.post('/', (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body)
  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors)
  }

  // Get fields
  const profileFields = {}
  //profileFields.race = req.params.race;
  if (req.body.race) profileFields.race = req.body.race
  if (req.body.title) profileFields.title = req.body.title
  if (req.body.firstName)
    profileFields.firstName = {
      th: req.body.firstName.th,
      en: req.body.firstName.en,
    }
  if (req.body.lastName)
    profileFields.lastName = {
      th: req.body.lastName.th,
      en: req.body.lastName.en,
    }
  if (req.body.birthdate) profileFields.birthdate = req.body.birthdate
  if (req.body.email) profileFields.email = req.body.email
  if (req.body.idCardNo) profileFields.idCardNo = req.body.idCardNo
  if (req.body.address) profileFields.address = req.body.address
  if (req.body.contact) profileFields.contact = req.body.contact
  if (req.body.bibName) profileFields.bibName = req.body.bibName

  new Profile(profileFields).save().then((profile) => res.json(profile))
})

// @route   PUT api/profile/:id
// @desc    Update profile
router.put('/:id', (req, res) => {
  Profile.findOne({ _id: req.params.id, isActive: false }).then((profile) => {
    if (!profile) {
      return res.json({ message: 'No profile' })
    }
    if (profile.isActive) {
      return res.json({ message: 'Profile has been confirmed', profile })
    }

    //1 Personal Information
    if (req.body.title) profile.title = req.body.title
    if (req.body.firstName)
      profile.firstName = {
        th: req.body.firstName.th,
        en: req.body.firstName.en,
      }
    if (req.body.lastName)
      profile.lastName = {
        th: req.body.lastName.th,
        en: req.body.lastName.en,
      }
    if (req.body.birthdate) profile.birthdate = req.body.birthdate
    if (req.body.email) profile.email = req.body.email
    if (req.body.idCardNo) profile.idCardNo = req.body.idCardNo
    if (req.body.address) profile.address = req.body.address
    if (req.body.contact) profile.contact = req.body.contact
    if (req.body.bibName) profile.bibName = req.body.bibName

    //2 Applicant Background
    if (req.body.applicantBackground) {
      profile.applicantBackground = {
        isPreviouslyRun: req.body.applicantBackground.isPreviouslyRun,
        expectTime: req.body.applicantBackground.expectTime,
      }
    }

    //3 Emergency Contact
    if (req.body.emergencyContact) {
      profile.emergencyContact = {
        contact1: {
          fullName: req.body.emergencyContact.contact1.fullName,
          relationship: req.body.emergencyContact.contact1.relationship,
          telephoneNo: req.body.emergencyContact.contact1.telephoneNo,
        },
        contact2: {
          fullName: req.body.emergencyContact.contact2.fullName,
          relationship: req.body.emergencyContact.contact2.relationship,
          telephoneNo: req.body.emergencyContact.contact2.telephoneNo,
        },
      }
      // profile.emergencyContact = []
      // for (let i = 0; i < req.body.emergencyContact.length; i++) {
      //   const newEmergencyContact = {
      //     fullName: req.body.emergencyContact[i].fullName,
      //     relationship: req.body.emergencyContact[i].relationship,
      //     telephoneNo: req.body.emergencyContact[i].telephoneNo,
      //   }
      //   profile.emergencyContact.unshift(newEmergencyContact)
      // }
    }

    //4 Medical Information
    if (req.body.medicalInformation) {
      profile.medicalInformation = {
        bloodType: req.body.medicalInformation.bloodType,
        medicalAllergy: {
          isMatch: req.body.medicalInformation.medicalAllergy.isMatch,
          detail: req.body.medicalInformation.medicalAllergy.detail,
        },
        chronicHealth: {
          isMatch: req.body.medicalInformation.chronicHealth.isMatch,
          detail: req.body.medicalInformation.chronicHealth.detail,
        },
        surgeryBefore: {
          isMatch: req.body.medicalInformation.surgeryBefore.isMatch,
          detail: req.body.medicalInformation.surgeryBefore.detail,
        },
        medicineToTake: {
          isMatch: req.body.medicalInformation.medicineToTake.isMatch,
          detail: req.body.medicalInformation.medicineToTake.detail,
        },
        injuryFromMarathon: {
          isMatch: req.body.medicalInformation.injuryFromMarathon.isMatch,
          detail: req.body.medicalInformation.injuryFromMarathon.detail,
        },
        isOftenExcercise: req.body.medicalInformation.isOftenExcercise,
        triedDuringWorkout: {
          isMatch: req.body.medicalInformation.triedDuringWorkout.isMatch,
          detail: req.body.medicalInformation.triedDuringWorkout.detail,
        },
      }
    }

    //5 Souvenir
    if (req.body.souvenir) {
      profile.souvenir = {
        tShirt: {
          size: req.body.souvenir.tShirt.size,
        },
      }
    }

    profile.save().then((profile) => res.json(profile))
  })
})

// @route   PUT api/profile/:id/confirm
// @desc    Confirm profile
router.put('/:id/confirm', (req, res) => {
  Profile.findOne({ _id: req.params.id }).then((profile) => {
    if (!profile) {
      return res.json({ message: 'No profile' })
    }
    if (profile.isActive) {
      return res.json({ message: 'Profile has been confirmed', profile })
    }
    const { errors, isValid } = validateProfileConfirmInput(profile)
    if (!isValid) {
      return res.status(400).json(errors)
    }

    profile.isActive = true
    profile.save().then((profile) => res.json(profile))
  })
})

// @route   DELETE api/profile
// @desc    Delete profile
router.delete('/:id', (req, res) => {
  Profile.deleteOne({ _id: req.params.id }).then((result) => {
    res.json(result)
  })
})

module.exports = router
