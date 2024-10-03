import { check } from 'express-validator';

export const validateForm = [
    check('username').isLength({ min: 5 }).withMessage('username must be at least 5 characters long')
        .matches(/^[A-Za-z]+$/)
        .withMessage('Username must not contain numbers or special characters'),
    check('email').isEmail().withMessage('Invalid email address').custom(value => {
        if (!value.endsWith('@gmail.com')) {
            throw new Error('Must end with @gmail.com')
        }
        return true;
    }),
    check('password')
        .exists().withMessage('Password is required')
        .isLength({ min: 8, max: 64 }).withMessage('Password must be between 8 and 64 characters long')
        .matches(/[0-9]/).withMessage('Password must contain at least one number')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter'),
    check('passwordConfirm')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Must be same as password');
            }
            return true;
        }),
    check('birthDate')
        .not().isEmpty().withMessage('Must be a date')
]
