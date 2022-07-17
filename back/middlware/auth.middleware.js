const jwt = require('jsonwebtoken');

// Authentification par le TOKEN
module.exports.authUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    // Décodage du token via la clef secret
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    const userId = decodedToken.userId;
    req.auth = { userId };

    // Vérifi si l'id du token est connu de la database
    if (req.body.userId && req.body.userId !== userId) {
      // Bloqué si inconnu
      throw 'User ID non valable !';
    } else {
      //  Passe a la suite si reconnu
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error | 'Requête non authentifiée !' });
  }
};
