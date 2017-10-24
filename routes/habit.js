var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');


router.get('/', function(req,res,next){
  User.find({ "_id": req.body.user.id}, function(err,users){
    if(err) return res.send(err);
    res.send(user)
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

router.post('/habit/delete', function(req, res, next){
  let habitName = req.body.name
  User.findOneAndUpdate(
    {'habits.name': habitName},
    {
      $pull: {habits:{name: habitName }}
    }
    {new:true},
    function(err, user){
      console.log(err,user)
    })
})

router.post('/habit/edit', function(req, res, next){
  //edit habit name in database
})

module.exports = router;
