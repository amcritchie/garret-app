var Standards = {
    saveStandards: function (button) {
        Standards.processStandards(button, function(res) {
            debugger;
            Ajax.createStandards(res.name, res.array.join('|'), function () {
                debugger;
                location.reload();
            });
        });
    },
    updateStandards: function (button) {
        Standards.processStandards(button, function(res) {
            Ajax.updateStandards(res.id, res.name, res.array.join('|'), function() {
                location.reload();
            });
        });
    },
    processStandards: function(button, ajaxCallback) {
        Standards.refresh();
        var standardsForm = $(button).parent().parent();
        var standardsId = standardsForm.data('standard-id');
        var standardsNameInput = standardsForm.find('.standardName');
        var questionStandardsInputs = standardsForm.find('.questionStandard');
        Standards.validateStandardsInputs(questionStandardsInputs, function (res) {
            if (res.error) {
                standardsForm.find('.standardsError').prepend('<h4>Please use only numbers.</h4>');
            } else {
                if (!standardsNameInput.val()) {
                    standardsForm.find('.standardsError').prepend('<h4>Please give this set a name.</h4>');
                    standardsNameInput.css('border-color', 'red');
                } else {
                    res.id = standardsId;
                    res.name = standardsNameInput.val();
                    ajaxCallback(res);
                }
            }
        });
    },
    refresh: function () {
        //Refresh all errors on all tabs
        $('.standardsError').children().remove();
        $('.questionStandard').css('border-color', '#cccccc');
        $('.standardName').css('border-color', '#cccccc');
    },
    validateStandardsInputs: function (questionStandardsInputs, callback) {
        var response = {array: []};
        questionStandardsInputs.each(function () {
            var questionId = $(this).data('question-id');
            var value = $(this).val();
            if (isNaN(parseInt(value))) {
                $(this).css('border-color', 'red');
                response.error = true;
            }
            response.array.push(questionId + ':' + value);
        });
        callback(response);
    }
};