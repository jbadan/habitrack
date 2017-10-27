var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var dateSchema = new mongoose.Schema({
  date:String,
  week: Number
})

var habitSchema = new mongoose.Schema({
  name: String,
  difficulty: String,
  goal: {
    type:Number,
    default: 7
  },
  dates: [dateSchema]
});

var totalSchema = new mongoose.Schema({
  date: String,
  count: {
    type: Number,
    default: 0
  },
  week: Number
})

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 99
  },
  email: { // TODO: Need to add email validation
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(v)
      },
      message: "{VALUE} is not a valid email"
    },
    unique: true,
    minlength: 5,
    maxlength: 99
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^\w{8,99}$/.test(v)
      },
      message: 'Your password must be be between 8 and 99 characters!'
    }
  },
  points: {
    type: Number,
    default: 0
  },
  weeklyGoal:{
    type: Number,
    default: 0
  },
  weeklyPoints:{
    type:Number,
    default: 0
  },
  habits: [habitSchema],
  total: [totalSchema]
});

// Override 'toJSON' to prevent the password from being returned with the user
userSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    var returnJson = {
      id: ret._id,
      email: ret.email,
      name: ret.name
    };
    return returnJson;
  }
});

userSchema.methods.authenticated = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, res) {
    if (err) {
      callback(err);
    } else {
      callback(null, res ? this : false);
    }
  });
}

// Mongoose's version of a beforeCreate hook
userSchema.pre('save', function(next) {
  var user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  var hash = bcrypt.hashSync(this.password, 10);
  // store the hash as the user's password
  this.password = hash;
  next();
});

var User = mongoose.model('User', userSchema);



module.exports = User;
