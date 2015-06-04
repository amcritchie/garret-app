// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap
//= require turbolinks
//= require_tree .

$(document).ready(function () {
    $.fn.pVal = function () {
        var $this = $(this),
            val = $this.eq(0).val();
        if (val == $this.attr('placeholder'))
            return '';
        else
            return val;
    };

    Form.login();
    Form.signUp();
    Form.restaurant();
    Form.evaluation();
    Form.question();//
//    Register.login();
//    Register.signUp();
//    Register.restaurant();
//    Register.addQuestion();

    var backgroundImage = document.location.origin + "/assets/wine.jpg";
    $('<img/>').attr('src', backgroundImage).load(function() {
        $(this).remove(); // prevent memory leaks as @benweet suggested
        $('#homePage').css('background-image', 'url(' + backgroundImage  + ')').fadeIn('slow');
    });

    String.prototype.splice = function (idx, rem, s) {
        return (this.slice(0, idx) + s + this.slice(idx + Math.abs(rem)));
    };
    $('[type=tel]').on('click', function () {
        $(this).on('keyup', function (e) {
            var noActionKeyCodes = [8, 13, 16, 18, 37, 38, 39, 40, 91];
            if (($.inArray(e.keyCode, noActionKeyCodes) === -1)) {
                var phone_number = $(this).val();
                if (phone_number.charAt(0) !== '(') {
                    phone_number = '(' + phone_number;
                }
                if ((phone_number.length > 3) && (phone_number.charAt(4) !== ')')) {
                    phone_number = phone_number.splice(4, 0, ") ");
                }
                if ((phone_number.length > 8) && (phone_number.charAt(9) !== '-')) {
                    phone_number = phone_number.splice(9, 0, "-");
                }
                $(this).val(phone_number.substring(0, 14))
            }
        });
    });


    // Load from url params
    $.urlParam = function (name) {
        var results = new RegExp('[\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
        return results ? results[1] : 0;
    };
    var loadEvaluation = $.urlParam('load_evaluation');
    if (loadEvaluation) {
        setTimeout(function () {
            $('.viewSubmission[data-application-id=' + loadEvaluation + ']:visible').click();
            $('.startEvaluation[data-application-id=' + loadEvaluation + ']:visible').click();
        }, 500);
    }
});

$(document).ready(function () {
    Router.load();

    var panels = $('.user-infos');
    var panelsButton = $('.dropdown-user');
    panels.hide();

    $('#printPage').click(function () {
        window.print();
    });

    //Click dropdown
    panelsButton.click(function () {
        //get data-for attribute
        var dataFor = $(this).attr('data-for');
        var idFor = $(dataFor);

        //current button
        var currentButton = $(this);
        idFor.slideToggle(400, function () {
            //Completed slidetoggle
            if (idFor.is(':visible')) {
                currentButton.html('<i class="glyphicon glyphicon-chevron-up text-muted"></i>');
            }
            else {
                currentButton.html('<i class="glyphicon glyphicon-chevron-down text-muted"></i>');
            }
        })
    });

    $('[data-toggle="tooltip"]').tooltip();

    $('button').click(function (e) {
        e.preventDefault();
//        alert("This is a demo.\n :-)");
    });
});

