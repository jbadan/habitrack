var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');

//gets all habits for signed in user
router.post('/', function(req,res,next){
  User.findOne({ "_id": req.body.user.id}).
  populate('habits total').
  exec(function (err, user) {
    if (err) return handleError(err);
    res.send({habits: user.habits, total: user.total, weeklyGoal:user.weeklyGoal});
  });
})

router.post('/details', function(req,res,next){
  let habitName = req.body.name;
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

//adds new habit to user db - increases weekly goal based on difficultly of task
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
    }, {new:true},
    function(err,user) {
      //adds to weekly goal amount
      let newweeklyGoal = 0
      let previousGoal = user.weeklyGoal

      if(req.body.difficulty === "easy"){
        newweeklyGoal = previousGoal + (10*req.body.goal);
        user.weeklyGoal = newweeklyGoal;
      }else if(req.body.difficulty === "medium"){
        newweeklyGoal = previousGoal + (20*req.body.goal);
        user.weeklyGoal = newweeklyGoal;
      }
      else if(req.body.difficulty === "hard"){
        newweeklyGoal = previousGoal + (30*req.body.goal);
        user.weeklyGoal = newweeklyGoal;
      }
      user.save();
      res.send({weeklyGoal: user.weeklyGoal})
    });
});

//deletes habit from user db
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
  let weekNumber = req.body.week;
  let newDate = {
    date: today,
    week: weekNumber
  }
  User.findOne({"_id" : req.body.user.id}).
  populate('habits total').
  exec(function(err, userVar){
    if(userVar){
        let totalPoints = userVar.points
        let newPointTotal = 0
        //handle habit dates and points
        for (var i = 0; i < userVar.habits.length; i++) {
            if(userVar.habits[i].name === habitName){
               userVar.habits[i].dates.push(newDate);
               if(userVar.habits[i].difficulty === "easy"){
                 newPointTotal = totalPoints + 10
                 userVar.points = newPointTotal
               }else if(userVar.habits[i].difficulty === "medium"){
                 newPointTotal = totalPoints + 20
                 userVar.points = newPointTotal
               }else if(userVar.habits[i].difficulty === "hard"){
                 newPointTotal = totalPoints + 30
                 userVar.points = newPointTotal
               }
               userVar.save();
             }
          };
      //handle count
      let newCount = '';
      if(userVar.total.length === 0){
        newCount = 1;
        let totalDate = {
          date: today,
          count: newCount,
          week: weekNumber
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
      res.send({points: userVar.points, total: userVar.total, weeklyGoal: userVar.weeklyGoal});
    }
  });
})

router.post('/weeklyGoal', function(req,res,next){
  let user = req.body.user;
  let weekNumber = req.body.weekNumber;
  let weeklyPoints = {};
  let weeklyArr = []
  User.findOne({"_id" : req.body.user.id}).
  populate('habits total').
  exec(function(err, userVar){
    if(userVar){
        for(let i=0; i < userVar.habits.length; i++){
          for(let j=0; j< userVar.habits[i].dates.length; j++){
            if(userVar.habits[i].dates[j].week === weekNumber){
              weeklyPoints.difficulty = userVar.habits[i].difficulty;
              weeklyPoints.goal = userVar.habits[i].goal;
              console.log(userVar.habits[i].goal)
              console.log(weeklyPoints.difficulty);
              weeklyArr.push(weeklyPoints);
            }
          }
        }
        console.log("This is the weeklyArr log in habit.js"+weeklyArr);
        res.send(weeklyArr);
    }
  })
})


module.exports = router;
