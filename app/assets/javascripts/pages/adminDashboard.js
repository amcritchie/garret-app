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
            Standards.saveStandards(this);
        });
        $('.updateStandards').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            Standards.updateStandards(this);
        });
    }
};