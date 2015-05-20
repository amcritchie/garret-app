var LoggedOut = {
    load: function() {
        $('.sign-up').on('click', function() {
            $('#myTab').find('[href=#signup]').click();
        });
        $('.sign-in').on('click', function() {
            $('#myTab').find('[href=#signin]').click();
        });
    }
};