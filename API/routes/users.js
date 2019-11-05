var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var verify = require('../function/Authorization')
var jwt = require('jsonwebtoken')
var auth = require('../function/Authentication')
var connection = mysql.createConnection(
  {
    host: 'localhost',
    user: 'Yulong',
    password: 'ADMIN',
    database: 'Scope_Mobile'
  }
)

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


/**
 * Get all user with search firstname and lastname
 */

router.post('/people', function (req, res) {
  // Verify User token 
  if (!auth(req)) {
    res.status(401).send("Invalid User")
  }

  const user_firstname = req.headers.user_firstname
  const user_lastname = req.headers.user_lastname
  const variable = [user_firstname, user_lastname]
  const sql = 'SELECT user_id , user_firstname , user_lastname FROM User WHERE user_firstname=? OR user_lastname=?'

  connection.query(sql, variable, function (err, result) {
    if (err) {
      throw err
    }

    res.send(result)
  })
})



/**
 * GET First name of the user by id
 */

router.post('/firstname', function (req, res) {
  // Verify User token 
  if (!auth(req)) {
    res.status(401).send("Invalid User")
  }

  const user_id = req.headers.user_id
  const sql = 'SELECT user_firstname FROM User WHERE user_id = ?'
  connection.query(sql, user_id, function (err, result) {
    if (err) throw err
    res.send(result)
  })
})


/**
 * GET user info by id
 */

router.post('/info', function (req, res) {
  // Verify User token 
  if (!auth(req)) {
    res.status(401).send("Invalid User")
  }
  const user_id = jwt.decode(req.headers.auth_token, "adadaasdasd")._id
  const sql = 'SELECT user_firstname, user_lastname, user_institution FROM User WHERE user_id = ?'
  connection.query(sql, user_id, function (err, result) {
    if (err) throw err
    res.send(result)
  })
})


module.exports = router;
