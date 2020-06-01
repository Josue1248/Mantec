const router = require('express').Router();

const EquipController = require('../controllers/equipment');

router.post('/add', EquipController.addEquip);
router.get('/:id', EquipController.getEquip);
router.put('/:id', EquipController.updateEquip);
router.delete('/:id', EquipController.deleteEquip);
router.get('/', EquipController.getAll);

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.send({status: 403});
}

module.exports = router;