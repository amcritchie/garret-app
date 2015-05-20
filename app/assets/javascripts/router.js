var Router = {
    load: function() {
        if ($('#signedOut').length) {
            LoggedOut.load();
        } else if ($('#editUser').length) {
            UserDashboard.load();
        } else if (window.location.pathname.indexOf('/admin') === 0) {
            AdminDashboard.load();
        } else if (window.location.pathname.indexOf('/restaurant') === 0) {
            Evaluations.load();
        } else if ($('#editRestaurant').length) {
            Evaluations.load();
        }
    }
};