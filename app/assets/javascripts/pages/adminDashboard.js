var AdminDashboard = {
    load: function () {
        AdminDashboard.pendingEvaluationApplicationListeners();
        AdminDashboard.submittedEvaluationListeners();
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
        AdminDashboard.viewSubmissionListener();
        AdminDashboard.acceptSubmissionListener();
        AdminDashboard.reopenSubmissionListener();
        AdminDashboard.userActivation();
    },
    viewSubmissionListener: function () {
        $('.viewSubmission').on('click', function (e) {
            $(this).html('<i class="fa fa-spinner fa-spin fa-1x"></i>');
            // This is used to reactivate the e.stopPropagation
            var copy = $.extend(true, {}, e);
            e.stopPropagation();

            var button = $(this);
            Evaluation.applicationId = $(this).data('application-id');
            Evaluation.open(function () {
                button.html('View');
                $(copy.target.parentNode).trigger(copy);
            });
        });
    },
    acceptSubmissionListener: function () {
        $('.acceptSubmission').on('click', function () {
            var id = $(this).data('application-id');
            var a = $(this).parent();
            $(this).html('<i class="fa fa-spinner fa-spin"></i>');
            Ajax.respondToSubmittedEvaluation({id: id}, '/application/accept', function () {
                a.parent().children().children('button').remove();
                a.parent().children().children('a').remove();
                a.prepend('Evaluation Accepted');
            });
        });
    },
    userActivation: function () {
//        disableAccount
//        activateAccount
        $('.activateAccount').on('click', function () {
            var tableButton = $(this);
            var id = $(this).data('user-id');
            var a = $(this).parent();
//            $('#reopenMessage').val('');
//            $('.reopenEvaluation').off('click').on('click', function () {
//                var message = $('#reopenMessage').val();
            $(this).html('<i class="fa fa-spinner fa-spin"></i>');
            tableButton.html('<i class="fa fa-spinner fa-spin"></i>');
            Ajax.respondToUserActivation({id: id}, '/users/activate_user', function () {
                tableButton.remove();
                a.prepend('User Activated')
            });
        });

        $('.disableAccount').on('click', function () {
            var tableButton = $(this);
            var id = $(this).data('user-id');
            var a = $(this).parent();
            $('#disableUserMessage').val('');
            $('.disableUser').off('click').on('click', function () {
                var message = $('#disableUserMessage').val();
                $(this).html('<i class="fa fa-spinner fa-spin"></i>');
                tableButton.html('<i class="fa fa-spinner fa-spin"></i>');
                Ajax.respondToUserActivation({id: id, message: message}, '/users/deactivate_user', function () {
//                    a.parent().children().children('button').remove();
//                    a.parent().children().children('a').remove();
//                    a.prepend('Evaluation Reopened');
                    tableButton.remove();
                    a.prepend('User Disabled')
                });
            });
        });
    },
    reopenSubmissionListener: function () {
        $('.rejectSubmission').on('click', function () {
            var tableButton = $(this);
            var id = $(this).data('application-id');
            var a = $(this).parent();
            $('#reopenMessage').val('');
            $('.reopenEvaluation').off('click').on('click', function () {
                var message = $('#reopenMessage').val();
                $(this).html('<i class="fa fa-spinner fa-spin"></i>');
                tableButton.html('<i class="fa fa-spinner fa-spin"></i>');
                Ajax.respondToSubmittedEvaluation({id: id, message: message}, '/application/reopen', function () {
                    a.parent().children().children('button').remove();
                    a.parent().children().children('a').remove();
                    a.prepend('Evaluation Reopened');
                });
            });
        });
    },
    pendingEvaluationApplicationListeners: function () {
        $('.approveApplication').on('click', function () {
            AdminDashboard.respondToPendingEvaluationApplication(this, '/application/approve', 'Approved');
        });
        $('.denyApplication').on('click', function () {
            AdminDashboard.respondToPendingEvaluationApplication(this, '/application/deny', 'Decided');
        });
    },
    respondToPendingEvaluationApplication: function (button, route, message) {
        var id = $(button).data('application-id');
        var column = $(button).parent();
        $(button).html('<i class="fa fa-spinner fa-spin"></i>');
        Ajax.respondToApplication(id, route, function () {
            column.children('button').remove();
            column.prepend(message)
        });
    },
    standardsListeners: function () {
        $('#saveStandards').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            Standards.saveStandards(this);
        });
        $('.updateStandards').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            Standards.updateStandards(this);
        });
    }
};