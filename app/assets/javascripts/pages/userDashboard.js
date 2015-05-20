var UserDashboard = {
    load: function() {
        UserDashboard.listenForOpenEvaluation();
        UserDashboard.listenForApplyToEvaluation();
    },
    listenForOpenEvaluation: function() {
        $('.startEvaluation').on('click', function () {
            Evaluation.applicationId = $(this).data('application-id');
            Evaluation.open();
        });
    },
    listenForApplyToEvaluation: function() {
        $('.applyToEvaluation').on('click', function () {
            var evaluationID = $(this).data('evaluation-id');
            UserDashboard.applyToEvaluation(evaluationID);
        });
    },
    applyToEvaluation: function(evaluationID) {
        $.ajax({
            type: "POST",
            url: "evaluations/apply",
            data: {evaluation_id: evaluationID}
        });
        $(this).addClass('btn-danger').html('Pending').off('click');
    }
};