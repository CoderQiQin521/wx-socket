const mongoose = require('mongoose')

const Schema = mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    set(val) {
      return require('bcryptjs').hashSync(val, 10)
    }
  },
  nickname: {
    type: String
  },
  socketid: {
    type: String
  }
})

module.exports = mongoose.model('User', Schema)