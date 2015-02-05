var Validate = {

    restaurant: function (info) {
        var errors = {};
        console.log(info);
        console.log(info.name);
        console.log(info.phone);
        if (Validate.presence(info.name)) {
            errors['name'] = Validate.presence(info.name);
        }
        if (Validate.presence(info.phone)) {
            errors['phone'] = Validate.presence(info.phone);
        }
        if (Validate.presence(info.address)) {
            errors['address'] = Validate.presence(info.address);
        }
        return errors
    },

    signUp: function (info) {
        var errors = {};
        if (Validate.email(info.email)) {
            errors['email'] = Validate.email(info.email);
        }
        if (Validate.password(info.password)) {
            errors['password'] = Validate.password(info.password);
        }
        if (Validate.presence(info.name)) {
            errors['name'] = Validate.presence(info.name);
        }
        if (Validate.presence(info.phone)) {
            errors['phone'] = Validate.presence(info.phone);
        }
        if (Validate.presence(info.address)) {
            errors['address'] = Validate.presence(info.address);
        }
        return errors;
    },
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
    },
    password: function (password) {
        return Validate.length(password, 8);
    },
    length: function (string, length) {
        if (string.length < length) {
            return 'Its not long enough';
        }
    },
    email: function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email)) {
            return 'Not valid email';
        }
    },
    presence: function (data) {
        var error = null;
        if (typeof data !== 'string') {
            $.each(data, function (index, value) {
                if (!value) {
                    error = 'This is a required field';
                }
            });
        } else {
            if (!data) {
                error = 'This is a required field';
            }
        }
        if (error) {
            return error;
        }
    }

};