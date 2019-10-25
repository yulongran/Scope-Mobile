var jwt = require('jsonwebtoken')

module.exports = function(req){
    const token = req.headers.auth_token;
    const secret = "adadaasdasd"
    if(!token)
    {
        return false
    }

    try{
        const verifed = jwt.verify(token, secret);
        if(verifed)
        {
            return true
        }
    }
    catch (err)
    {
        throw err
    }
}