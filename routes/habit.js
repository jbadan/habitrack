var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');


router.post('/', function(req,res,next){
  User.findOne({ "_id": req.body.user.id}).
  populate('habits').
  exec(function (err, user) {
    if (err) return handleError(err);
    res.send(user.habits);
  });
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


//NOT WORKING YET :)
router.post('/delete', function(req, res, next){
  let habitName = req.body.name;
  let index = req.body.indexNumber;
  User.findOneAndUpdate(
    { "user.habits._id": req.body.user.id},
    {
      $pull: {habits:{name: habitName }}
    },
    {new:true},
    function(err, user){
      console.log(err, user)
    })
})

//adds current date to database when you click on an item
router.post('/date', function(req, res, next){
  console.log("------------------------------------------------")
  console.log(req.body.date)
  let habitName = req.body.name;
  let user = req.body.user;
  let today = req.body.date;

  User.findOne({"_id" : req.body.user.id}, function(err, userVar){
    if(userVar){
        for (var i = 0; i < userVar.habits.length; i++) {
            if(userVar.habits[i].name = habitName){
                for (var j = 0; j < userVar.habits[i].dates[j].length; j++) {
                    if (userVar.habits[i].dates[j].date = '') {
                        userVar.habits[i].dates[j].date = today;
                        userVar.save();
                    };
                };
            }
        };
    }
});


})

router.post('/edit', function(req, res, next){
  //edit habit name in database
})

module.exports = router;
