const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    avatar: { 
        type: String,
    },
    username: { 
        type: String,
        unique: true
    },
    location: { 
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
        zipcode: {
            type: Number,
        },
        city: {
            type: Number,
        }
    },
    gender: {
        type: String,
    },
    politics: {
        type: String,
    },
    children: {
        type: String,
    },
    drink: {
        type: String,
    },
    smoke: {
        type: String,
    },
    cannabis: {
        type: String,
    },
    age: {
        type: String,
    },
    sign: {
        type: String,
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    interests: [
        {
          interest: {type: String},
          _id: {type: String}
        }
    ],
    filterBy: [
        {
            distance: {type: Number},
            gender: [{type: String}],
            politics: [{type: String}],
            ageRange: [{type: Number}],
            children: [{type: String}],
            drink: [{type: String}],
            smoke: [{type: String}],
            cannabis: [{type: String}],
            sign: [{type: String}],
            interests: [
                {
                  interest: {type: String},
                  _id: {type: String}
                }
            ]
        }
    ],
    favorites: [
        {
            type: Schema.Types.ObjectId,
            ref: "Favorites"
        }
    ],
    matches: [
        {
            _id: {type: String}
        }
    ]
});

module.exports = mongoose.model( "Profile", profileSchema );