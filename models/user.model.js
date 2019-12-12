const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Users = new Schema({

    username: {
        type:String
    }, 
    name: {
        type:String
    }, 
    email: {
        type:String
    }, 
    password: {
        type:String
    },
    level: {
        type:Number
    }
});

module.exports = mongoose.model('Users', Users)
