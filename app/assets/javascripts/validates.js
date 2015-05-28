var Validate = {

//    restaurant: function (info) {
//        var errors = {};
//        if (Validate.presence(info.name)) {
//            errors['name'] = Validate.presence(info.name);
//        }
//        if (Validate.presence(info.phone)) {
//            errors['phone'] = Validate.presence(info.phone);
//        }
//        if (Validate.presence(info.address)) {
//            errors['address'] = Validate.presence(info.address);
//        }
//        return errors
//    },
    form: function (form, validations, model) {
        var errors = {};
        validations.forEach(function(input) {
            input.validates.forEach(function(validation) {
                var message;
                if (validation === 'presence'){
                    message = Validate.newPresence(input, form, model);
                    if (message) { errors[input.name] = message; }
                }
//                if (validation === 'email'){
//                    errors[input.name] = Validate.newPresence(input, form);
//                }
                if (validation === 'password'){
                    message = Validate.newPassword(input, form, model);
                    if (message) { errors[input.name] = message; }
                }
                if (validation === 'phone'){
                    message = Validate.phone(input, form, model);
                    if (message) { errors[input.name] = message; }
                }
                if (validation === 'radio'){
                    message = Validate.radio(input, form, model);
                    if (message) { errors[input.name] = message; }
                }
                if (validation === 'checkbox'){
                    message = Validate.checkbox(input, form, model);
                    if (message) { errors[input.name] = message; }
                }
            })
        });
        return errors;
    },
    newPresence: function(input, form, model) {
        var error = null;
        var selectors = input.inputSelector || ['#' + model + '_' + input.name];
        selectors.forEach(function(selector) {
            var $obj = form.find(selector);
            if ($obj.val().length === 0) {
                $obj.addClass('errorInput');
                error = 'Please fill in this field';
            }
        });
        return error
    },
    newPassword: function(input, form, model) {
        var error = null;
        var selectors = input.inputSelector || '#' + model + '_' + input.name;
        var $obj = form.find(selectors);
        var string = form.find(selectors).val();
        if (!string.match(/\d+/g)) {
            $obj.addClass('errorInput');
            error = 'Your password must contain at least one number'
        }
        if (string.length < 10) {
            $obj.addClass('errorInput');
            error = 'Password must be at least 10 characters long.'
        }
        return error
    },
    phone: function(input, form, model) {
        var error = null;
        var selectors = input.inputSelector || '#' + model + '_' + input.name;
        var $obj = form.find(selectors);
        var string = form.find(selectors).val();
        var rawPhoneNumber = string.replace(') ','').replace('(','').replace('-','');
        var containerOnlyDigits = /^\d+$/.test(rawPhoneNumber);
        if (rawPhoneNumber.length < 10) {
            $obj.addClass('errorInput');
            error = 'Please enter full phone number'
        }
        if (!containerOnlyDigits) {
            $obj.addClass('errorInput');
            error = 'Please only use numbers'
        }
        return error
    },
    radio: function(input, form, model) {
        var error = null;
        var selectors = input.inputSelector || '[name="' + model + '[' + input.name + ']"]';
        var $obj = form.find(selectors);
        if ($(selectors+':checked').length === 0){
            error = 'Please select an option';
        }
        return error
    },
    checkbox: function(input, form, model) {
        var error = null;
        var selectors = input.inputSelector || '[name="' + model + '[' + input.name + '][]"]';
        var $obj = form.find(selectors);
        if ($(selectors+':checked').length === 0){
            error = 'Please select the applicable boxes';
        }
        return error
    },
//    signUp: function (info) {
//        var errors = {};
//        if (Validate.email(info.email)) {
//            errors['email'] = Validate.email(info.email);
//        }
//        if (Validate.password(info.password)) {
//            errors['password'] = Validate.password(info.password);
//        }
//        if (Validate.presence(info.name)) {
//            errors['name'] = Validate.presence(info.name);
//        }
//        if (Validate.presence(info.phone)) {
//            errors['phone'] = Validate.presence(info.phone);
//        }
//        if (Validate.presence(info.address)) {
//            errors['address'] = Validate.presence(info.address);
//        }
//        return errors;
//    },
    login: function (info) {
        var deferred = $.Deferred();
        $.ajax({
            type: "POST",
            url: "/authenticate.json",
            data: info,
            success: function (response) {
                deferred.resolve(response);
            },
            error: function (response) {
                deferred.reject(response);
            }
        });
        return deferred;
    },
    uniqueEmail: function (email) {
        var deferred = $.Deferred();
        console.log(email);
        $.ajax({
            type: "POST",
            url: "/unique_email.json",
            data: {email: email},
            success: function (response) {
                deferred.resolve(response);
            },
            error: function (response) {
                deferred.reject(response);
            }
        });
        return deferred;
    }
//    ,
//    password: function (password) {
//        return Validate.length(password, 8);
//    },
//    length: function (string, length) {
//        if (string.length < length) {
//            return 'Its not long enough';
//        }
//    },
//    email: function (email) {
//        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//        if (!re.test(email)) {
//            return 'Not valid email';
//        }
//    },
//    presence: function (data) {
//        var error = null;
//        if (typeof data !== 'string') {
//            $.each(data, function (index, value) {
//                if (!value) {
//                    error = 'This is a required field';
//                }
//            });
//        } else {
//            if (!data) {
//                error = 'This is a required field';
//            }
//        }
//        if (error) {
//            return error;
//        }
//    }
};