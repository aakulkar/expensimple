var path = require('path');
var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

function init(){
    var app = express();
    configureExpress(app);

    var User = initPassportUser();
    var Receipt = initReceipt();

    mongoose.connect('mongodb://localhost/myApp2');
    checkForAndCreateRootUser(User);

    require('./loginRoutes')(app);
    require('./appRoutes')(app);

    http.createServer(app).listen(3000, function() {
        console.log("Express server listening on port %d", 3000);
    });
}

init();

function configureExpress(app){
    app.configure(function(){
        app.use(express.bodyParser());
        app.use(express.methodOverride());

        app.use(express.cookieParser('your secret here'));
        app.use(express.session());

        app.use(passport.initialize());
        app.use(passport.session());

        app.use(app.router);
        app.use(express.static(path.join(__dirname, 'public')));
    });
}

function initPassportUser(){
    var User = require('./User');

    passport.use(new LocalStrategy(User.authenticate()));

    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    return User;
}

function initReceipt(){
    var Receipt = require('./Receipt');
    return Receipt;
}

function checkForAndCreateRootUser(User){
    User.findOne({username : "root" }, function(err, existingUser) {
        if (err || existingUser) return;
        var user = new User({ username : "root" });
        user.superuser = true;
        user.registeredTimestamp = new Date();
        user.setPassword("SECRET", function(err) {
            if (err) return;
            user.save(function(err) { });
        });  
    });
}

