var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');

//gets all habits for signed in user, resets completed habits to false
router.post('/', function(req,res,next){
  User.findOne({ "_id": req.body.user.id}).
  populate('habits total').
  exec(function (err, user) {
    for(let i=0; i < user.habits.length; i++){
      for(let j=0; j < user.habits[i].dates.length; j++){
        if(req.body.date != user.habits[i].dates[j].date){
          user.habits[i].completed = false
        }
      }
    }
    user.save();
    if (err) return handleError(err);
    res.send({habits: user.habits, total: user.total, weeklyGoal:user.weeklyGoal, points: user.points});
  });
})

router.post('/dates', function(req,res,next){
  let dates;
  let habitName = req.body.name;
  User.findOne({ "_id": req.body.user.id}).
  populate('habits').
  exec(function (err, user) {
    if (err) return handleError(err);
    for (var i = 0; i < user.habits.length; i++) {
        if(user.habits[i].name === habitName){
           dates = user.habits[i].dates;
           res.send(dates);
        };
    };
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
  let newweeklyGoal = 0
  let previousGoal = req.body.weeklyGoal

  if(req.body.difficulty === "easy"){
    newweeklyGoal = previousGoal + (10*req.body.goal);
  }else if(req.body.difficulty === "medium"){
    newweeklyGoal = previousGoal + (20*req.body.goal);
  }
  else if(req.body.difficulty === "hard"){
    newweeklyGoal = previousGoal + (30*req.body.goal);
  }
  update = {
    $push: {habits: habit},
    $set:{weeklyGoal: newweeklyGoal}
  },

  User.findOneAndUpdate(
    { "_id": req.body.user.id},update,{new:true},
    function(err,user) {
      let newHabitCompletedArray = []
      for(let i=0; i <user.habits.length; i++){
        if(user.habits[i].goal !=2){
          newHabitCompletedArray.push(user.habits[i].completed)
        }
      }
      user.save();
      res.send({weeklyGoal: newweeklyGoal,habitCompletedArray:newHabitCompletedArray})
    });
});

//deletes habit from user db
router.post('/delete', function(req, res, next){
  let id = req.body.habitId;
  User.findOne({"habits._id" : id}, function(err, result){
    result.habits.id(id).remove();
    result.save(function(err){
      if(err){
        console.log(err);
      }
    });
    res.send({habits: result.habits});
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
        let habitCompletedArray =[]
        //handle habit dates, completed and points
        for (var i = 0; i < userVar.habits.length; i++) {
            if(userVar.habits[i].name === habitName){
              userVar.habits[i].completed = true;
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
             }
          };
          var now = new Date();
          var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
          var day = weekday[now.getDay()];

          for(let m=0; m< userVar.habits.length; m++){
            if(userVar.habits[m].goal ===2 && (day === 'Saturday' || day === 'Sunday')){
              habitCompletedArray.push(userVar.habits[m].completed)
            }else if(userVar.habits[m].goal ===5 && (day === "Monday" || day === "Tuesday"|| day === "Wednesday"|| day === "Thursday"|| day === "Friday")){
              habitCompletedArray.push(userVar.habits[m].completed)
            }else if(userVar.habits[m].goal === 7){
              habitCompletedArray.push(userVar.habits[m].completed)
            }
          }
      //handle count
      let newCount = 0;
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
      res.send({points: userVar.points, total: userVar.total, habitCompletedArray: habitCompletedArray});
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
              weeklyArr.push(weeklyPoints);
            }
          }
        }
        res.send(weeklyArr);
    }
  })
})


module.exports = router;
