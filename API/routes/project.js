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

/* 
* Get Project 
* Fetch Project Data by user id
* Format: 
[
  {
        "project_id": 1,
        "project_title": "Sample Project",
        "project_course": "CS122",
        "project_institution": "SJSU",
        "project_startDate": "2018-08-21T07:00:00.000Z",
        "project_endDate": "2019-12-09T08:00:00.000Z",
        "project_description": "Zipline is a Pythonic algorithmic trading library. It is an event-driven system for backtesting. Zipline is currently used in production as the backtesting and live-trading engine powering Quantopian -- a free, community-centered, hosted platform for building and executing trading strategies."
  },
  {
        "project_id": 1,
        "project_title": "Sample Project",
        "project_course": "CS122",
        "project_institution": "SJSU",
        "project_startDate": "2018-08-21T07:00:00.000Z",
        "project_endDate": "2019-12-09T08:00:00.000Z",
        "project_description": "Zipline is a Pythonic algorithmic trading library. It is an event-driven system for backtesting. Zipline is currently used in production as the backtesting and live-trading engine powering Quantopian -- a free, community-centered, hosted platform for building and executing trading strategies."
    },
]
*/
router.post('/', function (req, res) {
  const user_id = jwt.decode(req.headers.auth_token, "adadaasdasd")._id

  // No Token or Token is not valid
  if (!user_id) {
    res.status(404).send('User not verified or do not have access')
  }

  // Query Project data based on the user_id
  var sql = 'SELECT * FROM Project WHERE project_id IN (SELECT project_id from UserHasProject WHERE user_id =?)'
  connection.query(sql, user_id, function (err, result) {
    if (err) throw err

    // Parse Date to "yyyy/mm/dd" format
    result.forEach(element => {
      element.project_startDate = element.project_startDate.toISOString().slice(0, 10)
      element.project_endDate = element.project_endDate.toISOString().slice(0, 10)
    });
    res.send(result);
  })

});

/**
 * Get team info in specific project
 */

router.post('/team', function (req, res) {
  if (!auth) {
    res.status(401).send("Invalid User")
  }

  const project_id = req.headers.project_id

  // Query team data based on the project_id
  var sql = 'SELECT * FROM  ProjectHasTeam WHERE project_id = ?'
  connection.query(sql, project_id, function (err, result) {
    if (err) throw err

    res.send(result);
  })
});

/**
 * Get team member in specific project and team
 */
router.post('./team/team_member', function (req, res) {
  if (!auth) {
    res.status(401).send("Invalid User")
  }

  const project_id = req.headers.project_id
  const team_number = req.headers.team_number

  // Query team data based on the project_id
  var sql = 'SELECT * FROM  ProjectHasTeam WHERE project_id = ?'
  connection.query(sql, project_id, function (err, result) {
    if (err) throw err

    res.send(result);
  })

})


/**
 * Get Project Team members
 */
router.post('/member', function (req, res) {
  if (!auth) {
    res.status(401).send("Invalid User")
  }

  const project_id = req.headers.project_id

  // Query User data based on the project_id
  var sql = 'SELECT user_firstname, user_lastname FROM User WHERE user_id IN (SELECT user_id from UserHasProject WHERE project_id =?)'
  connection.query(sql, project_id, function (err, result) {
    if (err) throw err

    res.send(result);
  })

})

/**
 * Fetch project data based on the project_id
 */
router.post('/project', function (req, res) {
  if (!auth) {
    res.status(401).send("Invalid User")
  }

  const project_id = req.headers.project_id

  // Query team data based on the project_id
  var sql = 'SELECT * FROM  Project WHERE project_id = ?'
  connection.query(sql, project_id, function (err, result) {
    if (err) throw err

    res.send(result);
  })
});


/**
 * Create a new project
 */

router.post('/projectCreation', function (req, res) {
  if (!auth) {
    res.status(401).send("Invalid User");
  }
  const project_title = req.headers.project_title;
  const project_course = req.headers.project_course;
  const project_institution = req.headers.project_institution;
  const project_startDate = req.headers.project_startdate;
  const project_endDate = req.headers.project_enddate;
  const project_description = req.headers.project_description;

  // Add project in project table
  var sql = 'INSERT INTO Project (project_title, project_course, project_institution, project_startDate, project_endDate, project_description) VALUES (?,?,?,?,?,?)'
  var variable = [project_title, project_course, project_institution, project_startDate, project_endDate, project_description]
  connection.query(sql, variable, function (err, result) {
    if (err) throw err
    res.send(result)
  })
})


/**
 * Update User Has Project table with project and user id
 */
router.post('/UpdateUserHasProjectTable', function (req, res) {
  if (!auth) {
    res.status(401).send("Invalid User");
  }
  const token = req.headers.auth_token;
  const secret = "adadaasdasd"
  const verifed = jwt.verify(token, secret);
  const user_id = verifed._id;
  const project_id = req.headers.project_id;

  // Add project in project table
  var sql = 'INSERT INTO UserHasProject (user_id, project_id) VALUES (?,?)'
  var variable = [user_id, project_id]
  connection.query(sql, variable, function (err, result) {
    if (err) throw err
    res.send("Success")
  })
})


module.exports = router;
