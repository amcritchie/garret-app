var Router = {
    load: function() {
        if ($('#signedOut').length) {
            LoginRegister.load();
        } else if (window.location.pathname.indexOf('/admin') === 0) {
            console.log('in admin!!!');
            Admin.load();
        } else if (window.location.pathname.indexOf('/applications') === 0) {
            console.log('app load');
            Application.load();
        } else if (window.location.pathname.indexOf('/restaurant') === 0) {
            console.log('app load');
            Evaluations.load();
        } else if ($('#editRestaurnat')) {
            console.log('restaurant load');
            Evaluations.load();
        }
        else {
            console.log('not admin');
            User.load();
        }
    }
};

var LoginRegister = {
    load: function() {
        $('.sign-up').on('click', function() {
            $('#myTab').find('[href=#signup]').click();
        });

        $('.sign-in').on('click', function() {
            $('#myTab').find('[href=#signin]').click();
        });
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