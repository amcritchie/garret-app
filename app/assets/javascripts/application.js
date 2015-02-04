// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap
//= require turbolinks
//= require_tree .

$(document).ready(function () {
    $.fn.pVal = function () {
        var $this = $(this),
            val = $this.eq(0).val();
        if (val == $this.attr('placeholder'))
            return '';
        else
            return val;
    };

    $('.loginForm').submit(function (e) {
        e.preventDefault();
        e.stopPropagation();
        var loginButton = $(this);
        var fields = $(this).children().children().children();
        var info = {
            email: fields.children('#user_email').val(),
            password: fields.children('#user_password').val()
        };
        $('.modalError').remove();
        $.when(Validate.login(info)).done(function (response) {
            if (response.error) {
                FlashMessage.signUpError($('[for=userid]'), response.error);
            } else {
                $('.loginForm').unbind('submit').submit();
            }
        });
    });

    $('.signUpForm').submit(function (e) {
        e.preventDefault();
        e.stopPropagation();
        var loginButton = $(this);
        var fields = $(this).children().children().children();
        var info = {
            email: fields.children('#user_email').val(),
            password: fields.children('#user_password').val(),
            phone: fields.children('#user_phone_number').val(),
            name: {
                first: fields.children('#user_first_name').val(),
                last: fields.children('#user_last_name').val()
            },
            address: {
                address: fields.children('#user_address').val(),
                city: fields.children('#user_city').val(),
                state: fields.children('#user_state').val(),
                zip: fields.children('#user_zip').val()
            }
        };
        var errors = Validate.signUp(info);
        $.when(Validate.uniqueEmail(info['email'])).done(function (response) {
            if (response.error){ errors.email = response.error }
            if ($.isEmptyObject(errors)) {
                $('.signUpForm').unbind('submit').submit();
            } else {
                FlashMessage.signUpErrors(errors);
            }
        });
    });
});