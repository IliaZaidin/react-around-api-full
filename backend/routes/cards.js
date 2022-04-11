const express = require('express');
const { celebrate, Joi } = require('celebrate');
const validateURL = require('../utils/validateURL');

const cardRouter = express.Router();
const {
  getCards, deleteCard, createCard, likeCard, unlikeCard,
} = require('../controllers/cards');

cardRouter.get(
  '/',
  celebrate({
    headers: Joi.object().keys({}).unknown(true),
  }),
  getCards,
);

cardRouter.delete(
  '/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum(),
    }),
    headers: Joi.object().keys({}).unknown(true),
  }),
  deleteCard,
);

cardRouter.post(
  '/',
  celebrate({
    headers: Joi.object().keys({}).unknown(true),
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(validateURL),
    }),
  }),
  createCard,
);

cardRouter.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum(),
    }),
    headers: Joi.object().keys({}).unknown(true),
  }),
  likeCard,
);

cardRouter.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum(),
    }),
    headers: Joi.object().keys({}).unknown(true),
  }),
  unlikeCard,
);

module.exports = cardRouter;
