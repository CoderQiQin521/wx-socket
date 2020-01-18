const mongoose = require('mongoose')

const Schema = mongoose.Schema({
  uid: {
    type: String
  },
  firends: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User'
    }
  ]
})

module.exports = mongoose.model('Firend', Schema)