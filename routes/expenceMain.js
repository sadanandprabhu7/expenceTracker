const path = require('path');

const express = require('express');

const mainController = require('../controllers/expenceMain');

const router = express.Router();

router.post('/save',mainController.addDetails)

router.get('/',mainController.showDeails)

router.delete('/:id',mainController.deleteDeails)

module.exports=router;