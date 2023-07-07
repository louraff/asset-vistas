const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 12;


// User model
// Basic implementation that can be modified at a later date
// Only implementing fields needed for authentication at this point
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true, // transforms all email fields to lowercase before saving
    trim: true // transforms email fields to remove whitespace
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 3
  },
  portfolio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Portfolio'
  },
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret){
      // The two arguments that are passed above represent the document (with additional fields, this is what we're converting from) and the "ret" which is the eventual return value.
      // delete the password from the returned value, leaving the rest of the fields in tact
      delete ret.password
      // Whatever is returned in the transform function is what the data will be when converted to json
      // Remember to return the ret variable after you've manipulated it
      return ret
    }
  }
})

// Just before saving our user, after validation has passed, we want to hash the plain text password
// We'll use bcrypt to do this, but mongoose provides us with a "pre" hook method so we can execute a callback function just before the user is created
userSchema.pre('save', async function(next){
  // Hash the password
  // First we need to check to see if the user is trying to change their password. This is because this function will execute both when the user is first created, and when the user is modified. If the user just updates their email, we don't want to hash their password again.
  if(!this.isModified('password')) return next()

  // Use bcrypt to hash password
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS)
  
  // Pass to the next action, in this case save the document
  return next()
})

// ! ALWAYS DO THIS LAST
// We assign a schema to a model so we can use the model methods to CRUD our data
module.exports = mongoose.model('User', userSchema)