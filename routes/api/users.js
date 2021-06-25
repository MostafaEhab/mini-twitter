const express = require("express");
const router = express.Router();
const User = require ('../../models/User');
const bcrypt = require("bcryptjs") ;
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

router.get(
     "/current",
     passport.authenticate("jwt", {session: false}),
     (req,res)=>{
          res.send(req.user);
     }
)

router.post('/register', (req, res) => {
    const {errors,isvalid} = validateRegisterInput(req.body);
     if(!isvalid){
          return res.status(400).json(errors);
     }
      
	User.findOne({email: req.body.email })
     .then(user=> {
     	if(user){
     		return res.status(400).json({email: "A user is already registered with that email"})
     	} else {
     	const newUser = new User({
     		handle: req.body.handle,
     		email: req.body.email,
     		Password: req.body.Password
     	})
     	bcrypt.genSalt(10, (err,salt) => {
     		bcrypt.hash(newUser.Password, salt, (err, hash) => {
     			if(err) throw err;
     			newUser.Password = hash;
     			newUser.save()
     			.then((user) => res.json(user))
     			.catch(err => console.log(err))
     		})
     	})
     	}
     })
    })
 router.post('/login', (req,res) => { 

     const{errors, isvalid} = validateLoginInput(req.body);
     if(!isvalid) {
          return res.status(400).json(errors);
     }
     const email = req.body.email;
     const Password = req.body.Password;
     console.log("555");
     User.findOne({ email })
     .then(user => {
          if(!user) {
               return res.status(404).json({email: "This user does not exist. "});
          }
          bcrypt.compare(Password, user.Password)
           .then(isMatch => {
                if(isMatch){
                  const payload = { 
                   id: user.id,
                   handle: user.handle,
                   email: user.email
                  }
                  jwt.sign(
                    payload,
                    keys.secretOrKey,
                    { expiresIn: 3600 },
                    (err, token) => {
                         res.json({
                              success:true,
                              token: "Bearer " + token
                         });

                    }
                    )

          } else {
               return res.status(400).json({Password: "Incorrect"});
          }
          })
     })
 })
module.exports = router;