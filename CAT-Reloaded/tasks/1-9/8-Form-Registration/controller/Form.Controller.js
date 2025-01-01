import { validationResult } from 'express-validator'

export const createForm = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return res.status(200).json()
  }
  res.status(422).json(errors.array())
}