const router = require('express').Router();

const OrderController = require('../controllers/orders');

router.post('/add', OrderController.addOrder);
router.get('/:id', OrderController.getOrder);
router.put('/:id', OrderController.updateOrder);
router.delete('/:id', OrderController.deleteOrder);
router.get('/', OrderController.getAll);

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.send({status: 403});
}

module.exports = router;