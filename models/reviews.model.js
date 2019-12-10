const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Reviews = new Schema({

    name: {
        type:String,
        default:'Comming Soon'
    }, 
    genre:{
        type:String,
        default:'Comming Soon'
    }, 
    score:{
        type:Number,
        default:3
    },
    description:{
        type:String,
        default:'Comming Soon'
    }, 
    review:{
        type:String,
        default:'Comming Soon'
    }, 
    recomendations:{
        type:String,
        default:'Comming Soon'
    }, 
    imgname:{
        type:String,
        default:'Comming Soon'
    }


});

module.exports = mongoose.model('Reviews', Reviews)
