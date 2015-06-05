var UserDashboard = {
    load: function() {
        UserDashboard.listenForOpenEvaluation();
        UserDashboard.listenForApplyToEvaluation();
    },
    listenForOpenEvaluation: function() {
        $('.startEvaluation').on('click', function (e) {
            $('#all-questions').click();
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
            $('#applicationMessage').val('');
            $('.submitApplication').off('click').on('click', function () {
                var message = $('#applicationMessage').val();
                $(this).html('<i class="fa fa-spinner fa-spin"></i>');
                applyButton.html('<i class="fa fa-spinner fa-spin"></i>');
                Ajax.applyToEvaluation(evaluationID, message, function () {
                    applyButton.parent().append('<p class="btn-danger pendingEvaluation margin-0">pending</p>');
                    applyButton.remove();
                });
            });
        });
    }
};