const router = require('express').Router();
const authController = require('../controllers/auth.controller');

// Auth
router.post("/register", authController.signUp)


module.exports = router