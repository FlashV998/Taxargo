//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/rtiUserdb", {useNewUrlParser: true,useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);

const userLoginSchema = new mongoose.Schema ({
  email: String,
  password: String,
  googleId: String,
  
});

userLoginSchema.plugin(passportLocalMongoose);
userLoginSchema.plugin(findOrCreate);

const User= new mongoose.model("User", userLoginSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/formpage",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get("/",function(req,res){

  res.render("index");
  });
  

app.get("/auth/google",
  passport.authenticate('google', { scope: ["profile"] })
);

app.get("/auth/google/formpage",
  passport.authenticate('google', { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect to secrets.
    res.redirect("/formpage");
  });

app.get("/login", function(req, res){
  res.render("login");
});

app.get("/register", function(req, res){
  res.render("register");
});


app.get("/formpage",function(req,res){
  if(req.isAuthenticated()){
    res.render("formpage")
  }
  else{
    res.redirect("/login");
  }
  });

app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});

app.post("/register", function(req, res){

  User.register({username: req.body.username}, req.body.password, function(err, user){
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/formpage");
      });
    }
  });

});

app.post("/login", function(req, res){

  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err){
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/formpage");
      });
    }
  });

});







app.listen(3000, function() {
  console.log("Server started on port 3000.");
});







































// handle auth routes


// app.get("/auth/google",function(req,res){
// passport.authenticate("google",{scope:["profile"]})
// });

// app.get("/auth/google/FormPage", 
//   passport.authenticate('google', { failureRedirect: "/login" }),
//   function(req, res) {
//     res.redirect('/FormPage');
//   });


// app.get("/register",function(req,res){
//   res.render("register");

// });

// app.get("/login",function(req,res){
//   res.render("login");
// });


// app.get("/logout",function(req,res){
//   req.logout();
//   res.redirect("/");
// });

// app.post("/register",function(req,res){
//   User.register({username:req.body.username},req.body.password,function(err,user){
//     if(err){
//       console.log(err.message);
//        res.redirect("/register");}
        
//     else{
//       passport.authenticate("local")(req,res,function(){
//         res.redirect("/FormPage");
//       });
//     }
// }) ;
// });


// app.post("/login",function(req,res){
// const user=new User({
//  username:req.body.username,
//  password:req.body.password
// });

// user.login(user,function(err){
//   if(err){
//     console.log(err);
//   }
//   else{
//   passport.authenticate("local")(req,res,function(){
//     res.redirect("/FormPage");
//     });
//   }
// });
// });

// app.post("/FormPage",function(req,res){
//     const firstName=req.body.firstName;
//     const lastName=req.body.lastName;
//     console.log(firstName);

// });  

//   app.listen(3000, function() {
//     console.log("Server started on port 3000");
//   }); 