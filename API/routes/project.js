var express = require('express');
var router = express.Router();
var verify = require('../function/Authorization')

/* GET home page. */
router.post('/', verify, function(req, res) {
  });
  
module.exports = router;
