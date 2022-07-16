const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

//  Routes: Inscription et connexion/déconnexion
router.post('/register', authController.signUp);

//  Routes: Crud user
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getOneUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
