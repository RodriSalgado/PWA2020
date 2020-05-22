var express = require('express');
var router = express.Router();

var mainController = require("../controllers/adminController");

router.get('/', mainController.getAll);
router.get('/:id', mainController.getById);

router.post('/register', mainController.create);
router.post('/login', mainController.login);

module.exports = router;
