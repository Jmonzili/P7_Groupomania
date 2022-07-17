const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const maxAge = 3 * 24 * 60 * 60 * 1000;

// Cryptage du MDP via bcrypt
function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

//  Inscription d'un user
module.exports.signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    // Récupération de l'email et du password dans la requete
    const user = new UserModel({ email, password: hashedPassword });
    // Sauvegarde du user dans la database
    await user.save();
    res.status(201).json({ message: 'Utilisateur enregistré ! :' + user._id });
  } catch (err) {
    // En cas d'erreur renvoi d'un code 400
    res.status(400).json({ message: 'User non enregistré:' + err });
  }
};

//  Connection d'un user
module.exports.logIn = async (req, res) => {
  UserModel.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, {
              expiresIn: maxAge,
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

/*
//  Pour se déconnecté
module.exports.logout = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  console.log('joky:', token);
  token(jwt, '', { expiresIn: 1 });
};
*/
