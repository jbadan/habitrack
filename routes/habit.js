var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');

//gets all habits for signed in user
//WORKING
router.post('/', function(req,res,next){
  User.findOne({ "_id": req.body.user.id}).
  populate('habits').
  exec(function (err, user) {
    if (err) return handleError(err);
    res.send(user.habits);
  });
})

router.post('/details', function(req,res,next){
  let habitName = req.body.name;
  console.log("inside the /details route"+ req.body);
  console.log("this is the habit name"+habitName);
  User.findOne({ "_id": req.body.user.id}).
  populate('habits').
  exec(function (err, user) {
    if (err) return handleError(err);
    for (var i = 0; i < user.habits.length; i++) {
        if(user.habits[i].name === habitName){
           res.send(user.habits[i]);
        };
    };
  });
})

//adds new habit to user db
//WORKING
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

//deletes habit from user db
//WORKING
router.post('/delete', function(req, res, next){
  let index = req.body.indexNumber;
  User.findOne({"_id" : req.body.user.id}).
  populate("habits").
  exec(function(err, userVar){
    userVar.habits[index].remove()
    userVar.save();
  })
})

//adds current date to database when you click on an item
router.post('/date', function(req, res, next){
  let habitName = req.body.name;
  let user = req.body.user;
  let today = req.body.date;
  let newDate = {
    date: today
  }
  User.findOne({"_id" : req.body.user.id}).
  populate('habits total').
  exec(function(err, userVar){
    if(userVar){
        for (var i = 0; i < userVar.habits.length; i++) {
            if(userVar.habits[i].name === habitName){
               userVar.habits[i].dates.push(newDate);
               userVar.save();
             }
          };
      let newCount = '';
      if(userVar.total.length === 0){
        newCount = 1;
        let totalDate = {
          date: today,
          count: newCount
        }
        userVar.total.push(totalDate)
      }else{
        for(var i=0; i< userVar.total.length; i++){
          if(userVar.total[i].date === today){
            newCount = userVar.total[i].count;
            newCount++;
            userVar.total[i].count = newCount
          }
        }
      }
      userVar.save();
    }
  });
})

router.post('/edit', function(req, res, next){
  //edit habit name in database
})

module.exports = router;
