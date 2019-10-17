var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.send('Login page');
});


/**
 * Handles Users registration
 * JSON format : {
                        firstname, firstname,
                        lastname: lastname,
                        username: username,
                        password: password,
                  }
 */
router.post('/register', function(req, res, next)
{
  console.log(req.body)
  res.send('Register page')
});


module.exports = router;
