var jwt =require('jsonwebtoken');
var User = require('../models/sdfasdfasdfasd');
var constants = require('../config/constants');

module.exports =(req,res,next)=>{
  var sessionToken=req.headers.authorization
  if(!req.body.user&& sessionToken){
    //jwt check
    jwt.verify(sessionToken, constants.JWT_SECRETS,(err, decodedId)={
      if(decodedId){
        User.findOne({_id:decodedId}).then((user)=>{
          req['user']=user;
          next();
        },(err)={
          //if there is an error in resquest to find users
          res.send(401,'not authorized')
        })
        //no decodedId
      }else{
        res.send(401,'not authorized')
      }
    })
  } else{
    next()
  }
}
