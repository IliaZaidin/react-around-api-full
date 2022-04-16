/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const indexRouter = require('./routes/index');
const { ERROR_NOT_FOUND, DB_ADDRESS } = require('./utils/consts');
const { createUser, login } = require('./controllers/users');
const { authorize } = require('./middlewares/auth');
const validateURL = require('./utils/validateURL');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect(DB_ADDRESS);

app.use(express.json());
app.use(helmet());

app.use(requestLogger);

app.use(cors());
app.options('*', cors());

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom(validateURL),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

app.use('/', authorize, indexRouter);
app.get('*', (req, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'Requested resource not found' });
});

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  if (!res.statusCode || !res.message) {
    res.status(500).send({ message: 'An error has occurred on the server' });
  } else {
    res.status(err.statusCode).send({ message: err.message });
  }
  next();
});

app.listen(PORT, () => {
  console.log(`\u001b[1;33m\n********************************\nApp is listening at port ${PORT}\u001b[0m`);
});
