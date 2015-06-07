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

            //Set disable events before Restaurant details, for consistent formatting.
            // registerClickAnswer for the same reason
            RestaurantDetails.setDisableEvents();
            Evaluation.registerClickAnswer();

            EvaluationScore.load(response.score);
            RestaurantDetails.load(response.application);

            DepartmentDescriptions.load(response.application.department_descriptions);

            $('.questionLabel').css("background-color", "white");
            $('.active.questionPassed').css("background-color", "lightgreen");
            $('.active.questionFailed').css("background-color", "tomato");
            $('.active.questionNA').css("background-color", "orange");
            Evaluation.addSubmit();

            callback();

            // We need to wait until after load scores so a click isn't triggered for every click in that function.
            $('.evaluationFill').on('focusout', function () {
                Evaluation.save();
            });
//            $('.departmentDescription').on('keyup', function () {
            $('.departmentDescription').on('focusout', function () {
                Evaluation.save();
            });
            $('.evaluationClick').on('click', function () {
                // This is needed, or the evaluation would be saved before the class 'active' moves to the correct input.
                setTimeout(function () {
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
        $('.evaluationFill').prop('disabled', false).val('').off('focusout');
//        $('.departmentDescription').val('');
        $('.evaluationClick').prop('disabled', false).prop('checked', false).off('click');
        $('.departmentDescription').attr('data-relevant', true).val('').off('focusout');
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
                score: EvaluationScore.save(),
                details: RestaurantDetails.save(),
                descriptions: DepartmentDescriptions.save()
            };
            $.ajax({
                type: "POST",
                url: "application/update_score",
                data: info
            });
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
                $('.answerExplanation[data-question-id=' + id + ']').hide().attr('data-relevant', false);
                $('.questionNil[data-question-id=' + id + ']').hide();
            } else if ($(this).children().val() === '0') {
                $('.questionFail[data-question-id=' + id + ']').click();
                $('.answerExplanation[data-question-id=' + id + ']').show().attr('data-relevant', true);
                $('.questionNil[data-question-id=' + id + ']').hide();
            } else if ($(this).children().val() === '2') {
                $('.questionNA[data-question-id=' + id + ']').click();
                $('.answerExplanation[data-question-id=' + id + ']').show().attr('data-relevant', true);
                $('.questionNil[data-question-id=' + id + ']').hide();
            }

            var answerExplanation = $('.answerExplanation[data-question-id=' + id + ']');
            answerExplanation.off('focusout');
            answerExplanation.on('focusout', function () {
                answerExplanation.val($(this).val());
                Evaluation.save();
            });

            $('.questionLabel').css("background-color", "white");
            $('.active.questionPassed').css("background-color", "lightgreen");
            $('.active.questionFailed').css("background-color", "tomato");
            $('.active.questionNA').css("background-color", "orange");

            Evaluation.addSubmit();
            Evaluation.registerClickAnswer();
        });
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
                        Evaluation.submit();
                    });
                }
            }
        }
    },

    submit: function () {
        Evaluation.visualRefresh();
        clearTimeout(Evaluation.errorTimer);
        $('.errorMessage').remove();
        $('.evaluation-error').remove();

        Evaluation.save();

        Validate.evaluationsExplanationsFilled(function (errors) {
            if (errors) {
                Evaluation.headerFooterMessage('Please Fill in Explanations');
                $('#all-questions').click();
            } else {
                Validate.evaluationDepartmentDescriptions(function (errors) {
                    if (errors) {
                        Evaluation.headerFooterMessage('Please Fill in Descriptions About Each Department');
                    } else {
                        Validate.evaluationRestaurantDetails(function (errors) {
                            if (errors) {
                                document.getElementById('evaluation-info').click();
                                $.each(errors, function (key, error) {
                                    $('[data-employee-title=' + key + '_title]').append('<div class="errorMessage margin-top-25 ' + key + '-error">' + error + '</div>')
                                });
                                Evaluation.headerFooterMessage('Please Fill in the Details About the Restaurant');
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
                    }
                });

            }
        });
    },
    headerFooterMessage: function (message) {
        $('.error-footer').prepend('<div class="red-text evaluation-error ">' + message + '</div>');
        $('.error-header').prepend('<div class="red-text evaluation-error ">' + message + '</div>');
        Evaluation.errorTimer = setTimeout(function () {
            $('.evaluation-error').fadeOut();
            $('.errorInput').removeClass('errorInput');
        }, 3000);
    }
};