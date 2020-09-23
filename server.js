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
const flash = require('connect-flash');
let instance = new Razorpay({
  key_id: process.env.KEY_ID, // your `KEY_ID`
  key_secret: process.env.KEY_SECRET // your `KEY_SECRET`
})
const cors = require('cors');
const { log } = require('console');
const { isError } = require('util');
// const { default: AdminBro } = require('admin-bro');

const app = express();
app.use(cors())

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(express.json({limit:'1mb'}));
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb',extended: true}));


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

  mongoose.connect(`mongodb+srv://Admin-Rajeev:${process.env.MONGOPASSWORD}@cluster0.nf5ao.mongodb.net/rtiUserdb?retryWrites=true&w=majority`, {useNewUrlParser: true,useUnifiedTopology: true});
   mongoose.set("useCreateIndex", true);
   mongoose.set('useFindAndModify', false);
  
  

const userFileData=new mongoose.Schema({
  file1: {
    type: Buffer,
    // required: true
  },
  file1Type: {
    type: String,
    // required: true
  }
    
});

const userPersonalData=new mongoose.Schema({
  order_id:{
    type:String
  },
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

const userLoginSchema = new mongoose.Schema ({
  username: String,
  password: String,
  googleId: String,
  payment:{
    orderSelected:String,
    },
  orders:[{
      _id:false,
      product_name:String,
      razorpay_payment_id:String,
      razorpay_order_id:String,
      razorpay_signature:String
      }],
  userPersonalData:[userPersonalData],
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() }
  });

userLoginSchema.plugin(passportLocalMongoose);
userLoginSchema.plugin(findOrCreate);

const UserFile=new mongoose.model("UserFile",userFileData);
const UserPersonal=new mongoose.model("UserPersonal",userPersonalData);
const User= new mongoose.model("User", userLoginSchema);
     



//PASSPORT STARTEGY FILES
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
    callbackURL: "http://taxargo.com/auth/google/totalservice:customVID",
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
//PASSPORT STARTEGY FILES


app.get("/",function(req,res){
  res.render("index");
  });

app.get("/auth/google",
  passport.authenticate('google', { scope: ["profile","email"] })
);

app.get("/auth/google/totalservice:customVID",
  passport.authenticate('google', { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect to secrets.
    res.redirect("/totalservice"+req.params.customVID);
  });

  app.get("/register", function(req, res){
    res.render("register");
  });

app.get("/login", function(req, res){
  res.render("login");
  // const valu=req.flash("message")[0];
// console.log(valu);  
});


app.get("/totalservice:customVID",function(req,res,next){
  
  if(req.isAuthenticated()){
        fs.readFile('items.json', function(error,data) {
                if(error){
                      next(error);
                    }
                  
                 User.findOne({_id:req.params.customVID},(err,returneduser)=>{
                  if(err){ next(error);}
                           if(returneduser.orders.length === 0 ){
                                res.render("Payment", {
                                razorPublicKey: instance.key_id,
                                items: JSON.parse(data),
                                customVID:req.params.customVID
                                  });        
                            }
                        else{
                            res.redirect("/formpage"+req.params.customVID)}
                            });
                    })  
                } 
    else{res.redirect("/login");}    
  
  // catch(e){
  //   console.log("heloo"+e.message);
  // }

  });

app.get("/formpage:customVID",function(req,res){
  if(req.isAuthenticated()){
    User.findOne({_id:req.params.customVID},(err,data)=>{
      if(data.userPersonalData.length === 0 ){
        res.render("formpage",{customVID:req.params.customVID}); 
      }
    else{
        res.redirect("dashboard"+req.params.customVID);     
    }
  })

    
    }
  else{
    res.redirect("/login");
  }
  
  });

  app.get("/forgotpassword",function(req,res){
  res.render("forgotpage");
  });


  app.get("/reset:customResetId",function(req,res){
    const customResetId=req.params.customResetId;
    
  // console.log(data);
    User.findOne({_id:customResetId},function(err,data){
      if(err){
        console.log(err);
      }
      else{
        // console.log(data._id);
        res.render("resetPage",{customResetId:customResetId});
      }
    });
  })

  app.get("/dashboard:customVID",(req,res)=>{
      let uploadedFiles=[];
      let products=[];
      let option_value;
      fs.readFile('items.json', function(error, data) {
        if (error) {
          res.status(500).end()
          } 
    
          else{
    
    
      User.findOne({_id:req.params.customVID},(err,returneduser)=>{
              if(err){
                console.log(err);
                  }
            else{
                  returneduser.userPersonalData[0].savefile1.forEach(element => {
                  uploadedFiles.push(element.file1.toString('base64')) 
                }); 
                  returneduser.orders.forEach(element=>{
                      products.push(element.product_name)
                  });
                   
                        if(products.length === 2){
                            option_value=1
                          }
                          else if(products.includes("ITR")){
                            option_value=2;
                          }
                          else if(products.includes("GST")){
                            option_value=3;
                          }
                  res.render("dashboard",{items: JSON.parse(data),razorPublicKey: instance.key_id,customVID:req.params.customVID,data:returneduser,arr:uploadedFiles,option_value:option_value});
                  }
              })
            }
          })
       
       });

       
  app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
  });
  

  //POST REQUESTS
  app.post("/register", function(req, res){
     
    User.register({username:req.body.username}, req.body.password, function(err, user){
      if (err) {
        res.redirect("/register");
      } 
      else {
            res.redirect("/login");
        }});
         
  });


  app.post("/login", function(req, res){
  
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
 
    req.login(user, function(err){
      if (err) {
        console.log(err);
      } 
      else {
        passport.authenticate("local",{failureRedirect:"/login",failureFlash:true})(req, res, function(){
          User.findOne({username: req.body.username},(err,data)=>{
            if(err){console.log(err);}
            else{ res.redirect("/totalservice"+data._id);}
           
          })
          
        });
      }
    });
  
  });
//   app.post("/login", passport.authenticate("local"), function(req, res){
        
//   User.findOne({username: req.body.username},(err,data)=>{
//               if(err){console.log(err);}
//               else{ res.redirect("/totalservice"+data._id);}
// });
// })
// app.post('/login', function(req, res, next) {
//   const user = new User({
//         username: req.body.username,
//         password: req.body.password
//       });

//   passport.authenticate('local',{failureRedirect:"/login",failureFlash:true}, function(err, user, info) {
//     if (err) {
//       return next(err); // will generate a 500 error
//     }
//     // Generate a JSON response reflecting authentication status
//     if (! user) {
//       req.flash({message : 'authentication failed'})
//       //  res.status(401).send({ success : false, message : 'authentication failed' });
//     }
//     req.login(user, function(err){
//       if(err){
//         return next(err);
//       }
//       else{
//         User.findOne({username: req.body.username},(err,data)=>{
//           if(err){console.log(err);}
//           else{ 
//             // res.send({ success : true, message : 'authentication succeeded' });
//             res.redirect("/totalservice"+data._id);}
//             });
//          }
              
//     });
//   })(req, res, next);
// });  

  
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
        sendResetLink(data.username,data._id,1,null);
      }
  
      res.redirect("/register");
    });  
  });
  
  app.post("/reset/:customResetId", (req, res) => {
    console.log(req.params.customResetId);
    User.findOne({_id:req.params.customResetId}, function(err,returneduser){
      if(!User){
          console.log("No user exists");
      }
      if (req.body.resetpassword === req.body.confirmresetpassword){
            returneduser.setPassword(req.body.resetpassword, function(err) {
                returneduser.save(function(err){
                    console.log(err);
                    res.redirect("/register");
                });
            });
            // console.log(returneduser);
      } else {
         console.log("Passwords do not match")       ;
         res.redirect("/register");
      }
  });
  });
  
//FOR RAZOR PAYMENT PASSING ORDER ID AND TAKING PAYMENTS
app.post("/orders",function(req,res){
  const options={
    amount:req.body.amount,
    currency:req.body.currency,
    receipt:req.body.receipt,
    payment_capture:req.body.payment_capture,
  }
  customVID=req.body.customVID;
 

  try{
  instance.orders.create(options, async function(err, orderID) {
    if (err) {
            return res.status(500).json({
              message: "Something Went Wrong",
            });
          }
     else{   
       console.log(orderID);
      User.findOneAndUpdate({_id: customVID},{payment:{orderSelected:orderID.id}},(err)=>{
           if(err){console.log(err);}
          })
          return res.status(200).send(orderID);
      }     
        
       });
    }
  catch (err) {
    return res.status(500).json({
      message: "Something Went Wrong",
    });
    }
})


app.post("/verify:customVID",(req,res)=>{
    saveRazorData(req.body,req.params.customVID)
    .then(res.send({message:"success"}))
    .catch((err)=>console.log(err));
 
  })

  async function saveRazorData(data,customVID){
    const findUser=User.findOne({_id:customVID},async function(err,returnedUser){
      returnedUser.orders.push({ 
      product_name:data.product_name,  
      razorpay_payment_id:data.razorpay_payment_id,
      razorpay_order_id:data.razorpay_order_id,
      razorpay_signature:data.razorpay_signature});
      const data1= await returnedUser.save();      
 })
  
} 




app.post("/orderselection:customVID",(req,res)=>{
  User.findOne({_id:req.params.customVID},(err,returnedUser)=>{
    if(returnedUser.orders.length !== 0){
      res.redirect("/formpage"+req.params.customVID);
    }
    else{
      res.redirect("/totalservice"+req.params.customVID);
    }
  })

})
//FOR RAZOR PAYMENT PASSING ORDER ID AND TAKING PAYMENTS


app.post("/formpage:customVID",  (req, res) => {
  const customVID=req.params.customVID;
    saveFormData(req.body,req.params.customVID)
    .then(res.redirect("/login"))
    .catch((err)=>console.log(err));

})



 async function saveFormData(data,customVID){
   let username;
  const file1 = new UserPersonal({
    fname:         data.firstName,
    lname:         data.lastName,
    flatno:        data.flatNo,
    premiseno:     data.premiseName,
    streetname:    data.roadName,
    pincode:       data.pincode,
    localityname:  data.locality,
    townname:      data.city,
    statename:data.state,
    mobileno:data.mobile
    });
  await saveFiles1(file1, data.cover1)
  await saveFiles1(file1, data.cover2)
  await saveFiles1(file1, data.cover3)
  await saveFiles1(file1, data.cover4)
  await User.findOne({_id:customVID},async function(err,returnedUser){
      returnedUser.userPersonalData.push(file1);
      username=returnedUser.username;
      await returnedUser.save(); 
 })
  await sendResetLink(username,customVID,2,null);
  await sendResetLink(username,customVID,3,file1.savefile1);
}

function saveFiles1(file1, coverEncoded) {
  if (coverEncoded == null) return
  const cover = JSON.parse(coverEncoded)
  if (cover != null && imageMimeTypes.includes(cover.type)) {
      file1.savefile1.push({file1:new Buffer.from(cover.data, 'base64'),file1Type:cover.type});
    }
}




app.use(function(err,req,res,next){
  res.status(err.status || 500);
  res.send({
    error:{
      status:err.status,
      message:err.message+"lol"
    }
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000.");
});






































