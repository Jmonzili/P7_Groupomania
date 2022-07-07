const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

//  Vérifie si le user existe dans la database
module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
    //  Vérifie si le token est valable
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
        //  On retire le token si il n'est pas valable 
                res.locals.user = null;
                res.cookie('jwt', '', { maxAge: 1 });
                next();
            } else {
        //  Si le token est valable
                console.log("decodedToken:", decodedToken)
                let user = await UserModel.findById(decodedToken.id);
//  On sais qui est le user en comparant l'id du token avec les ids de la database
                res.locals.user = user;
                console.log("res.locals.user:", res.locals.user);
                next();
            }
        })
    } else {
//  On passe a null si le token est absent
        res.locals.user = null;
        next();
    }
}

//  Premet la connection automatique si le token est toujour valide
module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log({ err });
            } else {
                console.log("decodedToken.id:", decodedToken.id);
                next();
            }
        })
    } else {
        console.log("No token !");
    }
};