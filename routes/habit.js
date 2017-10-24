var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');

router.post('/new', function(req,res,next){
  console.log(req.body.name)
  var habit = {
    name: req.body.name
  }
  User.findOneAndUpdate(
    { "_id": req.body.user.id},
    {
        $push: {
            habits: habit
        }
    },
    function(err,user) {
      console.log(user)
    }
);
});


module.exports = router;
