const express=require("express");
const router=express.Router({mergeParams:true});
var flash = require('connect-flash');
const path=require("path");
const methodOverride=require("method-override");
const User=require("../models/chat.js");
const asyncWrap=require("../utils/wrapAsync.js");
const mongoose=require("mongoose");
const express_error=require("../utils/express_error.js");
const wrapAsync = require("../utils/wrapAsync.js");
const chat=require("../routes/chat.js");
router.get("/",asyncWrap(async(req,res,next)=>{
    let result=await User.find();
        res.render("./routes/chat",{result});
    }))
router.get("/search",asyncWrap(async(req,res,next)=>{
let name=req.query.search;
let result=await User.findOne({to:name});
if(!result){
     return next(new express_error(404,"user not exist"));
}
        res.render("./routes/show",{result});
}))
router.get("/new",(req,res,next)=>{
     res.render("./routes/new");
})
router.post("/new",(async(req,res)=>{
    const user=new User({
        to:req.body.to,
        img_src:"https://www.gravatar.com/avatar/?d=mp&s=200",
        to_message:[req.body.to_message]
    });
    await user.save();
    req.flash("success","New member added");
        res.redirect("/chat");
}))
//delete route
router.delete("/delete/:id",asyncWrap(async(req,res,next)=>{
let {id}=req.params;
await User.findByIdAndDelete(id);
  req.flash("error","Chat Deleted");
    res.redirect("/chat");
}))

router.get("/show/:id",asyncWrap(async(req,res,next)=>{
    let {id}=req.params;
    let result=await User.findById(id)
    if(!result){
       return next(new express_error(404,"Page not found"));
    }
       res.render("./routes/show",{result});
}));
router.post("/show/:id/add",asyncWrap(async(req,res,next)=>{
    let to=req.body.to;
    let {id}=req.params;
    let result=await User.findById(id);
        await result.to_message.push(to);
        await result.save();
         res.redirect(`/chat/show/${id}`);
}))
router.get("/edit/:id/:i",asyncWrap(async(req,res,next)=>{
    let id=req.params.id;
    let i=req.params.i;
    let result=User.findById(id);
}))

module.exports=router;