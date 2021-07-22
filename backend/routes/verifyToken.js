const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
  
    try{
        const token = req.header('Authorization');

        if(!token) return res.status(401).send({status:false})
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user=verified;
        console.log(req.user);
        next();
    } catch(err){
         res.status(401).send({status:false})
    }
}