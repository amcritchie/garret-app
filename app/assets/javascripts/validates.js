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
        validations.forEach(function (input) {
            input.validates.forEach(function (validation) {
                var message;
                if (validation === 'presence') {
                    message = Validate.newPresence(input, form, model);
                    if (message) {
                        errors[input.name] = message;
                    }
                }
//                if (validation === 'email'){
//                    errors[input.name] = Validate.newPresence(input, form);
//                }
                if (validation === 'password') {
                    message = Validate.newPassword(input, form, model);
                    if (message) {
                        errors[input.name] = message;
                    }
                }
                if (validation === 'phone') {
                    message = Validate.phone(input, form, model);
                    if (message) {
                        errors[input.name] = message;
                    }
                }
                if (validation === 'radio') {
                    message = Validate.radio(input, form, model);
                    if (message) {
                        errors[input.name] = message;
                    }
                }
                if (validation === 'checkbox') {
                    message = Validate.checkbox(input, form, model);
                    if (message) {
                        errors[input.name] = message;
                    }
                }
            })
        });
        return errors;
    },
    newPresence: function (input, form, model) {
        var error = null;
        var selectors = input.inputSelector || ['#' + model + '_' + input.name];
        selectors.forEach(function (selector) {
            var $obj = form.find(selector);
            if ($obj.val().length === 0) {
                $obj.addClass('errorInput');
                error = 'Please fill in this field';
            }
        });
        return error
    },
    newPassword: function (input, form, model) {
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
    phone: function (input, form, model) {
        var error = null;
        var selectors = input.inputSelector || '#' + model + '_' + input.name;
        var $obj = form.find(selectors);
        var string = form.find(selectors).val();
        var rawPhoneNumber = string.replace(') ', '').replace('(', '').replace('-', '');
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
    radio: function (input, form, model) {
        var error = null;
        var selectors = input.inputSelector || '[name="' + model + '[' + input.name + ']"]';
        var $obj = form.find(selectors);
        if ($(selectors + ':checked').length === 0) {
            error = 'Please select an option';
        }
        return error
    },
    checkbox: function (input, form, model) {
        var error = null;
        var selectors = input.inputSelector || '[name="' + model + '[' + input.name + '][]"]';
        var $obj = form.find(selectors);
        if ($(selectors + ':checked').length === 0) {
            error = 'Please select the applicable boxes';
        }
        return error
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

    evaluationsExplanationsFilled: function (callback) {
        var errors = {};
        $('.allQuestionsExplanation[data-relevant=true]').each(function (index, explanation) {
            Validate.isFilled($(explanation), true, function (error) {
                if (error) {
                    errors[$(explanation).data('question-id')] = 'explanation not filled.';
                }
            });
        });
        if (Object.keys(errors).length === 0) {
            callback(null);
        } else {
            callback(errors);
        }
    },

    evaluationDepartmentDescriptions: function (callback) {
        var errors = [];
        $('.departmentDescription[data-relevant=true]').each(function (index, textarea) {
            Validate.characterLength($(textarea), true, 700, function (error) {
                if (error) {
                    errors.push(error);
                    if (errors.length === 1) {
                        var departmentId = $(textarea).parents('.department-tab-pane').attr('id');
                        $('[href=#' + departmentId + ']').click();
                    }
                }
            })
        });
        if (errors.length) {
            callback(errors)
        } else {
            callback(null)
        }
    },

    evaluationRestaurantDetails: function (callback) {
        var errors = {};
        var details = RestaurantDetails.save();
        $.each(details.employees, function (index, employee) {
            if (!employee.not_valid) {
                if (employee.code === 'res') {
                    // truthy is needed for employee.gender == null
                    if ((employee.gender == null) || (employee.name === '') || (employee.other === '')) {
                        errors[employee.code] = 'Please fill in this employees details'
                    }
                } else {
                    // truthy is needed for employee.gender == null
                    if ((employee.gender == null) || (employee.height === '') || (employee.other === '')) {
                        errors[employee.code] = 'Please fill in this employees details'
                    }
                }
            }
        });
        if ((details.time_spots.arrival_time === '') || (details.time_spots.departure_time === '')) {
            errors.time_spots = 'Please fill in the time of you arrival and departure.'
        }
        if ((details.check.check === '') || (details.check.table === '') || (details.check.checkAmount === '')) {
            errors.check = 'Please fill in information about your check.'
        }
        if (Object.keys(errors).length === 0) {
            callback(null);
        } else {
            callback(errors);
        }
    },

    isFilled: function ($input, highlighted, callback) {
        if ($input.val() === '') {
            if (highlighted) {
                $input.addClass('errorInput');
            }
            callback('Not Filled');
        } else {
            callback(null);
        }
    },

    characterLength: function ($input, highlighted, length, callback) {
        if ($input.val().length < length) {
            if (highlighted) {
                $input.addClass('errorInput');
            }
            callback('Must have '+length+' characters.  You have ' + $input.val().length);
        } else {
            callback(null);
        }
    }
};