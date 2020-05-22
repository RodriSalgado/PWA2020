var express = require('express');
var router = express.Router();

var mainController = require("../controllers/usersController");

router.get('/', mainController.getAll);
router.get('/:id', mainController.getById);

router.post('/register', mainController.create);

module.exports = router;
