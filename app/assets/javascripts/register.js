var Register = {
    addQuestion: function () {
        $('.newQuestionForm').submit(function (e) {
            e.preventDefault();
            e.stopPropagation();

            var body = $(this).parent().children('th').children('#question_body').val();

            $('.modalError').remove();
            if (body.length == 0) {
                FlashMessage.formError($(this), 'Please add a fill in question body');
            } else {
                $('.newQuestionForm').unbind('submit').submit();
            }
        });
    },
    restaurant: function () {
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
        });
    },
    login: function () {
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
                    FlashMessage.signUpError($('[for=email]'), response.error);
                } else {
                    $('.loginForm').unbind('submit').submit();
                }
            });
        });
    },
    signUp: function () {
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
                if (response.error) {
                    errors.email = response.error
                }
                if ($.isEmptyObject(errors)) {
                    $('.signUpForm').unbind('submit').submit();
                } else {
                    FlashMessage.signUpErrors(errors);
                }
            });
        });
    }
};