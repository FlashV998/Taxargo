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
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif'];

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb',extended: true}));



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
const userFileData=new mongoose.Schema({
  file1: {
    type: Buffer,
    required: true
  },
  file1Type: {
    type: String,
    required: true
  }
    
});

const userPersonalData=new mongoose.Schema({
  fname:{
    type:String,
    required:true
  },
  lname:{
    type:String,
      required:true
  },
  flatno:{
    type:String,
    required:true
  },
  premiseno:{
    type:String
  },
  streetname:{
    type:String,
    required:true
  },
  pincode:{
    type:Number,
    required:true
  },
  localityname:{
    type:String,
    required:true
  },
  townname:{
    type:String,
    required:true
  },
  statename:{
    type:String,
    required:true
  },
  mobileno:{
    type:String,
    required:true
  },
  savefile1:[userFileData]
  
}); 


userLoginSchema.plugin(passportLocalMongoose);
userLoginSchema.plugin(findOrCreate);

const User= new mongoose.model("User", userLoginSchema);
const UserPersonal=new mongoose.model("UserPersonal",userPersonalData);
const UserFile=new mongoose.model("UserFile",userFileData);

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
    console.log(profile);
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

app.post("/formpage", async (req, res) => {
  const file1 = new UserPersonal({
    fname: req.body.firstName,
    lname: req.body.lastName,
    flatno: req.body.flatNo,
    premiseno: req.body.premiseName,
    streetname:req.body.roadName,
    pincode:req.body.pincode,
    localityname:req.body.locality,
    townname:req.body.city,
    statename:req.body.state,
    mobileno:req.body.mobile
    });
  saveFiles1(file1, req.body.cover1)
  saveFiles1(file1, req.body.cover2)
  saveFiles1(file1, req.body.cover3)
  saveFiles1(file1, req.body.cover4)
  try {
    const newBook = await file1.save();
     console.log(file1);
   res.redirect("/");
  } catch {
    res.redirect("/login");
  }
})


function saveFiles1(file1, coverEncoded) {
  if (coverEncoded == null) return
  const cover = JSON.parse(coverEncoded)
  if (cover != null && imageMimeTypes.includes(cover.type)) {
      file1.savefile1.push({file1:new Buffer.from(cover.data, 'base64'),file1Type:cover.type});
    }
}

// async function renderNewPage(res, book, hasError = false) {
//   try {
//     const authors = await Author.find({})
//     const params = {
//       authors: authors,
//       book: book
//     }
//     if (hasError) params.errorMessage = 'Error Creating Book'
//     res.render('books/new', params)
//   } catch {
//     res.redirect('/books')
//   }
// }




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