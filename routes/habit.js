var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');


router.get('/', function(req,res,next){
  User.find({ "_id": req.body.user.id}, function(err,users){
    if(err) return res.send(err);
    res.send(user.habits)
  })
})

router.post('/new', function(req,res,next){
  var habit = {
    name: req.body.name,
    difficulty: req.body.difficulty,
    goal: req.body.goal
  }
  User.findOneAndUpdate(
    { "_id": req.body.user.id},
    {
        $push: {
            habits: habit
        }
    },
    function(err,user) {

    });
});


module.exports = router;
