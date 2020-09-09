const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = function(req, res, next){
    // get token from the header
    const token = req.header('x-auth-token');

    // Check if no token
    if(!token){
        return res.status(401).json({msg: 'No token authorization acess denied'})
    }

    try{
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        console.log(decoded)
        req.user = decoded.user;
        next();
    }catch(err){
        res.status(401).json({msg: "Token is not valid"});
    }
}