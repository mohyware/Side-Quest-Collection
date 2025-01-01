const express = require('express')

const router = express.Router()
const {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote,
  getNote,
} = require('../controller/noteController')

router.route('/').post(createNote).get(getAllNotes)

router.route('/:id').get(getNote).delete(deleteNote).patch(updateNote)

module.exports = router
