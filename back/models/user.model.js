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

//  Cryptage du mot de passe avec bcrypt avant l'envoi
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(); //bcrypt genere le salage
  this.password = await bcrypt.hash(this.password, salt); //Ajout du cryptage au password
  next();
});

//  Compare le hash via bcrypt
userSchema.statics.login = async function (email, password) {
  //  recherche le user via son email
  const user = await this.findOne({ email });
  if (user) {
    // compare le crypt du password du user et du password de la req
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password'); // Erreur password
  }
  throw Error('incorrect email'); // Erreur email
};

//  Utilisateur
const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;
