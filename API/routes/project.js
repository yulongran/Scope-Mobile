var express = require('express');
var router = express.Router();
var verify = require('../function/Authorization')
var mysql = require('mysql')
var jwt   = require('jsonwebtoken')
var connection = mysql.createConnection(
    {
      host: 'localhost',
      user: 'Yulong',
      password: 'ADMIN',
      database: 'Scope_Mobile'
    }
  )

/* GET home page. */
router.post('/', function(req, res) {
        const user_id  = jwt.decode(req.headers.auth_token, "adadaasdasd")._id
        // No Token or Token is not valid
        if(!user_id)
        {
            res.status(404).send('User not verified or do not have access')
        }

        var sql = 'SELECT * FROM UserHasProject WHERE user_id =?';
        var ids = []
        var projects = []
        connection.query(sql, user_id, function(err, result)
        {
            if(err) throw err

            result.forEach(item =>
                {
                    ids.push(item.project_id)
                })
        })
        // Query Projects for each project id
        ids.forEach(id =>
            {
                
            })

  });
  
module.exports = router;
