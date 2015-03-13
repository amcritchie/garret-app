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

    Register.login();
    Register.signUp();
    Register.restaurant();
    Register.addQuestion();
});

$(document).ready(function () {
    Router.load();

    var panels = $('.user-infos');
    var panelsButton = $('.dropdown-user');
    panels.hide();

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

//    $('.startEvaluation').on('click', function () {
//        Evaluation.applicationId = $(this).data('application-id');
//        Evaluation.open();
//    });
//    $('.deleteQuestion').on('click', function () {
//        $.ajax({
//            type: "POST",
//            url: "/questions/destroy",
//            data: {id: $(this).data('question-id')}
//        });
//        $(this).parent().parent().remove();
//    });
//    if (window.location.pathname.indexOf('/admin') === 0) {
//        console.log('in admin!!!');
//        Admin.load();
//    } else {
//        console.log('not admin');
//    }
//    List.listeners("Keys", "keys");
//    List.listeners("Departments", "departments");
//    $('.applyToEvaluation').on('click', function () {
//        var evaluationID = $(this).data('evaluation-id');
////       debugger;
//        $.ajax({
//            type: "POST",
//            url: "evaluations/apply",
//            data: {evaluation_id: evaluationID}
//        });
//        $(this).addClass('btn-danger').html('Pending').off('click');
//    });
//    $('.approveApplication').on('click', function () {
//        var id = $(this).data('application-id');
//        $.ajax({
//            type: "POST",
//            url: "application/approve",
//            data: {id: id}
//        });
//        var a = $(this).parent();
//        $(this).parent().children('button').remove();
//        a.prepend('Approved');
//    });
//
//    $('.denyApplication').on('click', function () {
//        var id = $(this).data('application-id');
////       debugger;
//        $.ajax({
//            type: "POST",
//            url: "application/deny",
//            data: {id: id}
//        });
//        var a = $(this).parent();
//        $(this).parent().children('button').remove();
//        a.prepend('Decided');
//    });
//    $('.deleteQuestion').on('click', function () {
//        $.ajax({
//            type: "POST",
//            url: "/questions/destroy",
//            data: {id: $(this).data('question-id')}
//        });
//        $(this).parent().parent().remove();
//    });
//    if (window.location.pathname.indexOf('/admin') === 0) {
//        console.log('in admin!!!');
//        Admin.load();
//    } else {
//        console.log('not admin');
//    }
//    List.listeners("Keys", "keys");
//    List.listeners("Departments", "departments");
//    $('.applyToEvaluation').on('click', function () {
//        var evaluationID = $(this).data('evaluation-id');
////       debugger;
//        $.ajax({
//            type: "POST",
//            url: "evaluations/apply",
//            data: {evaluation_id: evaluationID}
//        });
//        $(this).addClass('btn-danger').html('Pending').off('click');
//    });
//    $('.approveApplication').on('click', function () {
//        var id = $(this).data('application-id');
//        $.ajax({
//            type: "POST",
//            url: "application/approve",
//            data: {id: id}
//        });
//        var a = $(this).parent();
//        $(this).parent().children('button').remove();
//        a.prepend('Approved');
//    });
//
//    $('.denyApplication').on('click', function () {
//        var id = $(this).data('application-id');
////       debugger;
//        $.ajax({
//            type: "POST",
//            url: "application/deny",
//            data: {id: id}
//        });
//        var a = $(this).parent();
//        $(this).parent().children('button').remove();
//        a.prepend('Decided');
//    });
//    $('.deleteQuestion').on('click', function () {
//        $.ajax({
//            type: "POST",
//            url: "/questions/destroy",
//            data: {id: $(this).data('question-id')}
//        });
//        $(this).parent().parent().remove();
//    });
//    if (window.location.pathname.indexOf('/admin') === 0) {
//        console.log('in admin!!!');
//        Admin.load();
//    } else {
//        console.log('not admin');
//    }
//    List.listeners("Keys", "keys");
//    List.listeners("Departments", "departments");
//    $('.applyToEvaluation').on('click', function () {
//        var evaluationID = $(this).data('evaluation-id');
////       debugger;
//        $.ajax({
//            type: "POST",
//            url: "evaluations/apply",
//            data: {evaluation_id: evaluationID}
//        });
//        $(this).addClass('btn-danger').html('Pending').off('click');
//    });
//    $('.approveApplication').on('click', function () {
//        var id = $(this).data('application-id');
//        $.ajax({
//            type: "POST",
//            url: "application/approve",
//            data: {id: id}
//        });
//        var a = $(this).parent();
//        $(this).parent().children('button').remove();
//        a.prepend('Approved');
//    });
//
//    $('.denyApplication').on('click', function () {
//        var id = $(this).data('application-id');
////       debugger;
//        $.ajax({
//            type: "POST",
//            url: "application/deny",
//            data: {id: id}
//        });
//        var a = $(this).parent();
//        $(this).parent().children('button').remove();
//        a.prepend('Decided');
//    });
//    $('#saveStandards').on('click',function(e){
//        e.preventDefault();
//        e.stopPropagation();
//
//        $('.standardsError').children().remove();
//        $('.questionStandard').css('border-color','#cccccc');
//        $('#standardName').css('border-color','#cccccc');
//        var error = null;
//        var array = [];
//        $('.questionStandard').each(function(){
//            var questionId = $(this).data('question-id');
//            var value = $(this).val();
//            if (isNaN(parseInt(value))){
//                $(this).css('border-color','red');
//                error = true;
//            }
//            array.push(questionId+':'+value);
//        });
//        if (error) {
//            $('.standardsError').prepend('<h4>Please use only numbers.</h4>');
//        } else {
//            if (!$('#standardName').val()) {
//                $('.standardsError').prepend('<h4>Please give this set a name.</h4>');
//                $('#standardName').css('border-color','red');
//
//            } else {
//                console.log(array.join('|'));
//                console.log($('#standardName').val());
//                $.ajax({
//                    type: "POST",
//                    url: "/standards",
//                    data: {
//                        name: $('#standardName').val(),
//                        details: array.join('|')
//                    }
//                });
//                location.reload();
//
////                $('#closeStandards').click();
//            }
//        }
//    });
});

