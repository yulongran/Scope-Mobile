module.exports = function(req, res, next){
    console.log(req.body)
    const token = req.body('auth_token');
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