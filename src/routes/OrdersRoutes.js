const router = require('express').Router();

const OrderController = require('../controllers/orders');

router.post('/add', ensureAuthenticated, OrderController.addOrder);
router.get('/:id', ensureAuthenticated, OrderController.getOrder);
router.put('/:id', ensureAuthenticated, OrderController.updateOrder);
router.delete('/:id', ensureAuthenticated, OrderController.deleteOrder);
router.get('/', ensureAuthenticated, OrderController.getAll);

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.send({status: 403});
}

module.exports = router;