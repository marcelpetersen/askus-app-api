var express = require('express');

var aws_s3 = require('./db/aws');

var router = express.Router();

// AWS Routes
router.post('/api/sign_s3', aws_s3.sign);


module.exports = router;