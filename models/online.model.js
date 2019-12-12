const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Online = new Schema({

    username: {
        type:String
    }, 
    level: {
        type:Number,
        default: 0
    },
    isOnline: {
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model('Online', Online)
