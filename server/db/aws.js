var aws = require('aws-sdk');
var http = require('http');
var  path = require('path');
var  crypto = require('crypto');

var bucket = process.env.S3_BUCKET;
var awsKey = process.env.AWS_ACCESS_KEY;
var secret = process.env.AWS_SECRET_KEY;

var aws_s3 = {};

aws_s3.sign = function(req, res, next) {
 
    var fileName = req.body.fileName;
    var expiration = new Date(new Date().getTime() + 1000 * 60 * 5).toISOString();
 
    var policy = { 
        "expiration": expiration,
        "conditions": [
        {"bucket": bucket},
        {"key": fileName},
        {"acl": 'public-read'},
        ["starts-with", "$Content-Type", ""],
        ["content-length-range", 0, 524288000]
    ]};
 
    // Create signature
    policyBase64 = new Buffer(JSON.stringify(policy), 'utf8').toString('base64');
    signature = crypto.createHmac('sha1', secret).update(policyBase64).digest('base64');

    // console.log("Informations sent");
    res.json({bucket: bucket, awsKey: awsKey, policy: policyBase64, signature: signature});
}

module.exports = aws_s3;
