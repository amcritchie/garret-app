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
//            Ajax.applyToEvaluation(evaluationID, function() {
//                applyButton.addClass('btn-danger').html('Pending').off('click');
//            });
        });
        $('.applyToEvaluation').on('click', function () {
            var applyButton = $(this);
            var evaluationID = applyButton.data('evaluation-id');
//            var tableButton = $(this);
//            var id = $(this).data('application-id');
//            var a = $(this).parent();
            $('#applicationMessage').val('');
            $('.submitApplication').off('click').on('click', function () {
                var message = $('#applicationMessage').val();
                $(this).html('<i class="fa fa-spinner fa-spin"></i>');
                applyButton.html('<i class="fa fa-spinner fa-spin"></i>');
//                debugger;
                Ajax.applyToEvaluation(evaluationID, message, function () {
                    applyButton.addClass('btn-danger').html('Pending').off('click');
                });
//                Ajax.respondToSubmittedEvaluation({id: id, message: message}, 'application/reopen', function () {
//                    a.parent().children().children('button').remove();
//                    a.parent().children().children('a').remove();
//                    a.prepend('Evaluation Reopened');

//                });
            });
        });
    }
//    ,
//    reopenSubmissionListener: function () {
//        $('.applyToEvaluation').on('click', function () {
//            var tableButton = $(this);
//            var id = $(this).data('application-id');
//            var a = $(this).parent();
//            $('#applicationMessage').val('');
//            $('.reopenEvaluation').off('click').on('click', function () {
//                var message = $('#applicationMessage').val();
//                $(this).html('<i class="fa fa-spinner fa-spin"></i>');
//                tableButton.html('<i class="fa fa-spinner fa-spin"></i>');
////                Ajax.respondToSubmittedEvaluation({id: id, message: message}, 'application/reopen', function () {
////                    a.parent().children().children('button').remove();
////                    a.parent().children().children('a').remove();
////                    a.prepend('Evaluation Reopened');
////                });
//            });
//        });
//    }
};