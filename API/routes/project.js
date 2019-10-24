var express = require('express');
var router = express.Router();
var verify = require('../function/Authorization')
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

module.exports = router;
