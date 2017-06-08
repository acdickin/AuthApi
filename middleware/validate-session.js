var jwt =require('jsonwebtoken');
var User = require('../models/user');
var constants = require('../config/constants');

module.exports =(req,res,next)=>{
  var sessionToken=req.headers.authorization
  if(!req.body.user&& sessionToken){
    //jwt check
    jwt.verify(sessionToken, constants.JWT_SECRETS,(err, decodedId)={
      if(decodedId){
        User.FindOne({_id:decodedId}).then((user)=>{
          req['user']=user;
          next();
        },(err)={
          //if there is an error in resquest to find user
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
