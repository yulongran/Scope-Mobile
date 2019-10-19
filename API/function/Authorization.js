const jwt = require('jsonwebtoken');

function auth(req, res, next){
    const token = req.header('auth-token');
    if(!token)
    {
        return res.status(401).send('Access Denied');
    }

    try{
        const verifed = jwt.verify(token, 'secret');
        req.user = verified;
    }
    catch (err)
    {
        res.status(400).send('Invalid Token');
    }
}