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
let userModel = require('./models/user.model.js');
let onlineModel = require('./models/online.model.js');
let reviewModel = require('./models/reviews.model.js');

//*************************************************************** */ Online Håndtering:

// Add keep online
myRoutes.route('/user/online/add').post(function(req,res){
    let newOnline = new onlineModel(req.body);

    newOnline.save().then(newOnline =>{
        res.status(200).json({'Online':' Added'})
    }).catch(err => {
        res.status(400).send('add Online Fail')
    })
})


// load keep online
myRoutes.route('/user/online/get').get(function(req,res){
    onlineModel.find({},function(err, onlineModel){
        if(err) {
            console.log(err)
        } else {
            res.json(onlineModel)
        }
        
    })
})


//*************************************************************** */ User Håndtering:

// Add User
myRoutes.route('/user/add').post(function(req,res){
    let newUser = new userModel(req.body);

    newUser.save().then(newUser =>{
        res.status(200).json({'User':' Added'})
    }).catch(err => {
        res.status(400).send('add new user Fail')
    })
})


// Get User List
myRoutes.route('/user/getall').get(function(req,res){
    userModel.find({},function(err, userlist){
        if(err) {
            console.log(err)
        } else {
            res.json(userlist)
        }
        
    })
})


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

// Get Singel Review From Database

myRoutes.route('/review/getone/:id').get(function(req,res){
    
    let id = req.params.id;

    reviewModel.findById(id,function(err, review){
        if(err) {
            console.log(err)
        } else {
            res.json(review)
        }
        
    })
})


// Edit Review From Database

myRoutes.route('/review/update/:id').post(function(req,res){
    reviewModel.findById(req.params.id, function(err, saveobj){

        if(!saveobj){
            res.status(400).send('data not found')
        } else {
            saveobj.name = req.body.name;
            saveobj.genre = req.body.genre;
            saveobj.score = req.body.score;
            saveobj.description = req.body.description;
            saveobj.review = req.body.review;
            saveobj.recomendations = req.body.recomendations;
            
   
        saveobj.save().then(saveobj => {
            res.json('Review Update')
        }).catch(err => {
            res.status(400).send("update fail.")
        })
    }
    })

})


