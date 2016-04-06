var express = require('express');
var userMethods = require('./db/user');
var aws_s3 = require('./db/aws');

var router = express.Router();

// AWS Routes
router.post('/api/sign_s3', aws_s3.sign);

// Account delete
router.delete('/api/user/delete/:id', userMethods.delete);

module.exports = router;