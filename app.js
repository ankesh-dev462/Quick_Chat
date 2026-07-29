const express=require("express");
const app=express();
 const path=require("path");
 const passport=require("passport");
 const LocalStrategy = require("passport-local").Strategy;
 const methodOverride=require("method-override");
 const session = require("express-session");
 var flash = require('connect-flash');
const User=require("./models/chat.js");
const validate=require("./models/user.js");
const mongoose=require("mongoose");
 const ejsmate = require('ejs-mate');
 app.engine('ejs', ejsmate);
 app.use(methodOverride("_method"));
const chat=require("./routes/chat.js");
const user=require("./routes/user.js");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(validate.authenticate()));
passport.serializeUser(validate.serializeUser());
passport.deserializeUser(validate.deserializeUser());
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next();
})
app.use("/chat",chat);
app.use("/",user);
app.listen("8080",()=>{
    console.log("server started");
})
main().then(()=>{
    console.log("database connected");
})
.catch((err)=>{
    console.log(err);
});
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wattsapp");
}

app.get("/validation",async(req,res)=>{
    let validateUser=new validate({
        username:"ankesh",
        email:"ankesh@gmail.com",
        
    })
    let newUser=await validate.register(validateUser,password="ankesh");
    res.send(newUser);

})

// error handeling middleware
app.use((err,req,res,next)=>{
    let{status=500,message="some error occured"}=err;
    res.status(status).send(message);
})


