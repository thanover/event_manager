let mongoose = require('mongoose');
const DB = require('./database').db;
let Schema = mongoose.Schema;


let userSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    events:{
        type: Schema.Types.ObjectId,
        ref: 'events',
    }
});

let userModel = DB.model('User', userSchema, 'users');

module.exports = {
    userModel
}