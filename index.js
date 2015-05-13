var firebaseDB = new Firebase("https://resplendent-inferno-8604.firebaseio.com/")

$(document).ready(function() {
    $('.main-site').hide();
    $('.sign-in').submit(function(e) {
        e.preventDefault();
        logInUser($('#inputEmail').val(), $('#inputPassword').val())
    })
});

var logInUser = function(email, password) {
    firebaseDB.authWithPassword({
        email    : email,
        password : password
    }, function(error, authData) {
        if (error) {
            $('.main-site').append("<p>Fuck off</p>")
        } else {
            $('.log-in').hide();
            $('.main-site').show();
        }
    });
}
