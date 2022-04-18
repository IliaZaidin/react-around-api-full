/* eslint-disable no-console */
const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { UnauthorizedError } = require('../middlewares/unauthorizedError');
const { NotFoundError } = require('../middlewares/notFoundError');

const createUser = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      email: req.body.email,
      password: hash,
    });
    res.status(201).send(user);
  } catch (error) {
    if (error.name === 'ValidationError') {
      error.status = 400;
      error.message = 'Invalid user ID passed to the server';
    }
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!user || !passwordCheck) {
      throw new UnauthorizedError('Wrong email or password');
    } else {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.status(200).send({ token });
    }
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    const payload = await jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    const user = await User.findById(payload._id);
    res.status(200).send(user);
  } catch (error) {
    if (error.name === 'CastError') {
      error.status = 400;
      error.message = 'Invalid user ID passed to the server';
    }
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      throw new NotFoundError('No users found on server');
    } else res.send(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      throw new NotFoundError('User ID not found');
    } else {
      res.send(user);
    }
  } catch (error) {
    if (error.name === 'CastError') {
      error.status = 400;
      error.message = 'Invalid user ID passed to the server';
    }
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: req.body.name,
        about: req.body.about,
      },
      { new: true },
    );
    if (!user) {
      throw new NotFoundError('User ID not found');
    } else {
      res.send(user);
    }
  } catch (error) {
    if (error.name === 'CastError') {
      error.status = 400;
      error.message = 'Invalid user ID passed to the server';
    }
    next(error);
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: req.body.avatar },
      { new: true },
    );
    if (!user) {
      throw new NotFoundError('User ID not found');
    } else {
      res.send(user);
    }
  } catch (error) {
    if (error.name === 'CastError') {
      error.status = 400;
      error.message = 'Invalid user ID passed to the server';
    }
    next(error);
  }
};

module.exports = {
  getUsers, getUserById, createUser, updateProfile, updateAvatar, login, getCurrentUser,
};
