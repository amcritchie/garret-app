var AdminDashboard = {
    load: function () {
        AdminDashboard.submittedEvaluationListeners();
        AdminDashboard.pendingEvaluationListeners();
        AdminDashboard.standardsListeners();
        List.listeners("Keys", "keys");
        List.listeners("Departments", "departments");
        $('.deleteQuestion').on('click', function () {
            $.ajax({
                type: "POST",
                url: "/questions/destroy",
                data: {id: $(this).data('question-id')}
            });
            $(this).parent().parent().remove();
        });
    },
    submittedEvaluationListeners: function () {
        AdminDashboard.viewSubmission();
        AdminDashboard.acceptSubmission();
        AdminDashboard.reopenSubmission();
    },
    viewSubmission: function () {
        $('.viewSubmission').on('click', function () {
            Evaluation.applicationId = $(this).data('application-id');
            Evaluation.open();
        });
    },
    acceptSubmission: function () {

        $('.acceptSubmission').on('click', function () {
            var id = $(this).data('application-id');
            $.ajax({
                type: "POST",
                url: "application/accept",
                data: {id: id}
            });
            var a = $(this).parent();
            a.parent().children().children('button').remove();
            a.prepend('Evaluation Complete');
        });
    },
    reopenSubmission: function () {
        $('.rejectSubmission').on('click', function () {
            var id = $(this).data('application-id');
            $.ajax({
                type: "POST",
                url: "application/reopen",
                data: {id: id}
            });
            var a = $(this).parent();
            a.parent().children().children('button').remove();
            a.prepend('Evaluation Reopened');
        });
    },
    pendingEvaluationListeners: function () {
        AdminDashboard.approveApplication();
        AdminDashboard.denyApplication();
    },
    approveApplication: function () {
        $('.approveApplication').on('click', function () {
            var id = $(this).data('application-id');
            $.ajax({
                type: "POST",
                url: "application/approve",
                data: {id: id}
            });
            var a = $(this).parent();
            $(this).parent().children('button').remove();
            a.prepend('Approved');
        });
    },
    denyApplication: function () {
        $('.denyApplication').on('click', function () {
            var id = $(this).data('application-id');
            $.ajax({
                type: "POST",
                url: "application/deny",
                data: {id: id}
            });
            var a = $(this).parent();
            $(this).parent().children('button').remove();
            a.prepend('Decided');
        });
    },
    standardsListeners: function () {
        $('#saveStandards').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            debugger;
            Standards.saveStandards(this);
        });
        $('.updateStandards').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            Standards.updateStandards(this);
        });
    }
//    saveStandards: function (button) {
//        //Refresh all errors on all tabs
//        $('.standardsError').children().remove();
//        $('.questionStandard').css('border-color', '#cccccc');
//        $('.standardName').css('border-color', '#cccccc');
//
//        var standardsForm = $(button).parent().parent();
//        var standardsNameInput = standardsForm.find('.standardName');
//        var questionStandardsInputs = standardsForm.find('.questionStandard');
//
//        var response = {array: []};
//        questionStandardsInputs.each(function () {
//            var questionId = $(this).data('question-id');
//            var value = $(this).val();
//            if (isNaN(parseInt(value))) {
//                $(this).css('border-color', 'red');
//                response.error = true;
//            }
//            response.array.push(questionId + ':' + value);
//        });
//        if (response.error) {
//            standardsForm.find('.standardsError').prepend('<h4>Please use only numbers.</h4>');
//        } else {
//            if (!standardsNameInput.val()) {
//                standardsForm.find('.standardsError').prepend('<h4>Please give this set a name.</h4>');
//                standardsNameInput.css('border-color', 'red');
//            } else {
//                $.ajax({
//                    type: "POST",
//                    url: "/standards",
//                    data: {
//                        name: standardsNameInput.val(),
//                        details: response.array.join('|')
//                    }
//                });
//                location.reload();
//            }
//        }
//    },
//    updateStandards: function (button) {
//        var standardsForm = $(button).parent().parent();
//        standardsForm.find('.standardsError').children().remove();
//        $('.questionStandard').css('border-color', '#cccccc');
//        $('#standardName').css('border-color', '#cccccc');
//        var error = null;
//        var array = [];
//        var questionStandards = $(button).parent().parent().find('.questionStandard');
//        questionStandards.each(function () {
//            var questionId = $(this).data('question-id');
//            var value = $(this).val();
//            if (isNaN(parseInt(value))) {
//                $(this).css('border-color', 'red');
//                error = true;
//            }
//            array.push(questionId + ':' + value);
//        });
//        if (error) {
//            standardsForm.find('.standardsError').prepend('<h4>Please use only numbers.</h4>');
//        } else {
//            if (!$('#standardName').val()) {
//                standardsForm.find('.standardsError').prepend('<h4>Please give this set a name.</h4>');
//                $('#standardName').css('border-color', 'red');
//
//            } else {
//                $.ajax({
//                    type: "PUT",
//                    url: "/standards/" + $(button).parent().parent().data('standard-id'),
//                    data: {
//                        id: standardsForm.data('standard-id'),
//                        name: standardsForm.find('.standardName').val(),
//                        details: array.join('|')
//                    }
//                });
//                location.reload();
//            }
//        }
//    }
};