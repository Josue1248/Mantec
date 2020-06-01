const router = require('express').Router();

router.use('/users', require('./UsersRoutes'));
router.use('/equip', require('./EquipRoutes'));
router.use('/orders', require('./OrdersRoutes'));
router.use('/', require('./LoginRoutes'));

module.exports = router;