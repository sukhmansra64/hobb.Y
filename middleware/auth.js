const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    //Get token
    const token = req.header('X-AUTH-TOKEN');
    const secret = process.env.JWT_SECRET

    //Check if there's a token
    if(!token){
        return res.status(401).json({msg:'No token, authorization denied'});
    }

    try{
        const decoded = jwt.verify(token,secret);

        req.user = decoded.user;
        next();
    }catch(err){
        res.status(401).json({msg:'Token is invalid'});
    }
};