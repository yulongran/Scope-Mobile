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
 * Fetch Review based on user_id and project_id
 * :return [
    {
        "project_id": 1,
        "milestone_number": 1,
        "milestone_description": "E/R Diagram"
    },
    {
        "project_id": 1,
        "milestone_number": 2,
        "milestone_description": "E/R D2gram"
    },
    {
        "project_id": 1,
        "milestone_number": 3,
        "milestone_description": "E/R "
    }
]
 */

router.post('/', function (req, res) {
    
    // Verify User token 
    if (!auth(req)) {
        res.status(401).send("Invalid User")
    }
    const project_id = req.headers.project_id
    var sql = 'SELECT * FROM Milestone WHERE project_id = ?'
    connection.query(sql, project_id, function (err, result) {
        if (err) throw err

        res.send(result)
    })
})

module.exports = router