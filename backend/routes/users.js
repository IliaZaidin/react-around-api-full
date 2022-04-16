const express = require('express');
const { celebrate, Joi } = require('celebrate');
const validateURL = require('../utils/validateURL');

const userRouter = express.Router();
const {
  getUsers, getUserById, updateProfile, updateAvatar, getCurrentUser,
} = require('../controllers/users');

userRouter.get(
  '/',
  celebrate({
    headers: Joi.object().keys({}).unknown(true),
  }),
  getUsers,
);

userRouter.get(
  '/me',
  celebrate({
    headers: Joi.object().keys({}).unknown(true),
  }),
  getCurrentUser,
);

userRouter.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().alphanum(),
    }),
    headers: Joi.object().keys({}).unknown(true),
  }),
  getUserById,
);

userRouter.patch(
  '/me',
  celebrate({
    headers: Joi.object().keys({}).unknown(true),
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateProfile,
);

userRouter.patch(
  '/me/avatar',
  celebrate({
    headers: Joi.object().keys({}).unknown(true),
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(validateURL),
    }),
  }),
  updateAvatar,
);

module.exports = userRouter;
