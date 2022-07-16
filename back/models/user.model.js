const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

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
      max: 1024,
      minlength: 6,
    },
    prenom: {
      type: String,
      minLength: 3,
      maxLength: 55,
      trim: true,
    },
    nom: {
      type: String,
      minLength: 3,
      maxLength: 55,
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

//  Cryptage du mot de passe avec bcrypt avant l'envoi des data
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(); //bcrypt genere le salage
  this.password = await bcrypt.hash(this.password, salt); //Ajout du cryptage au password
  next();
});

//  Utilisateur
const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;
