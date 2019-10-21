var jwt = require('jsonwebtoken')

module.exports = function(req, res, next){
    const token = req.headers.auth_token;
    const secret = "adadaasdasd"
    console.log(req.headers.auth_token)
    if(!token)
    {
        return res.status(401).send('Access Denied');
    }

    try{
        console.log("Verfied");
        const verifed = jwt.verify(token, secret);
        req.user = verifed._id;
        res.send("Verfied")
    }
    catch (err)
    {
        console.log(err)
        res.status(400).send('Invalid Token');
    }
}