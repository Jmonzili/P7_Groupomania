const router = require('express').Router();
const authController = require('../controllers/auth.controller');

//  Routes: Inscription et connexion/déconnexion
router.post('/register', authController.signUp);

module.exports = router;
