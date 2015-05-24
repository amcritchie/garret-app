var UserDashboard = {
    load: function() {
        UserDashboard.listenForOpenEvaluation();
        UserDashboard.listenForApplyToEvaluation();
    },
    listenForOpenEvaluation: function() {
        $('.startEvaluation').on('click', function (e) {
            $(this).html('<i class="fa fa-spinner fa-spin fa-1x"></i>');
            // This is used to reactivate the e.stopPropagation
            var copy = $.extend(true, {}, e);
            e.stopPropagation();

            var button = $(this);
            Evaluation.applicationId = $(this).data('application-id');
            Evaluation.open(function() {
                button.html('Open');
                $(copy.target.parentNode).trigger(copy);
            });
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