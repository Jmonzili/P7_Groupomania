const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

//  Contenu d'un Utilisateur
const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      unique: true,
      trim: true
    },
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
      minlength: 6
    },
    picture: {
      type: String,
      default: "./uploads/profil/photo-user.jpg"
    },
    bio :{
      type: String,
      max: 1024,
    },
    followers: {
      type: [String]
    },
    following: {
      type: [String]
    },
    likes: {
      type: [String]
    }
  },
  {
    timestamps: true,
  }
);

//  Cryptage du mot de passe avec bcrypt avant l'envoi
userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();    //bcrypt genere le salage
    this.password = await bcrypt.hash(this.password, salt); //Ajout du cryptage au password
    next();
  });

//  Utilisateur
const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;