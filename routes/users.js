var router = require('express').Router();
var bcrypt = require('bcryptjs');
var User = require('../models/user');
var jqt =require('jsonwebtoken');
var constants =require('../config/constrants');


router.post('/',(req,res)=>{
	var user= new User({
		username: req.body.user.username,
		email: req.body.user.email,
		passhash:bcrypt.hashSync(req.body.user.pwd, 10)
	})

	user.save().then(

		(newuser)=>{
			var sessionToken = jwt.sign(newuser._id, constants.JWT_SECRETS,{ expireIn:60*60*24 })
			res.json({
				user:newuser,
				message:'success'
			});
		},
		(err)=>{
			res.send(500, err.message);
		}
	);
});

module.exports=router;
