var Evaluation = {

    applicationId: null,
    evaluationId: null,
    score: '13:0|14:0|15:1|16:1',

    errorTimer: null,

    open: function (callback) {
        var info = {id: Evaluation.applicationId};
        $.when(Evaluation.getScore(info)).done(function (response) {
            Evaluation.refresh();
            Evaluation.removeQuestionsWithStandardsZero(response.standards);
            Evaluation.removerDepartmentsWithNoQuestions(response.standards);
//            Evaluation.setDisableEvents();
//            Evaluation.loadDescriptions(response.application.department_descriptions);
//            Evaluation.loadScores(response.score);
            EvaluationScore.load(response.score);
            RestaurantDetails.load(response.application);
            RestaurantDetails.setDisableEvents();
            DepartmentDescriptions.load(response.application.department_descriptions);

            Evaluation.registerClickAnswer();

            $('.questionLabel').css("background-color", "white");
            $('.active.questionPassed').css("background-color", "lightgreen");
            $('.active.questionFailed').css("background-color", "tomato");
            $('.active.questionNA').css("background-color", "orange");
            Evaluation.addSubmit();

            callback();

            // We need to wait until after load scores so a click isn't triggered for every click in that function.
            $('.evaluationFill').on('keyup', function () {
                Evaluation.save();
            });
            $('.departmentDescription').on('keyup', function () {
                Evaluation.save();
            });
            $('.evaluationClick').on('click', function () {
                // This is needed, or the evaluation would be saved before the class 'active' moves to the correct input.
                setTimeout(function(){
                    Evaluation.save();
                }, 500);
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
        $('.department-tab').show();
        $('.evaluationFill').prop('disabled', false).val('').off('keyup');
//        $('.departmentDescription').val('');
        $('.evaluationClick').prop('disabled', false).prop('checked', false).off('click');
        $('.departmentDescription').attr('data-relevant', true).val('').off('keyup');
        $('.questionCheckboxAll').attr('data-relevant', true);
        $('.answerExplanation').hide();
        $('label').removeClass('active');
        $('.questionNil').show();
        Evaluation.visualRefresh();
//        $('.evaluationFill').off('keyup');
//        $('.departmentDescription').off('keyup');
//        $('.evaluationClick').off('click');
    },

    visualRefresh: function () {
        $('.errorInput').removeClass('errorInput');
        $('.evaluation-error').remove();
    },

    save: function () {
        if (window.location.pathname.indexOf('/admin') !== 0) {
            var info = {
                id: Evaluation.applicationId,
//                details: Evaluation.getDetails(),
//                descriptions: Evaluation.getDescriptions()
//                score: Evaluation.getScoreString(),
                score: EvaluationScore.save(),
                details: RestaurantDetails.save(),
                descriptions: DepartmentDescriptions.save()
            };
//            debugger;
            $.ajax({
                type: "POST",
                url: "application/update_score",
                data: info
            });
        }
    },

//    getDescriptions: function () {
//        var array = [];
//        $('.departmentDescription[data-relevant=true]').each(function (index, question) {
//            var id = $(question).attr('data-description-id');
//            var value = $(question).val();
//            array.push(id + 'Æχ' + value);
//        });
//        return array.join('|Θ')
//    },
//    getScoreString: function () {
//        var array = [];
////        $('.questionCheckboxAll:visible').each(function (index, question) {
//        $('.questionCheckboxAll[data-relevant=true]').each(function (index, question) {
//
//            var id = $(question).data('question-id');
//            if ($($(this).children()[1]).hasClass('active')) {
//                array.push([id + ':' + 0 + ':' + $(this).parent().find('.answerExplanation').val()]);
//            } else if ($($(this).children()[0]).hasClass('active')) {
//                array.push([id + ':' + 2 + ':' + $(this).parent().find('.answerExplanation').val()]);
//            } else if ($($(this).children()[3]).hasClass('active')) {
//                array.push([id + ':' + 1]);
//            }
//        });
//        return array.join('|')
//    },

//    setDisableEvents: function () {
//        $('#no_bar').on('click', function () {
//            Evaluation.disableEmployee(this, 'bar');
//        });
//        $('#no_ho1').on('click', function () {
//            Evaluation.disableEmployee(this, 'ho1');
//        });
//        $('#no_ho2').on('click', function () {
//            Evaluation.disableEmployee(this, 'ho2');
//        });
//        $('#no_man').on('click', function () {
//            Evaluation.disableEmployee(this, 'man');
//        });
//        $('#no_ser').on('click', function () {
//            Evaluation.disableEmployee(this, 'ser');
//        });
//        $('#no_res').on('click', function () {
//            if ($(this).prop("checked")) {
//                $('#res_name').prop('disabled', true).val('');
//                $('#res_time').prop('disabled', true).val('');
//                $('[name=res_gender]').prop('disabled', true).prop('checked', false);
//            } else {
//                $('#res_name').prop('disabled', false);
//                $('#res_time').prop('disabled', false);
//                $('[name=res_gender]').prop('disabled', false);
//            }
//        });
//    },
//
//    disableEmployee: function (box, key) {
//        if ($(box).prop("checked")) {
//            $('#' + key + '_hair').prop('disabled', true).val('');
//            $('#' + key + '_height').prop('disabled', true).val('');
//            $('#' + key + '_other').prop('disabled', true).val('');
//            $('[name=' + key + '_gender]').prop('disabled', true).prop('checked', false);
//        } else {
//            $('#' + key + '_hair').prop('disabled', false);
//            $('#' + key + '_height').prop('disabled', false);
//            $('#' + key + '_other').prop('disabled', false);
//            $('[name=' + key + '_gender]').prop('disabled', false);
//        }
//    },

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

    removerDepartmentsWithNoQuestions: function () {
        var activeQuestionRows = $('#allQuestions').find('.question-row')
            .filter(function () {
                return $(this).css('display') == 'table-row'
            });
        var activeQuestionIds = [];
        activeQuestionRows.each(function (index, row) {
            activeQuestionIds.push($(row).data('question-id'));
        });

        $('.department-tab-pane').each(function (index, department) {
            var hideDepartment = true;
            $(department).find('.question-row').each(function (i, question) {
                if ((!hideDepartment) || $(question).css('display') === 'table-row') {
                    hideDepartment = false;
                }
            });
            if (hideDepartment) {
                $('.department-tab[data-department=' + department.id + ']').hide();
                $(department).find('.departmentDescription').attr('data-relevant', false);
            }
        });
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
            answerExplanation.on('keyup', function () {
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

//    loadDescriptions: function (descriptions) {
//        if (descriptions) {
//            descriptions.split('|Θ').forEach(function (description) {
//                if (description) {
//                    var id = description.split('Æχ')[0];
//                    var value = description.split('Æχ')[1];
//                    $('.departmentDescription[data-description-id=' + id + ']').val(value);
//                }
//            });
//        }
//    },
//    loadScores: function (score) {
//        score.split('|').forEach(function (question) {
//            if (question) {
//                var id = question.split(':')[0];
//                if (question.split(':')[1] === '1') {
//                    $('.questionPass[data-question-id=' + id + ']').click();
//                    $('.questionNil[data-question-id=' + id + ']').hide();
//                } else if (question.split(':')[1] === '0') {
//                    $('.questionFail[data-question-id=' + id + ']').click();
//                    $('.answerExplanation[data-question-id=' + id + ']').show().val(question.split(':')[2]);
//                    $('.questionNil[data-question-id=' + id + ']').hide();
//                } else if (question.split(':')[1] === '2') {
//                    $('.questionNA[data-question-id=' + id + ']').click();
//                    $('.answerExplanation[data-question-id=' + id + ']').show().val(question.split(':')[2]);
//                    $('.questionNil[data-question-id=' + id + ']').hide();
//                }
//
//                $('.answerExplanation[data-question-id=' + id + ']').on('keyup', function () {
//                    $('.answerExplanation[data-question-id=' + id + ']').val($(this).val());
//                });
//            }
//        });
//
//        $('.questionLabel').css("background-color", "white");
//        $('.active.questionPassed').css("background-color", "lightgreen");
//        $('.active.questionFailed').css("background-color", "tomato");
//        $('.active.questionNA').css("background-color", "orange");
//        Evaluation.addSubmit();
//    },

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
//                        Evaluation.visualRefresh();
                        clearTimeout(Evaluation.errorTimer);

                        var allExplanationsFilled = true;
                        $('.answerExplanation').each(function (a, e) {
                            if ((!$(e).val()) && $(e).is(":visible")) {
                                allExplanationsFilled = false;
                            }
                        });

                        if (allExplanationsFilled) {
                            Validate.evaluationDepartmentDescriptions(function (errors) {
                                if (errors) {
                                    $('.user-evaluation-center').prepend('<div class="red-text evaluation-error">Please Fill in Descriptions About Each Department<hr></div>');
                                    $('.modal-body').prepend('<div class="red-text evaluation-error">Please Fill in Descriptions About Each Department</div>');
                                    Evaluation.errorTimer = setTimeout(function () {
                                        $('.evaluation-error').fadeOut()
                                    }, 3000);
                                } else {
                                    var info = {id: Evaluation.applicationId};
                                    $.ajax({
                                        type: "POST",
                                        url: "application/submit",
                                        data: info
                                    });
                                    location.reload();
                                }
                            });
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