'use strict';
var express = require('express');
var controller = require('./drug.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
//router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
