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


router.post('/addMilestone', function (req, res) {
    if (!auth) {
        res.status(401).send("Invalid User");
    }

    const milestone_number = req.headers.milestone_number;
    const milestone_description = req.headers.milestone_description;
    const milestone_startDate = req.headers.milestone_startdate;
    const milestone_endDate= req.headers.milestone_enddate;
    const project_id = req.headers.project_id;

    // Add project in project table
    var sql = 'INSERT INTO Milestone (project_id, milestone_number, milestone_description, milestone_startDate, milestone_endDate) VALUES (?,?,?,?,?)'
    var values = [project_id, milestone_number, milestone_description, milestone_startDate, milestone_endDate]

    connection.query(sql, values, function (err, result) {
        if (err) throw err
        res.send("Successs")
    })

})

module.exports = router;
