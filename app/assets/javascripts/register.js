//var Register = {
////    addQuestion: function () {
////        $('.newQuestionForm').submit(function (e) {
////            debugger;
////            e.preventDefault();
////            e.stopPropagation();
////
////            var body = $(this).parent().children('th').children('#question_body').val();
////
////            $('.modalError').remove();
////            if (body.length == 0) {
////                FlashMessage.formError($(this), 'Please add a fill in question body');
////            } else {
//////                $('.newQuestionForm').unbind('submit').submit();
////            }
////        });
////    },
////    restaurant: function () {
////        $('.restaurantForm').submit(function (e) {
////            e.preventDefault();
////            e.stopPropagation();
//////            var loginButton = $(this);
////            var fields = $(this).children().children().children();
////            var info = {
////                name: fields.children('#restaurant_name').val(),
////                phone: fields.children('#restaurant_phone_number').val(),
////                address: {
////                    address: fields.children('#restaurant_address').val(),
////                    city: fields.children('#restaurant_city').val(),
////                    state: fields.children('#restaurant_state').val(),
////                    zip: fields.children('#restaurant_zip').val()
////                }
////            };
////
////            $('.modalError').remove();
////            var errors = Validate.restaurant(info);
//////            if (response.error){ errors.email = response.error }
////            if ($.isEmptyObject(errors)) {
////                $('.restaurantForm').unbind('submit').submit();
////            } else {
////                FlashMessage.signUpErrors(errors);
////            }
////            console.log('create new restaurant');
////        });
////    },
////    login: function () {
////        $('.loginForm').submit(function (e) {
////            e.preventDefault();
////            e.stopPropagation();
////            var loginButton = $(this);
////            var fields = $(this).children().children().children();
////            var info = {
////                email: fields.children('#user_email').val(),
////                password: fields.children('#user_password').val()
////            };
////            $('.modalError').remove();
////            $.when(Validate.login(info)).done(function (response) {
////                if (response.error) {
////                    FlashMessage.signUpError($('[for=email]'), response.error);
////                } else {
////                    $('.loginForm').unbind('submit').submit();
////                }
////            });
////        });
////    },
////    signUp: function () {
////        $('.signUpForm').submit(function (e) {
////            e.preventDefault();
////            e.stopPropagation();
////            $('.errorInput').removeClass('errorInput');
////
////            var form = $(this);
////            var info = Register.inputs();
////            var errors = Validate.form(form, info, 'user');
////            var email = form.find('#user_email').val();
////
////            $.when(Validate.uniqueEmail(email)).done(function (response) {
////                if (response.error) {
////                    errors.email = response.error
////                }
////                if ($.isEmptyObject(errors)) {
////                    $('.signUpForm').unbind('submit').submit();
////                } else {
////                    Register.prependErrors(form, errors);
////                    $('.signUpForm').find('input').on('click', function() {
////                        $(this).parents('.control-group').find('.errorMessage').remove();
////                        $(this).removeClass('errorInput')
////                    })
////                }
////            });
////        });
////    },
////    prependErrors: function(form, errors) {
////        $('.errorMessage').remove();
////        $.each(errors, function(key, value){
////            form.find('[for='+key+']').append('<p class="errorMessage">'+value+'</p>');
////        });
////    },
////    inputs: function () {
////        return [
////            {name: 'name', validates: ['presence'], inputSelector: ['#user_first_name', '#user_last_name']},
////            {name: 'email', validates: ['email', 'presence']},
////            {name: 'skype', validates: ['presence']},
////            {name: 'password', validates: ['password', 'presence']},
////            {name: 'phone_number', validates: ['phone', 'presence']},
////            {name: 'address', validates: ['presence'], inputSelector: ['#user_address', '#user_city', '#user_state', '#user_zip']},
////            {name: 'devices', validates: ['checkbox']},
////            {name: 'found_us_by', validates: ['presence']},
////            {name: 'occupation', validates: ['presence']},
////            {name: 'qualifications', validates: ['presence']},
////            {name: 'availability', validates: ['radio']},
////            {name: 'other_locations', validates: ['presence']},
////            {name: 'interested_in', validates: ['checkbox']},
////            {name: 'work_with_other_companies', validates: ['radio']},
////            {name: 'certification', validates: ['presence']},
////            {name: 'writing', validates: ['radio']},
////            {name: 'good_time', validates: ['presence']},
////            {name: 'trends', validates: ['presence']},
////            {name: 'favorite_restaurant', validates: ['presence']},
////            {name: 'favorite_restaurant_why', validates: ['presence']},
////            {name: 'ten_and_five', validates: ['presence']},
////            {name: 'literacy', validates: ['presence']},
////            {name: 'no_name_scenario', validates: ['presence']},
////            {name: 'birthday', validates: ['presence']},
////            {name: 'gender', validates: ['radio']},
////            {name: 'employment', validates: ['radio']},
////            {name: 'education', validates: ['radio']}
////        ];
////    }
//};