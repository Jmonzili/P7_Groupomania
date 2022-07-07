const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const maxAge = 3 * 24 * 60 * 60 * 1000;
const { signUpErrors, signIpErrors } = require('../utils/errors.utils')

//  Création du token
const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, { expiresIn: maxAge })
}

//  Inscription d'un user
module.exports.signUp = async (req,res) => {
    console.log("req.body:" , req.body)
    const { pseudo, email, password } = req.body

    try {
        const user = await UserModel.create({ pseudo, email, password });
        res.status(201).json({ user: user._id });
    }
    catch(err) {
        const errors = signUpErrors(err);
        res.status(400).send({ errors })
    }
}

//  Connection d'un user
module.exports.signIn = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge });
        res.status(200).json({ user: user._id })
    } catch (err) {
        const errors = signIpErrors(err);
        res.status(400).send({ errors });
    }
}

//  Déconnection
module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}