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
            var applyButton = $(this);
            var evaluationID = applyButton.data('evaluation-id');
            Ajax.applyToEvaluation(evaluationID, function() {
                applyButton.addClass('btn-danger').html('Pending').off('click');
            });
        });
    }
};