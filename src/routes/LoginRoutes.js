const router = require('express').Router();
var passport = require('passport');

const loginController = require('../controllers/login');

router.post('/login', passport.authenticate('local'), loginController.login);
router.get('/logout', loginController.logout);

module.exports = router;