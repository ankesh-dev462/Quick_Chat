const express=require("express");
const router=express.Router({});
const validate=require("../models/user.js");
const passport=require("passport");

router.get("/signup",(req,res)=>{
    res.render("users/signup");
})
router.post("/signup",async(req,res)=>{
    let {username,email,password}=req.body;
        const newUser=new validate({email,username});
        let registerUser=await validate.register(newUser,password);
        console.log(registerUser);
        req.flash("success","Welcome to wonderlust");
        res.redirect("/chat");

})

router.get("/login",(req,res)=>{
    res.render("users/login");
})
router.post("/login",passport.authenticate('local', { failureRedirect: '/login',failureFlash:true}),(req,res)=>{
    req.flash("success","Welcome to wonderlust");
res.redirect("/chat");
})
module.exports=router;

