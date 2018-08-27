let mongoose = require('mongoose');
let DB = require('./database').db;
let Schema = mongoose.Schema;


let eventSchema = new Schema({
    Date:{
        type: Date,
        required: true
    },
    Title:{
        type: String,
        required: true
    },
    Description:{
        type: String,
        required: true
    },
    Owner:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    Invites: {
        invited : [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        accepted: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }

        ],
        declined: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]

    }
});

let eventModel = DB.model('Event', eventSchema, 'events');

module.exports = {
    eventModel
}