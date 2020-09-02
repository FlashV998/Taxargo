//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocal=require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif'];
const fs=require("fs");
const Razorpay=require('razorpay');
const sendResetLink = require("./resetPasswordMail");
let instance = new Razorpay({
  key_id: 'rzp_test_6Mo0ReH3m1D3F8', // your `KEY_ID`
  key_secret: '3yeb9Qj5AmUve2f0nbFQVqXR' // your `KEY_SECRET`
})
const cors = require('cors');
const { log } = require('console');

const app = express();
app.use(cors())

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(express.json({limit:'1mb'}));
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
  username: String,
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
  function(accessToken, refreshToken, profile,cb) {
    console.log(profile);
    console.log(profile._json.email);
    // googleId: profile.id
    User.findOrCreate({username:profile._json.email}, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get("/",function(req,res){

  res.render("index");
  });
  

app.get("/auth/google",
  passport.authenticate('google', { scope: ["profile","email"] })
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

// app.get("/paymentpage",function(req,res){
//   res.render("Payment");
// })

app.get("/totalservice",function(req,res){
  fs.readFile('items.json', function(error, data) {
    if (error) {
      res.status(500).end()
    } else {
      res.render("Payment", {
        razorPublicKey: instance.key_id,
        items: JSON.parse(data)
      })
    
    }
  })  
})

app.get("/formpage",function(req,res){
  // if(req.isAuthenticated()){
    
  //   }
  // else{
  //   res.redirect("/login");
  // }
  res.render("formpage");
  });

  app.get("/forgotpassword",function(req,res){
  res.render("forgotpage");
  });

app.post("/orders",function(req,res){
  const options=req.body;
  try{
  instance.orders.create(options, async function(err, orderID) {
    if (err) {
            return res.status(500).json({
              message: "Something Went Wrong",
            });
          }
        return res.status(200).send(orderID);
       });
    }
  catch (err) {
    return res.status(500).json({
      message: "Something Went Wrong",
    });
    }
        
  
})


app.post("/verify",(req,res)=>{

})

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


app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});

app.post("/register", function(req, res){

  User.register({username:req.body.username}, req.body.password, function(err, user){
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

app.post("/forgot", (req, res) => {
  const UserEmail = req.body.email;
  
  User.findOne({username:UserEmail},(err,data)=>{
    if(err){
      console.log(err);
    }
    else if(data === null){
    console.log("User not found");
    }
    else {
      sendResetLink(data.username,data._id);
    }

    res.redirect("/register");
  });

  router.patch("/reset", (req, res) => {
    const thisRequest = getResetRequest(req.body.id);
    if (thisRequest) {
        const user = getUser(thisRequest.email);
        bcrypt.hash(req.body.password, 10).then(hashed => {
            user.password = hashed;
            updateUser(user);
            res.status(204).json();
        })
    } else {
        res.status(404).json();
    }
});

  
  
  //  if (thisUser) {
  //     const id = uuidv1();
  //     const request = {
  //         id,
  //         email: thisUser.email,
  //     };
  //     createResetRequest(request);
  //     sendResetLink(thisUser.email, id);
  // }
  // res.status(200).json();
});


function saveFiles1(file1, coverEncoded) {
  if (coverEncoded == null) return
  const cover = JSON.parse(coverEncoded)
  if (cover != null && imageMimeTypes.includes(cover.type)) {
      file1.savefile1.push({file1:new Buffer.from(cover.data, 'base64'),file1Type:cover.type});
    }
}




app.listen(3000, function() {
  console.log("Server started on port 3000.");
});






































