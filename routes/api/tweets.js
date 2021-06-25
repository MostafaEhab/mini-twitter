const express = require("express");
const router = express.Router();
//const passport = require("passport");
const validateTweetInput = require ("../../validation/tweets");
const Tweet = require("../../models/Tweet");
//require('../../config/passport')(passport)
router.get("/test", (req, res) => res.json({ msg: "This is the tweets route" }));
const auth = require('../../auth');

/*router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        console.log("555");
      const { errors, isValid } = validateTweetInput(req.body);
      
      if (!isValid) {
        return res.status(400).json(errors);
      }
  
      const newTweet = new Tweet({
        text: req.body.text,
        //user: req.user.id
      });
  
      newTweet.save().then(tweet => res.json(tweet));
    }
  );*/
  
  router.post('/',
   auth,
    (req, res) => {
        console.log("555");
      const { errors, isValid } = validateTweetInput(req.body);
      
      if (!isValid) {
        return res.status(400).json(errors);
      }
  
      const newTweet = new Tweet({
        text: req.body.text,
        //user: req.user.id
      });
  
      newTweet.save().then(tweet => res.json(tweet));
    }
  )

module.exports = router;