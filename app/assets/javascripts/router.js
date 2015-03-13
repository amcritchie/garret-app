var Router = {
    load: function() {
        if (window.location.pathname.indexOf('/admin') === 0) {
            console.log('in admin!!!');
            Admin.load();
        } else {
            console.log('not admin');
            User.load();
        }
    }
};

var User = {
    load: function() {

        $('.applyToEvaluation').on('click', function () {
            var evaluationID = $(this).data('evaluation-id');
            $.ajax({
                type: "POST",
                url: "evaluations/apply",
                data: {evaluation_id: evaluationID}
            });
            $(this).addClass('btn-danger').html('Pending').off('click');
        });

        $('.startEvaluation').on('click', function () {
            Evaluation.applicationId = $(this).data('application-id');
            Evaluation.open();
        });
    }
};