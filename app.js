var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var passport = require("passport");
var User = require("./models/user");
var LocalStrategy = require("passport-local");

var Category = require("./models/category");

var app = express();

var index = require('./routes/index');
var users = require('./routes/users');
var blogs = require('./routes/blogs');
var comments = require('./routes/comments');





//connect to mongoose
mongoose.connect('mongodb://localhost/inkd',{
    useMongoClient:true
},function (err, db) {
    if(err){
        console.log(err);
    }
    else{
        console.log("DB connected successfully");
    }
});

// Passport Configuration
app.use(require("express-session")({
   secret: "Agam and Shubham",
   resave: false,
   saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());





// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});




app.use('/', index);
app.use('/users', users);
app.use('/blogs', blogs);
app.use('/blogs/:id', comments);







// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});



var category_technology = {name: "technology"};
var category_gaming = {name: "gaming"};
var category_sports = {name: "sports"};



//
// Category.create(category_technology, function (err, newBlog) {
//    if(err){
//        console.log(err);
//    }
//    else{
//        console.log(newBlog);
//    }
// });
//
//
// Category.create(category_gaming, function (err, newBlog) {
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(newBlog);
//     }
// });
//
//
// Category.create(category_sports, function (err, newBlog) {
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(newBlog);
//     }
// });
//
//
// Category.find({}, function (err, allCategories) {
//    if(err){
//        console.log(err);
//    }
//    else{
//        console.log(allCategories);
//    }
// });



module.exports = app;

/*
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Inkd has started on port no:"+ process.env.PORT);
});*/
