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

    Register.login();
    Register.signUp();
    Register.restaurant();
    Register.addQuestion();
});

var Register = {
    addQuestion: function() {
        $('.newQuestionForm').submit(function (e) {
            e.preventDefault();
            e.stopPropagation();

            var loginButton = $(this);
            var fields = $(this).children().children().children();
            var body = $(this).children().children().children('#question_body').val();
            var standard = $(this).data('standard');
            var sub_class = $(this).children().children().children('#question_sub_class').val();
            var info = {
                email: fields.children('#user_email').val(),
                password: fields.children('#user_password').val()
            };
            $('.modalError').remove();
                if (body.length == 0) {
                    FlashMessage.formError($(this), 'Please add a fill in question body' );
                } else {
                    $('.newQuestionForm').unbind('submit').submit();
                }
        });
    },
    restaurant: function() {
        $('.restaurantForm').submit(function (e) {
            e.preventDefault();
            e.stopPropagation();
//            var loginButton = $(this);
            var fields = $(this).children().children().children();
            var info = {
                name: fields.children('#restaurant_name').val(),
                phone: fields.children('#restaurant_phone_number').val(),
                address: {
                    address: fields.children('#restaurant_address').val(),
                    city: fields.children('#restaurant_city').val(),
                    state: fields.children('#restaurant_state').val(),
                    zip: fields.children('#restaurant_zip').val()
                }
            };

            $('.modalError').remove();
            var errors = Validate.restaurant(info);
//            if (response.error){ errors.email = response.error }
            if ($.isEmptyObject(errors)) {
                $('.restaurantForm').unbind('submit').submit();
            } else {
                FlashMessage.signUpErrors(errors);
            }
            console.log('create new restaurant');
//            debugger;
        });
    },
    login: function(){
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
    },
    signUp: function() {
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
            $('.modalError').remove();
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
    }
};

$(document).ready(function() {
    var panels = $('.user-infos');
    var panelsButton = $('.dropdown-user');
    panels.hide();

    //Click dropdown
    panelsButton.click(function() {
        //get data-for attribute
        var dataFor = $(this).attr('data-for');
        var idFor = $(dataFor);

        //current button
        var currentButton = $(this);
        idFor.slideToggle(400, function() {
            //Completed slidetoggle
            if(idFor.is(':visible'))
            {
                currentButton.html('<i class="glyphicon glyphicon-chevron-up text-muted"></i>');
            }
            else
            {
                currentButton.html('<i class="glyphicon glyphicon-chevron-down text-muted"></i>');
            }
        })
    });


    $('[data-toggle="tooltip"]').tooltip();

    $('button').click(function(e) {
        e.preventDefault();
//        alert("This is a demo.\n :-)");
    });
});