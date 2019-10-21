module.exports = function(req, res, next){
    const token = req.headers.auth_token;
    console.log(req.headers.auth_token)
    if(!token)
    {
        return res.status(401).send('Access Denied');
    }

    try{
        const verifed = jwt.verify(token, 'secret');
        console.log(verifed);
        req.user = verified;
    }
    catch (err)
    {
        res.status(400).send('Invalid Token');
    }
}