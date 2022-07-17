const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

//  Routes: Inscription et connexion/déconnexion
router.post('/register', authController.signUp);
router.post('/login', authController.logIn);
//router.get('/logout', authController.logout);

//  Routes: Crud user
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getOneUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.patch('/follow/:id', userController.follow);
router.patch('/unfollow/:id', userController.unfollow);

module.exports = router;
