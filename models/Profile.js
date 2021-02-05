const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema
const ProfileSchema = new Schema({
  race: {
    type: Schema.Types.ObjectId,
    ref: 'races',
  },
  title: {
    type: String,
    //required: true,
  },
  firstName: {
    th: {
      type: String,
      //required: true,
    },
    en: {
      type: String,
    },
  },
  lastName: {
    th: {
      type: String,
    },
    en: {
      type: String,
    },
  },
  birtdate: {
    type: Date,
  },
  email: {
    type: String,
  },
  idCartNo: {
    type: String,
  },
  address: {
    type: String,
  },
  contact: {
    type: String,
  },
  recentPhoto: {
    type: String,
  },
  bibName: {
    type: String,
    //required: true,
    //max: 10,
  },
  applicantBackground: {
    isPreviouslyRun: {
      type: Boolean,
    },
    expectTime: {
      type: String,
    },
  },
  // emergencyContact: [
  //   {
  //     fullName: {
  //       type: String,
  //     },
  //     relationship: {
  //       type: String,
  //     },
  //     telephoneNo: {
  //       type: String,
  //     },
  //   },
  // ],
  emergencyContact: {
    contact1: {
      fullName: {
        type: String,
      },
      relationship: {
        type: String,
      },
      telephoneNo: {
        type: String,
      },
    },
    contact2: {
      fullName: {
        type: String,
      },
      relationship: {
        type: String,
      },
      telephoneNo: {
        type: String,
      },
    },
  },
  medicalInformation: {
    bloodType: {
      type: String,
      enum: ['A', 'B', 'O', 'AB'],
    },
    medicalAllergy: {
      isMatch: {
        type: Boolean,
      },
      detail: {
        type: String,
      },
    },
    chronicHealth: {
      isMatch: {
        type: Boolean,
      },
      detail: {
        type: String,
      },
    },
    surgeryBefore: {
      isMatch: {
        type: Boolean,
      },
      detail: {
        type: String,
      },
    },
    pregnant: {
      isMatch: {
        type: Boolean,
      },
      detail: {
        type: String,
      },
    },
    medicineToTake: {
      isMatch: {
        type: Boolean,
      },
      detail: {
        type: String,
      },
    },
    injuryFromMarathon: {
      isMatch: {
        type: Boolean,
      },
      detail: {
        type: String,
      },
    },
    isOftenExcercise: {
      type: Boolean,
    },
    triedDuringWorkout: {
      isMatch: {
        type: Boolean,
      },
      detail: {
        type: String,
      },
    },
  },
  souvenir: {
    tShirt: {
      size: {
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      },
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
})

module.exports = Profile = mongoose.model('profiles', ProfileSchema)
