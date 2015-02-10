var FlashMessage = {
    timer: null,
    error: function(data,place){
        clearTimeout(FlashMessage.timer);
        $('.flashError').remove();
        var flash = place.prepend('<div class="flashError">'+data.error+'</div>');
        FlashMessage.timer = setTimeout(function(){
            $('.flashError').fadeOut();
        }, 2000);
    },
    formError: function(place, error){
        clearTimeout(FlashMessage.timer);
        $('.flashError').remove();
        var flash = place.prepend('<div class="flashError">'+error+'</div><br>');
        FlashMessage.timer = setTimeout(function(){
            $('.flashError').fadeOut();
        }, 2000);
    },
    signUpErrors: function (errors) {
        $('.modalError').remove();
        $.each(errors, function(key, value){
            FlashMessage.signUpError($('[for='+key+']'), value);
        });
    },
    signUpError: function (place, message) {
        place.append('<p class="modalError">'+message+'</p>');
    },
    clear: function(){
    }
};