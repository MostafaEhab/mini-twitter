const mongoose = require('mongoose');
const express = require("express");

const db = require('./config/keys').mongoURI;
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const User = require("./models/User");
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/", (req, res)=> {
	const user = new User({
		handle: "Mostafa",
		email: "Mostafa@gmail.com",
		Password:"tEsT1234"
	})
   user.save()
	res.send("Hello World")
});

app.use("/api/users", users);
app.use("/api/tweets", tweets);
app.use(passport.initialize());
//app.use(passport.session());
//require('../config/passport.js')(passport);

const port = process.env.PORT || 2000; 
app.listen(port, () => console.log(`Server is running on port ${port}`));





