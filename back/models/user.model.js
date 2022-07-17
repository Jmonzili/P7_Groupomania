const mongoose = require('mongoose');
const { isEmail } = require('validator');

//  Contenu d'un Utilisateur
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 1024,
    },
    prenom: {
      type: String,
      minlength: 3,
      maxlength: 55,
      trim: true,
    },
    nom: {
      type: String,
      minlength: 3,
      maxlength: 55,
      trim: true,
    },
    picture: {
      type: String,
      default: './uploads/profil/photo-user.jpg',
    },
    followers: {
      type: [String],
    },
    following: {
      type: [String],
    },
    likes: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

//  Utilisateur
const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;
