var express = require('express');
var router = express.Router();

var salesController = require("../controllers/salesController");

router.get('/', salesController.getAll);
router.get('/user/:id', salesController.getByUser);
router.get('/:id', salesController.getById);

router.post('/', salesController.create);

router.delete('/:id', salesController.delete);

module.exports = router;