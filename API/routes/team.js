var express = require('express');
var router = express.Router();
var verify = require('../function/Authorization')
var mysql = require('mysql')
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
 * Get team info in specific project
 */

router.post('/', function (req, res) {
  if (!auth) {
    res.status(401).send("Invalid User")
  }

  const project_id = req.headers.project_id

  // Query team data based on the project_id
  var sql = 'SELECT * FROM  Team WHERE project_id = ?'
  connection.query(sql, project_id, function (err, result) {
    if (err) throw err

    res.send(result);
  })
});

/**
 * Get team member in specific project and team
 */
router.post('/member_size', function (req, res) {
  if (!auth) {
    res.status(401).send("Invalid User")
  }

  const project_id = req.headers.project_id
  const team_number = req.headers.team_number
  // Query team data based on the project_id
  var sql = 'SELECT * FROM  TeamHasUser WHERE project_id = ? AND team_number = ?'
  var varibale = [project_id, team_number]
  connection.query(sql, varibale, function (err, result) {
    if (err) throw err

    res.send(result);
  })
})


/**
 * Get team member in specific project and team
 */
router.post('/member', function (req, res) {
  if (!auth) {
    res.status(401).send("Invalid User")
  }

  const project_id = req.headers.project_id
  const team_number = req.headers.team_number
  // Query team data based on the project_id
  var sql = 'SELECT * FROM  User WHERE user_id IN (SELECT user_id from TeamHasUser WHERE project_id = ? AND team_number = ?)'

  //'SELECT user_firstname, user_lastname FROM User WHERE user_id IN (SELECT user_id from UserHasProject WHERE project_id =?)'
  var varibale = [project_id, team_number]
  connection.query(sql, varibale, function (err, result) {
    if (err) throw err

    res.send(result);
  })
})

/**
* Update User Has Project table with project and user id
*/
router.post('/delete', function (req, res) {
  if (!auth) {
    res.status(401).send("Invalid User");
  }
  const project_id = req.headers.project_id;
  const team_number = req.headers.team_number;

  // Add project in project table
  var sql = 'DELETE FROM TEAM WHERE project_id = ? AND team_number =?'
  var varibale = [project_id, team_number]
  connection.query(sql, varibale, function (err, result) {
    if (err) throw err
    res.status(200).send("Success")
  })
})

module.exports = router