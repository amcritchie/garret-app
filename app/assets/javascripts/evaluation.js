var Evaluation = {

    applicationId: null,
    evaluationId: null,
    score: '13:0|14:0|15:1|16:1',

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
                allItems: document.getElementById("all_items").value,
                check: document.getElementById("check_id").value,
                table: document.getElementById("table_id").value,
                checkAmount: document.getElementById("check_amount").value
            },
            employees: {
                reservationist: {
                    valid: document.getElementById("no_res").value,
                    gender: $("input[name=res_gender]:checked").val(),
//                    height: document.getElementById("res_height").value,
                    hair: document.getElementById("res_name").value,
                    other: document.getElementById("res_time").value
                },
                bartender: {
                    valid: document.getElementById("no_bar").value,
                    gender: $("input[name=bar_gender]:checked").val(),
                    height: document.getElementById("bar_height").value,
                    hair: document.getElementById("bar_hair").value,
                    other: document.getElementById("bar_other").value
                },
                host1: {
                    valid: document.getElementById("no_ho1").value,
                    gender: $("input[name=ho1_gender]:checked").val(),
                    height: document.getElementById("ho1_height").value,
                    hair: document.getElementById("ho1_hair").value,
                    other: document.getElementById("ho1_other").value
                },
                host2: {
                    valid: document.getElementById("no_ho2").value,
                    gender: $("input[name=ho2_gender]:checked").val(),
                    height: document.getElementById("ho2_height").value,
                    hair: document.getElementById("ho2_hair").value,
                    other: document.getElementById("ho2_other").value
                },
                manager: {
                    valid: document.getElementById("no_man").value,
                    gender: $("input[name=man_gender]:checked").val(),
                    height: document.getElementById("man_height").value,
                    hair: document.getElementById("man_hair").value,
                    other: document.getElementById("man_other").value
                },
                server: {
                    valid: document.getElementById("no_ser").value,
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
        $('.questionCheckboxAll').each(function (index, question) {

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

    refresh: function () {

        $('label').removeClass('active');
        $('.questionNil').show();

    },

    open: function () {
        var info = {id: Evaluation.applicationId};
        $.when(Evaluation.getScore(info)).done(function (response) {
            Evaluation.refresh();
            Evaluation.removeQuestionsWithStandardsZero(response.standards);
            Evaluation.loadScores(response.score);
            Evaluation.registerClickAnswer();


//            if (window.location.pathname.indexOf('/admin') !== 0) {
//                $('.questionLabel').off('click');
//                $('.questionCheckbox').off('click');
//                $('.questionFailed').off('click');
//                $('.questionPassed').off('click');
//            }

        });
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
                $(value).remove();
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

            $('.questionLabel').css("background-color", "white");
            $('.active.questionPassed').css("background-color", "lightgreen");
            $('.active.questionFailed').css("background-color", "tomato");
            $('.active.questionNA').css("background-color", "orange");

            Evaluation.addSubmit();
            Evaluation.registerClickAnswer();

            setTimeout(function () {
                Evaluation.save();
            }, 20);
        });
    },

    getScore: function (info) {
        var deferred = $.Deferred();
        $.ajax({
            type: "POST",
            url: "application/get_score.json",
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

    loadScores: function (score) {
        score.split('|').forEach(function (question) {
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
        });
//        $('.questionNil').not('.active').children().remove();
//        $('.questionNil').not('.active').removeClass('btn-default');
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
                var allQuestions = $('.questionCheckboxAll');
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
//                        $('.modal-body').prepend('asd')
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