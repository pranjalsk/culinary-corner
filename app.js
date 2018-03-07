var express         = require("express");
var app             = express();
var bodyParser      = require("body-parser");
var mongoose        = require("mongoose");
var Culinaryground      = require("./models/culinaryground");
var seedDB          = require("./seeds");
var Comment         = require("./models/comment");
var passport        = require("passport");
var LocalStrategy   = require("passport-local");
var User            = require("./models/user");
var methodOverride  = require("method-override");
var flash           = require("connect-flash"); 

//REQUIRED ROUTES
var commentRoutes       = require("./routes/comments");
var culinarygroundRoutes    = require("./routes/culinarygrounds");
var indexRoutes         = require("./routes/index");

mongoose.connect("mongodb://localhost/culinary_corner");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());

//seedDB();

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Working is good",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

app.use(indexRoutes);
app.use(culinarygroundRoutes);
app.use(commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started...");
});