/* eslint-disable no-console */
const Card = require('../models/cards');
const { NotFoundError } = require('../middlewares/notFoundError');
const { Unauthorized } = require('../middlewares/unauthorizedError');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    if (cards.length === 0) {
      throw new NotFoundError('No cards found on server');
    } else res.send(cards);
  } catch (error) {
    next(error);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      throw new NotFoundError('Card ID not found');
    } else if (req.user._id !== card.owner) {
      throw new Unauthorized('Authorization required');
    } else {
      Card.deleteMany(card);
      res.send(card);
    }
  } catch (error) {
    next(error);
  }
};

const createCard = async (req, res, next) => {
  try {
    req.body.owner = req.user;
    const card = await Card.create(req.body);
    res.status(201).send(card);
  } catch (error) {
    next(error);
  }
};

const likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      throw new NotFoundError('Card ID not found');
    } else { res.send(card); }
  } catch (error) {
    next(error);
  }
};

const unlikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      throw new NotFoundError('Card ID not found');
    } else { res.send(card); }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCards, deleteCard, createCard, likeCard, unlikeCard,
};
