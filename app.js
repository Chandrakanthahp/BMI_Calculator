//jshint esversion:6
require('dotenv').config();
const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const mongoose=require("mongoose");
const session=require("express-session");
const passport=require("passport");
const passportLocalMongoose=require("passport-local-mongoose");

const app=express(); 
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));
app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));



app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
mongoose.connect("mongodb://127.0.0.1:27017/userDB");

const userschema=new mongoose.Schema({
    email: String,
    password: String,
    mobile: String,
    name: String,
    dob: Date,
    age:Number,
    city: String,
    state: String,
    district: String
});
userschema.plugin(passportLocalMongoose);

const user=new mongoose.model("user",userschema);
passport.use(user.createStrategy());
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.get("/",function(req,res){
    res.render("home");
});

app.get("/login",function(req,res){
    res.render("login");
});
app.post("/login", passport.authenticate("local", {
    successRedirect: "/editfilebmi.html",               //
    failureRedirect: "/login",
}));

app.get("/register",function(req,res){
    res.render("register");
});
app.get("/indexbmi.html", function(req, res){
    if (req.isAuthenticated()) {
        res.render("indexbmi");
    } else {
        res.redirect("/login");
    }
});
app.get("/editfilebmi.html", function (req, res) { //
    if (req.isAuthenticated()) {                //
        res.render("editfilebmi");                    //      
    } else {                                //
        res.redirect("/login");                   // 
    }                                        //  
});                                      //

app.get("/secrets",function(req,res){
    if(req.isAuthenticated()){
        res.render("secrets");
    }else{
        res.redirect("/login");
    }
});
app.post("/register", async function (req, res) {
    try {
        const newUser = new user({
            username: req.body.username,
            mobile: req.body.mobile,
            name: req.body.name,
            dob: req.body.dob,
            age:req.body.age,
            city: req.body.city,
            state: req.body.state,
            district: req.body.district
        });

        user.register(newUser, req.body.password, function (err, user) {
            if (err) {
                console.log(err);
                res.redirect("/register");
            } else {
                passport.authenticate("local")(req, res, function () {
                    res.redirect("/editfilebmi.html");
                });
            }
        });
    } catch (error) {
        console.error(error);
        res.redirect("/register");
    }
});




app.get("/submit",function(req,res){
    res.render("submit");
});


app.listen(3000, function () {
    console.log("running on port 3000");
});