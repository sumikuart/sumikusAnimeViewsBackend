const express = require('express');
const app = express()
const bodyparser = require('body-parser');
const cors = require('cors');
const PORT = 8888
const mongoose = require('mongoose')
const multer = require('multer');
const myRoutes = express.Router();

app.use(cors());
app.use(bodyparser.json())

app.listen(PORT, function(){
    console.log('Server is running on: ' + PORT)  
})

//*************************************************************** */ Database connection håndtering. 
mongoose.connect('mongodb://127.0.0.1:27017/anime-views', { useNewUrlParser: true, useUnifiedTopology:true });

const connection = mongoose.connection;

connection.once('open', function() {
    console.log('mongodb connection complete')
})

app.use('',myRoutes);


//*************************************************************** */ Set up Models
let reviewModel = require('./models/reviews.model.js');



//*************************************************************** */ Review Data Håndtering:

// Set up Review Save Config: 
var storagevar = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../anime-views/public/assets/reviewImg');
    },
    filename: function (req, file, cb){
        cb(null, file.originalname)
    }
});

var upload = multer({ storage:storagevar}).single('file');


// add Review
app.post('/review/add', function(req, res){

    upload(req, res, function(err){
        if(err){
            console.log('Der skete en upload fejl');
            return res.status(500).json(err)
        }

        let reviewData = new reviewModel(req.body);

        reviewData.save().then(n =>{
            return res.status(200).send(req.file);
        }).catch( err =>{ 
            console.log('Der skete en upload fejl');
            return res.status(500).json(err)
        })
            
        return res.status(200).send(req.file);


    })

})

// Get Review From Database

myRoutes.route('/review/getall').get(function(req,res){
    reviewModel.find({},function(err, reviewlist){
        if(err) {
            console.log(err)
        } else {
            res.json(reviewlist)
        }
        
    })
})



