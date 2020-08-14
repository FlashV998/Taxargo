const express=require("express");
const bodyParser=require('body-parser');
const authRoute=require('./routes/auth-routes/authRoutes');
const mongoose=require('mongoose');
const encrypt=require('mongoose-encryption');
const app=express();
app.set("view engine",'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// DB CONNECTION AND CREATION OF COLLECTION
mongoose.connect("mongodb://localhost:27017/rtiUserdb",{useNewUrlParser:true,useUnifiedTopology: true });

const userLoginSchema=new mongoose.Schema({
  email:String,
  password:String
});

const User= new mongoose.model("User", userLoginSchema); //here model is created or collection document is created namely User




// handle auth routes
app.use('/auth',authRoute);

app.get("/",function(req,res){

res.render("index");
});

app.get("/Form-page",function(req,res){

  res.render("Form-page.ejs");
  });

app.get("/register",function(req,res){
  res.render("register");

});

app.get("/login",function(req,res){
  res.render("login");
});

app.post("/register",function(req,res){
const newUser=new User({
  email:req.body.username,
  password:req.body.password
});

newUser.save(function(err){
  if(err){
    console.log(err);
  }
  else{
  res.render("Form-page");
  }
});

});


app.post("/login",function(req,res){
const CuserName=req.body.username;
const Cpassword=req.body.password;
User.findOne({email:CuserName},(err,foundUser)=>{
            if(err){
              console.log(err);
            }
            else{
               if(foundUser.password === Cpassword){
                 res.render("Form-page");
               } }
});
});

app.post("/Form-page",function(req,res){
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    console.log(firstName);

});  

  app.listen(3000, function() {
    console.log("Server started on port 3000");
  }); 