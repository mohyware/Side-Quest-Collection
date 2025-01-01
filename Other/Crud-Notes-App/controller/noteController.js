var model = require('../model/note.model');
const { StatusCodes } = require('http-status-codes')


getAllNotes = async (req , res) => {
    const Notes = await model.find({})
    res.status(StatusCodes.OK).json({ Notes, count: Notes.length })
}

getNote = async (req , res) => {
    const {
        params: { id: NoteId },
      } = req
    
      const Note = await model.findOne({
          _id: NoteId,
        })
      if (!Note) {
        throw new NotFoundError(`No Note with id ${NoteId}`)
      }
      res.status(StatusCodes.OK).json({ Note })
}

createNote = async (req , res) => {
    const Note = await model.create(req.body)
    res.status(StatusCodes.CREATED).json({ Note })
}


updateNote = async (req , res) => {

    const {
        body: { Body, Title },
        params: { id: NoteId },
      } = req
    
/*       if (Body === '' || Title === '') {
        throw new BadRequestError('Body or Title fields cannot be empty')
      } */
      const Note = await model.findByIdAndUpdate(
        { _id: NoteId },
        req.body,
        { new: true, runValidators: true }
      )
      if (!Note) {
        throw new NotFoundError(`No Note with id ${NoteId}`)
      }
      res.status(StatusCodes.OK).json({ Note })
}


deleteNote = async (req , res) => {
    const {
        params: { id: NoteId },
    } = req
    
      const Note = await model.findByIdAndDelete({
        _id: NoteId,
      })
      if (!Note) {
        throw new NotFoundError(`No Note with id ${NoteId}`)
      }
      res.status(StatusCodes.OK).send()
}



module.exports = {
    createNote,
    deleteNote,
    getAllNotes,
    updateNote,
    getNote,
  }
  