//  Les différent cas d'erreurs renvoyer au client

//   Erreur lors l'inscription
module.exports.signUpErrors = (err) => {
  let errors = { email: '', password: '' };
  //  Erreur sur l'email
  if (err.message.includes('email')) errors.email = 'Email incorrect';
  //  Erreur sur le most depasse
  if (err.message.includes('password'))
    errors.password = 'Le mot de passe doit avoir 6 carractères minimum';

  //  Email existant
  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('email'))
    errors.email = 'Cet email est deja enregistré';

  return errors;
};

//  Erreurs à la connection
module.exports.logInErrors = (err) => {
  let errors = { email: '', password: '' };
  // Erreur email
  if (err.message.includes('email')) errors.email = 'Email inconnu';
  //  Erreur mot de passe
  if (err.message.includes('password'))
    errors.password = 'Mot de passe incorrect';

  return errors;
};
