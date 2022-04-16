const validator = require('validator');

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Code Monkey',
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      default: 'Expert Copypaster',
      minlength: 2,
      maxlength: 30,
    },
    avatar: {
      type: String,
      default: 'https://media.istockphoto.com/photos/chimpanzee-playing-with-a-laptop-picture-id92236499?k=20&m=92236499&s=612x612&w=0&h=fKFgLUd_ApLEECRSJGOXzP0XZ_aRznVyHEPX3iUkaBM=',
      validate: {
        validator(v) {
          return validator.isURL(v);
        },
        message: 'Not a valid URL',
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator(v) {
          return validator.isEmail(v);
        },
        message: 'Not a valid email',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('user', userSchema);
