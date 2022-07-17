const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, logInErrors } = require('../utils/errors.utils');
const maxAge = 3 * 24 * 60 * 60 * 1000;

//  Inscription d'un user
module.exports.signUp = async (req, res) => {
  console.log('req.body:', req.body);
  const { email, password } = req.body;

  try {
    const user = await UserModel.create({ email, password });
    res.status(201).json({ message: 'Utilisateur enregistré ! :' + user._id });
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(400).send({ errors });
  }
};

//  Connection d'un user
module.exports.logIn = async (req, res) => {
  const { email, password } = req.body;
  console.log('Joky :', req);
  try {
    const user = await UserModel.login(email, password);

    //res.cookie('jwt', token, { httpOnly: true, maxAge });
    res.status(200).json({
      userId: user._id,
      token: jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, {
        expiresIn: maxAge,
      }),
    });
  } catch (err) {
    const errors = logInErrors(err);
    res.status(500).json({ errors });
  }
};

/*
//  Pour se déconnecté
module.exports.logout = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  console.log('joky:', token);
  token(jwt, '', { expiresIn: 1 });
};



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
*/
