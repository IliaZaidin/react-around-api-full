const express = require('express');

const indexRouter = express.Router();

const userRouter = require('./users');
const cardRouter = require('./cards');

indexRouter.use('/users', userRouter);
indexRouter.use('/cards', cardRouter);

module.exports = indexRouter;
