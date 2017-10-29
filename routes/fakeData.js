var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');


router.get('/', function(req,res,next){
  var habit =[{
    difficulty: "easy",
    name: "Walk the dog",
    dates: [
      {
      date: "10/29/2017",
      week: 43
      },
      {
      date: "10/28/2017",
      week: 43
      },
      {
      date: "10/27/2017",
      week: 43
      },
      {
      date: "10/26/2017",
      week: 43
      },
      {
      date: "10/24/2017",
      week: 43
      },
      {
      date: "10/23/2017",
      week: 43
      },
      {
      date: "10/22/2017",
      week: 42
      },
      {
      date: "10/21/2017",
      week: 42
      },
      {
      date: "10/19/2017",
      week: 42
      },
      {
      date: "10/17/2017",
      week: 42
      },
      {
      date: "10/16/2017",
      week: 42
      }
    ],
    goal: 7,
    completed: false

  },
  {
    difficulty: "medium",
    name: "Go to the gym",
    dates: [
      {
      date: "10/28/2017",
      week: 43
      },
      {
      date: "10/26/2017",
      week: 43
      },
      {
      date: "10/23/2017",
      week: 43
      },
      {
      date: "10/22/2017",
      week: 42
      },
      {
      date: "10/21/2017",
      week: 42
      },
      {
      date: "10/19/2017",
      week: 42
      },
      {
      date: "10/16/2017",
      week: 42
      }
    ],
    goal: 7,
    completed: false

  }
]
  var newTotal = [
    {
    date: "10/29/2017",
    week: 43,
    count: 1
  },
  {
    date: "10/28/2017",
    week: 43,
    count: 2
  },
  {
    date: "10/27/2017",
    week: 43,
    count: 1
  },
  {
    date: "10/26/2017",
    week: 43,
    count: 2
  },
  {
    date: "10/24/2017",
    week: 43,
    count: 1
  },
  {
    date: "10/23/2017",
    week: 43,
    count: 2
  },
  {
    date: "10/22/2017",
    week: 42,
    count: 2
  },
  {
    date: "10/21/2017",
    week: 42,
    count: 2
  },
  {
    date: "10/19/2017",
    week: 42,
    count: 2
  },
  {
    date: "10/17/2017",
    week: 42,
    count: 1
  },
  {
    date: "10/16/2017",
    week: 42,
    count: 2
  }
]
  var newweeklyGoal = 210
  var newPoints = 270

  var update = {
    $set:{weeklyGoal: newweeklyGoal, habits: habit, total:newTotal, points:newPoints}
  }

  User.findOneAndUpdate(
    { "name": "testData7"},update,{new:true},
    function(err,user) {
      user.save();
    })
})
module.exports = router;
