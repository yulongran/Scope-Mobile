var express = require('express');
var router = express.Router();
var mysql = require('mysql')
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

router.post('/login', async function (req, res, next) {

  var sql = 'SELECT * FROM User WHERE user_email = ?';
  var username = req.body.username;
  connection.query(sql, username, function (err, result) {
    if (err) throw err
    console.log(result)
    // Check if user exists in our database
    if (result.user_password = undefined) {
      console.log('User does not exist')
    }

    // User password matching
    if (result.user_password = req.body.password) {
      console.log('Log in')
      // Create and Assign JWT token
      const token = jwt.sign({ _id: result.user_id }, 'secret');
      res.header('auth-token', token).send(token);
    }
  })


});

module.exports = router;
