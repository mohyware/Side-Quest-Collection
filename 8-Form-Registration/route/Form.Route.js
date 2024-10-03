import express from 'express';
import { validateForm } from '../Validations/Form.validation.js';
import { createForm } from '../controller/Form.Controller.js';

const router = express.Router()

router.route('/submit').post(validateForm, createForm)

export default router
