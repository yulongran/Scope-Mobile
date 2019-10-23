var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var verify = require('../function/Authorization')
var jwt = require('jsonwebtoken')
var connection = mysql.createConnection(
  {
    host: 'localhost',
    user: 'Yulong',
    password: 'ADMIN',
    database: 'Scope_Mobile'
  }
)

/* GET users listing. */
router.get('/login', function (req, res, next) {

  connection.query('SELECT * FROM User WHERE user_email = "apaiton2@facebook.com"', function (err, result) {
    if (err) throw err
    res.send(result)

  })
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
router.post('/register', async function (req, res, next) {
  console.log(req.body)
  res.send('Register page')
});

/**
 * User Login
 */
const secret = "adadaasdasd"
router.post('/login', async function (req, res, next) {
  var sql = 'SELECT * FROM User WHERE user_email = ?';
  var username = req.body.username;
  connection.query(sql, username, function (err, result) {
    if (err) throw err
    // Check if user exists in our database
    if (result[0].user_password = undefined) {
      console.log('User does not exist')
    }
    // User password matching
    if (result[0].user_password = req.body.password) {
      console.log('Log in')
      // Create and Assign JWT token
      const token = jwt.sign({ _id: result[0].user_id }, secret);
      res.header('auth_token', token).send(token)
    }
  })
});

/**
 * User status check
 */

router.post('/status', verify, async function (req, res, next) {
});

module.exports = router;
