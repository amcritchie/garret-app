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
            Evaluation.applicationId = $(this).data('application-id');
            Evaluation.open();
        });
    },
    acceptSubmissionListener: function () {
        $('.acceptSubmission').on('click', function () {
            var id = $(this).data('application-id');
            var a = $(this).parent();
            Ajax.respondToSubmittedEvaluation(id, 'application/accept', function(){
                a.parent().children().children('button').remove();
                a.prepend('Evaluation Reopened');
            });
        });
    },
    reopenSubmissionListener: function () {
        $('.rejectSubmission').on('click', function () {
            var id = $(this).data('application-id');
            var a = $(this).parent();
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