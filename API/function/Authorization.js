var jwt = require('jsonwebtoken')

module.exports = function(req, res, next){
    const token = req.headers.auth_token;
    const secret = "adadaasdasd"
    if(!token)
    {
        return res.status(401).send('Access Denied');
    }

    try{
        const verifed = jwt.verify(token, secret);
        req.user = verifed._id;
        res.send("Verifed")
    }
    catch (err)
    {
        res.status(400).send('Invalid Token');
    }
}