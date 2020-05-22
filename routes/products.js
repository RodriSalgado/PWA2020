var express = require ('express');
var router = express.Router();

var productsController = require("../controllers/productsController");

router.get('/', productsController.getAll);
router.get('/featured', productsController.getFeatured);
router.get('/:id', productsController.getById);
router.get('/category/:id', productsController.getByCategory);

router.post('/', productsController.create);

router.put('/:id', productsController.update);

router.delete('/:id', productsController.delete);

module.exports = router;