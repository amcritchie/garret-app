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
    },
    viewSubmissionListener: function () {
        $('.viewSubmission').on('click', function () {
//            e.preventDefault();
//
////            var copy = $.extend(true, {}, e);
////            setTimeout(function() {
////                $(copy.target.parentNode).trigger(copy);
////            },2000);
//            e.stopPropagation();
//            e.stopPropagation();
//
//            setTimeout(function() {
//                e.startPropagation();
//            }, 1000);

            Evaluation.applicationId = $(this).data('application-id');
            Evaluation.open();
        });
    },
    acceptSubmissionListener: function () {
        $('.acceptSubmission').on('click', function () {
            var id = $(this).data('application-id');
            var a = $(this).parent();
            $(this).html('<i class="fa fa-spinner fa-spin"></i>');
            Ajax.respondToSubmittedEvaluation(id, 'application/accept', function(){
                a.parent().children().children('button').remove();
                a.prepend('Evaluation Accepted');
            });
        });
    },
    reopenSubmissionListener: function () {
        $('.rejectSubmission').on('click', function () {
            var id = $(this).data('application-id');
            var a = $(this).parent();
            $(this).html('<i class="fa fa-spinner fa-spin"></i>');
            Ajax.respondToSubmittedEvaluation(id, 'application/reopen', function(){
                a.parent().children().children('button').remove();
                a.prepend('Evaluation Reopened');
            });
        });
    },
    pendingEvaluationApplicationListeners: function () {
        $('.approveApplication').on('click', function () {
            AdminDashboard.respondToPendingEvaluationApplication(this, 'application/approve', 'Approved');
        });
        $('.denyApplication').on('click', function () {
            AdminDashboard.respondToPendingEvaluationApplication(this, 'application/deny', 'Decided');
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