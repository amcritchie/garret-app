var Evaluation = {

    applicationId: null,
    evaluationId: null,
    score: '13:0|14:0|15:1|16:1',

    open: function (callback) {
        var info = {id: Evaluation.applicationId};
        $.when(Evaluation.getScore(info)).done(function (response) {
            Evaluation.refresh();
            Evaluation.removeQuestionsWithStandardsZero(response.standards);
            Evaluation.loadScores(response.score);
            Evaluation.setDisableEvents();
            Evaluation.loadDetails(response.application);
            Evaluation.registerClickAnswer();

            callback();

            $('.evaluationFill').on('keyup', function() {
                Evaluation.save();
            });
            $('.evaluationClick').on('click', function() {
                setTimeout(function() {
                    Evaluation.save();
                }, 20);
            });
        });
    },
    getScore: function (info) {
        var deferred = $.Deferred();
        $.ajax({
            type: "POST",
            url: "/application/get_score.json",
            data: info,
            success: function (response) {
                deferred.resolve(response)
            },
            error: function (response) {
                deferred.reject(response)
            }
        });
        return deferred;
    },
    refresh: function () {
        $('.question-row').show();
        $('.evaluationFill').prop('disabled', false).val('');
        $('.evaluationClick').prop('disabled', false).prop('checked', false);
        $('.questionCheckboxAll').attr('data-relevant', true);
        $('.answerExplanation').hide();
        $('label').removeClass('active');
        $('.questionNil').show();

    },

    save: function () {
        if (window.location.pathname.indexOf('/admin') !== 0) {
            var info = {
                id: Evaluation.applicationId,
                score: Evaluation.getScoreString(),
                details: Evaluation.getDetails()
            };
            $.ajax({
                type: "POST",
                url: "application/update_score",
                data: info
            });
        }
    },

    getDetails: function () {
        return {
            time_spots: {
                arrival_time: document.getElementById("arrival_time").value,
                departure_time: document.getElementById("departure_time").value
            },
            check: {
                allItems: document.getElementById("all_items").checked,
                check: document.getElementById("check_id").value,
                table: document.getElementById("table_id").value,
                checkAmount: document.getElementById("check_amount").value
            },
            employees: {
                reservationist: {
                    valid: document.getElementById("no_res").checked,
                    gender: $("input[name=res_gender]:checked").val(),
//                    height: document.getElementById("res_height").value,
                    hair: document.getElementById("res_name").value,
                    other: document.getElementById("res_time").value
                },
                bartender: {
                    valid: document.getElementById("no_bar").checked,
                    gender: $("input[name=bar_gender]:checked").val(),
                    height: document.getElementById("bar_height").value,
                    hair: document.getElementById("bar_hair").value,
                    other: document.getElementById("bar_other").value
                },
                host1: {
                    valid: document.getElementById("no_ho1").checked,
                    gender: $("input[name=ho1_gender]:checked").val(),
                    height: document.getElementById("ho1_height").value,
                    hair: document.getElementById("ho1_hair").value,
                    other: document.getElementById("ho1_other").value
                },
                host2: {
                    valid: document.getElementById("no_ho2").checked,
                    gender: $("input[name=ho2_gender]:checked").val(),
                    height: document.getElementById("ho2_height").value,
                    hair: document.getElementById("ho2_hair").value,
                    other: document.getElementById("ho2_other").value
                },
                manager: {
                    valid: document.getElementById("no_man").checked,
                    gender: $("input[name=man_gender]:checked").val(),
                    height: document.getElementById("man_height").value,
                    hair: document.getElementById("man_hair").value,
                    other: document.getElementById("man_other").value
                },
                server: {
                    valid: document.getElementById("no_ser").checked,
                    gender: $("input[name=ser_gender]:checked").val(),
                    height: document.getElementById("ser_height").value,
                    hair: document.getElementById("ser_hair").value,
                    other: document.getElementById("ser_other").value
                }

            }
        }
    },

    getScoreString: function () {
        var array = [];
//        $('.questionCheckboxAll:visible').each(function (index, question) {
        $('.questionCheckboxAll[data-relevant=true]').each(function (index, question) {

            var id = $(question).data('question-id');
            if ($($(this).children()[1]).hasClass('active')) {
                array.push([id + ':' + 0 + ':' + $(this).parent().find('.answerExplanation').val()]);
            } else if ($($(this).children()[0]).hasClass('active')) {
                array.push([id + ':' + 2 + ':' + $(this).parent().find('.answerExplanation').val()]);
            } else if ($($(this).children()[3]).hasClass('active')) {
                array.push([id + ':' + 1]);
            }
        });
        return array.join('|')
    },

    setDisableEvents: function() {
        $('#no_bar').on('click', function(){
            Evaluation.disableEmployee(this,'bar');
        });
        $('#no_ho1').on('click', function(){
            Evaluation.disableEmployee(this,'ho1');
        });
        $('#no_ho2').on('click', function(){
            Evaluation.disableEmployee(this,'ho2');
        });
        $('#no_man').on('click', function(){
            Evaluation.disableEmployee(this,'man');
        });
        $('#no_ser').on('click', function(){
            Evaluation.disableEmployee(this,'ser');
        });
        $('#no_res').on('click', function(){
            if ($(this).prop( "checked" )){
                $('#res_name').prop('disabled', true).val('');
                $('#res_time').prop('disabled', true).val('');
                $('[name=res_gender]').prop('disabled', true).prop('checked', false);
            } else {
                $('#res_name').prop('disabled', false);
                $('#res_time').prop('disabled', false);
                $('[name=res_gender]').prop('disabled', false);
            }
        });
    },

    disableEmployee: function(box, key) {
        if ($(box).prop( "checked" )){
            $('#' + key + '_hair').prop('disabled', true).val('');
            $('#' + key + '_height').prop('disabled', true).val('');
            $('#' + key + '_other').prop('disabled', true).val('');
            $('[name=' + key + '_gender]').prop('disabled', true).prop('checked', false);
        } else {
            $('#' + key + '_hair').prop('disabled', false);
            $('#' + key + '_height').prop('disabled', false);
            $('#' + key + '_other').prop('disabled', false);
            $('[name=' + key + '_gender]').prop('disabled', false);
        }
    },

    removeQuestionsWithStandardsZero: function (standards) {
        var standardsObject = {};
        standards.split('|').forEach(function (questionAndStandard) {
            var id = questionAndStandard.split(':')[0];
            standardsObject[id] = questionAndStandard.split(':')[1];
        });

        $.each($('.question-row'), function (key, value) {
            var questionId = $(value).data('question-id');
            if ((!standardsObject[questionId]) || standardsObject[questionId] === '0') {
                $(value).hide();
                $(value).find('.questionCheckboxAll').attr('data-relevant', false);
            }
        })
    },

    registerClickAnswer: function () {
        $('.questionLabel').on('click', function () {
            $('.questionCheckbox').off('click');
            var id = $(this).data('question-id');
            if ($(this).children().val() === '1') {
                $('.questionPass[data-question-id=' + id + ']').click();
                $('.answerExplanation[data-question-id=' + id + ']').hide();
                $('.questionNil[data-question-id=' + id + ']').hide();
            } else if ($(this).children().val() === '0') {
                $('.questionFail[data-question-id=' + id + ']').click();
                $('.answerExplanation[data-question-id=' + id + ']').show();
                $('.questionNil[data-question-id=' + id + ']').hide();
            } else if ($(this).children().val() === '2') {
                $('.questionNA[data-question-id=' + id + ']').click();
                $('.answerExplanation[data-question-id=' + id + ']').show();
                $('.questionNil[data-question-id=' + id + ']').hide();
            }

            var answerExplanation = $('.answerExplanation[data-question-id=' + id + ']');
            answerExplanation.off('keyup');
            answerExplanation.on('keyup', function() {
                answerExplanation.val($(this).val());
                Evaluation.save();
            });

            $('.questionLabel').css("background-color", "white");
            $('.active.questionPassed').css("background-color", "lightgreen");
            $('.active.questionFailed').css("background-color", "tomato");
            $('.active.questionNA').css("background-color", "orange");

            Evaluation.addSubmit();
            Evaluation.registerClickAnswer();

//            setTimeout(function () {
//                Evaluation.save();
//            }, 20);
        });
    },

    loadDetails: function (details) {
        $(document.getElementById("arrival_time")).val(details.arrive_time);
        $(document.getElementById("departure_time")).val(details.depart_time);
        if (details.check_all_items_billed){
            document.getElementById("all_items").click()
        }
        $(document.getElementById("check_id")).val(details.check_num);
        $(document.getElementById("table_id")).val(details.table_num);
        $(document.getElementById("check_amount")).val(details.check_amount);

        if (details.res_valid){
            document.getElementById("no_res").click()
        }
        $('[name=res_gender][value=' + details.res_gender +']').click();
        $(document.getElementById("res_height")).val(details.res_height);
        $(document.getElementById("res_name")).val(details.res_hair);
        $(document.getElementById("res_time")).val(details.res_other);

        if (details.bar_valid){
            document.getElementById("no_bar").click()
        }
        $('[name=bar_gender][value=' + details.bar_gender +']').click();
        $(document.getElementById("bar_height")).val(details.bar_height);
        $(document.getElementById("bar_hair")).val(details.bar_hair);
        $(document.getElementById("bar_other")).val(details.bar_other);


        if (details.host1_valid){
            document.getElementById("no_ho1").click()
        }
        $('[name=ho1_gender][value=' + details.host1_gender +']').click();
        $(document.getElementById("ho1_height")).val(details.host1_height);
        $(document.getElementById("ho1_hair")).val(details.host1_hair);
        $(document.getElementById("ho1_other")).val(details.host1_other);


        if (details.host2_valid){
            document.getElementById("no_ho2").click()
        }
        $('[name=ho2_gender][value=' + details.host2_gender +']').click();
        $(document.getElementById("ho2_height")).val(details.host2_height);
        $(document.getElementById("ho2_hair")).val(details.host2_hair);
        $(document.getElementById("ho2_other")).val(details.host2_other);

        if (details.man_valid){
            document.getElementById("no_man").click()
        }
        $('[name=man_gender][value=' + details.man_gender +']').click();
        $(document.getElementById("man_height")).val(details.man_height);
        $(document.getElementById("man_hair")).val(details.man_hair);
        $(document.getElementById("man_other")).val(details.man_other);

        if (details.ser_valid){
            document.getElementById("no_ser").click()
        }
        $('[name=ser_gender][value=' + details.ser_gender +']').click();
        $(document.getElementById("ser_height")).val(details.ser_height);
        $(document.getElementById("ser_hair")).val(details.ser_hair);
        $(document.getElementById("ser_other")).val(details.ser_other);
    },

    loadScores: function (score) {
        score.split('|').forEach(function (question) {
            if (question) {
                var id = question.split(':')[0];
                if (question.split(':')[1] === '1') {
                    $('.questionPass[data-question-id=' + id + ']').click();
                    $('.questionNil[data-question-id=' + id + ']').hide();
                } else if (question.split(':')[1] === '0') {
                    $('.questionFail[data-question-id=' + id + ']').click();
                    $('.answerExplanation[data-question-id=' + id + ']').show().val(question.split(':')[2]);
                    $('.questionNil[data-question-id=' + id + ']').hide();
                } else if (question.split(':')[1] === '2') {
                    $('.questionNA[data-question-id=' + id + ']').click();
                    $('.answerExplanation[data-question-id=' + id + ']').show().val(question.split(':')[2]);
                    $('.questionNil[data-question-id=' + id + ']').hide();
                }

                $('.answerExplanation[data-question-id=' + id + ']').on('keyup', function() {
                    $('.answerExplanation[data-question-id=' + id + ']').val($(this).val());
                });
            }
        });

        $('.questionLabel').css("background-color", "white");
        $('.active.questionPassed').css("background-color", "lightgreen");
        $('.active.questionFailed').css("background-color", "tomato");
        $('.active.questionNA').css("background-color", "orange");
        Evaluation.addSubmit();
    },

    addSubmit: function () {
        if (window.location.pathname.indexOf('/admin') !== 0) {
            if ($('.submitEvaluation').length === 0) {
                var answeredQuestion = 0;
                var allQuestions = $('.questionCheckboxAll[data-relevant=true]');
                allQuestions.each(function (question) {
                    if ($($(this).children()[0]).hasClass('active')) {
                        answeredQuestion++;
                    } else if ($($(this).children()[1]).hasClass('active')) {
                        answeredQuestion++;
                    } else if ($($(this).children()[3]).hasClass('active')) {
                        answeredQuestion++;
                    }
                });
                if (answeredQuestion === allQuestions.length) {
                    $('.user-evaluation-center').append('<button class="btn btn-success submitEvaluation">Submit</button>');
                    $('.submitEvaluation').on('click', function () {
                        var allExplanationsFilled = true;
                        $('.answerExplanation').each(function (a, e) {
                            if ((!$(e).val()) && $(e).is(":visible")) {
                                allExplanationsFilled = false;
                            }
                        });

                        if (allExplanationsFilled) {
                            var info = {
                                id: Evaluation.applicationId
                            };
                            $.ajax({
                                type: "POST",
                                url: "application/submit",
                                data: info
                            });
                            location.reload();
                        } else {
                            $('.user-evaluation-center').prepend('<div class="red-text evaluation-error">Please Fill in Explanations<hr></div>');
                            $('.modal-body').prepend('<div class="red-text evaluation-error">Please Fill in Explanations</div>');
                            $('#all-questions').click();
                            setTimeout(function () {
                                $('.evaluation-error').fadeOut()
                            }, 3000);
                        }
                    });
                }
            }
        }
    }
};