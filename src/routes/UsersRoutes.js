const router = require('express').Router();

const userController = require('../controllers/users');

router.post('/add',  userController.addUser);
router.get('/:email',  userController.getUser);
router.put('/:email',  userController.updateUser);
router.delete('/:email',  userController.deleteUser);
router.get('/',  userController.getAll);

// router.post('/add', ensureAuthenticated, userController.addUser);
// router.get('/:email', ensureAuthenticated, userController.getUser);
// router.put('/:email', ensureAuthenticated, userController.updateUser);
// router.delete('/:email', ensureAuthenticated, userController.deleteUser);
// router.get('/', ensureAuthenticated, userController.getAll);

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.send({msg: "No has iniciado sesion"});
}

module.exports = router;