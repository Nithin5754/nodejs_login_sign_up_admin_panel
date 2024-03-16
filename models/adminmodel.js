const mongoose = require('mongoose')


const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, 'Email address is required'],
  },
  username: {
    type: String,
    required: [true, 'must provide username']
  },
  password: {
    type: String,
    required: [true, 'provide password']

  }
})

const Admindb = mongoose.model('admin', adminSchema)

module.exports = Admindb
