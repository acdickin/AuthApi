var router= require('express').Router()
var bcrypt= require('bcryptjs')
var jwt= require('jsonwebtoken')
var constants=('../config/constants')
var User = require('../models/user')

router.post('/',(req,res)=>{
	//checks user
	User.findOne({username:req.body.user.username}).then(
		(user)=>{
			if (user){
				bcrypt.compare(req.body.user.pwd, user.passhash, (err,matches)=>{
					if(matches){
						//returns token
						var sessionToken=jwt.sign(user._id, constants.JWT_SECRET, {expiresIn:24*60*60})
						res.json({
							user:user,
							message:'successfully authed',
							sessionToken:sessionToken
						})
					} else{
						res.json({
							user:{},
							message:'failed to auth',
							sessionToken:''
						})
					}
				})
			}else{
				res.json({
					user:{},
					message:'failed to auth',
					sessionToken:''
				})
			}
		}
		(err)=>{
			//user not found
			res.josn(err)
		}
	)
})
