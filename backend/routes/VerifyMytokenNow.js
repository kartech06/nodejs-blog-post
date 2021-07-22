const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
   
    try{
        res.send({status:true,
        data: req.user})
    } catch(err){
        res.send({status:false})
    }
}