var App = function(){
    this.registerEvents();
}

//Starting an App..
App.prototype.registerEvents = function(){
    this.registerLogin();
    this.registerRegister();
}

//function that runs when someone submits in register
App.prototype.registerRegister = function(){
    $('#regButton').onButtonTap(function(){

        var first = $('#fname').val();
        var last = $('#lname').val();
        var username = $('#regUname').val();
        var password = $('#regpwd').val();
        var password2 = $('#regpwd2').val();
        var arr = [];
        var i = 0;
        $('#registerErrorList').empty();
        //validations to make sure there are no illegal characters
        if(!isValidName(first)) {
            arr[i++] = "First name has invalid characters.";
        }
        if(!isValidName(last)) {
            arr[i++] = "Last name has invalid characters.";
        }   
        if(!isEmailAddressValid(username)) {
            arr[i++] = "Invalid email address";
        }
        var passwordErrors = isPasswordValid(password);
            if(passwordErrors != null) {
            arr[i++] = passwordErrors;
        }

        if(password !== password2) {
            arr[i++] = "Passwords don't match!";
        }

        for(var j = 0; j < i; j++) {
            addError(arr[j], "#registerErrorList");
        }
        if(i > 0)
            return;

        //need to make the username lower case before putting into database
        username = username.toLowerCase();
        
        //send the data via ajax
        this.ajaxFormJSON(  
                {
                    username: username,
                    password: password
                },
                '/register',
                function success(data){
                    if(JSON.stringify(data) === '"user exists"') {
                        addError("This email is already registered.", '#registerErrorList');
                    }
                    if (data === 'success'){
                        window.location = '/';
                    }
                },
                function error(xhr, status, err){
                    console.log(JSON.stringify(err));
                });
    }.bind(this));
}

App.prototype.ajaxFormJSON = function(json, url, onSuccess, onError){
    var data = new FormData();
    for (var key in json){
        data.append(key, json[key]);
    }

        $.ajax({
            url: url,
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            success: onSuccess,
            error: onError});
}

//function to login into the app
App.prototype.registerLogin = function(){
    $('#loginform').on("submit", function(e){
        e.preventDefault();
        var username = $('#uname').val();
        var password = $('#pwd').val();
        var arr = [];
        var i = 0;
        $('#loginErrorList').empty();
        //alerts if the email address is not allowed
        if(!isEmailAddressValid(username)) {
            arr[i++] = "Invalid email address";
        }
        var passwordErrors = isPasswordValid(password);
        if(passwordErrors != null) {
            arr[i++] = passwordErrors;
        }

        for(var j = 0; j < i; j++) {
            addError(arr[j], "#loginErrorList");
        }
        if(i > 0)
            return;

        //want to make the username lowercase before we put into the database
        username = username.toLowerCase();
        
        var data = new FormData();
        data.append('username', username);
        data.append('password', password);

        //send the data via ajax
        this.ajaxFormJSON(  
                {
                    username: username,
                    password: password
                },
                '/login',
                function success(data){
                    if (data === 'success'){
                        window.location = '/';
                    }
                },
                function error(xhr, status, err){
                    if(JSON.stringify(err) === '"Unauthorized"') {
                        addError("Incorrect Email/Password.", '#loginErrorList');
                    }
                    console.log(JSON.stringify(err));
                });
    }.bind(this));

    return false;
}

//check for a valid email address
function isEmailAddressValid(str) {

    var pattern = /^[a-zA-Z_\.0-9]+@[a-zA-Z_]+?\.[a-zA-Z\.]{2,10}$/;
    return str.match(pattern);    
}

//check to make sure illegal strings are not passed to the server
//Check for sql injections and script tags.
function isValidName(str) {
    var pattern = /^[a-zA-Z_\.0-9\s]{1,20}$/;
    return str.match(pattern);    
}

//validation to check password
function isPasswordValid(password) {

    if(password === null || password === undefined) {
        return "Enter password.";
    }

    if(password.length <= 4) {
        return "Password must be at least 5 characters.";
    }

    if(password.indexOf(" ") !== -1) {
        
        return "Password must be one word.";
    }
    return null;
}

function addError(error, div) {
    var e = $('<li class="error">'+error+'</li>');
    $(div).append(e);
}