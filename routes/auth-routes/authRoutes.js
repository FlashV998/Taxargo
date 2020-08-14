const router=require('express').Router();

//auth login
router.get("/login",(req,res)=>{
res.render('login'); //login page
});

// auth logout

router.get("/logout",(req,res)=>{
    res.render('logout'); //logout page
});


// AUTH WITH GOOGLE

router.get('/google',(req,res)=>{
res.sender('logging in with google');
});



module.exports=router;