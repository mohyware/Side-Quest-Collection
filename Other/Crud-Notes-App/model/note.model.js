const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: [false, 'Please provide Title'],
      maxlength: 50,
    },
    Body: {
      type: String,
      required: [true, 'Please provide Body'],
      maxlength: 500,
    },
    createdBy: {
      type: String,
      required: [false, 'Please provide user'],
      maxlength: 10,
    },
  },
  { timestamps: true }

)

module.exports = mongoose.model('model', NoteSchema)
