import { body } from 'express-validator';

const RESERVED_USERNAMES = [
  'admin',
  'api',
  'login',
  'register',
  'dashboard',
  'analytics',
  'settings',
  'profile',
  'support',
  'help',
];

export const registerValidation = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters')
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage('Username must be alphanumeric only')
    .custom((value) => {
      if (RESERVED_USERNAMES.includes(value.toLowerCase())) {
        throw new Error('This username is reserved');
      }
      return true;
    }),

  body('email')
    .trim()
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

export const loginValidation = [
  body('identifier')
    .trim()
    .notEmpty()
    .withMessage('Email or username is required'),

  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];