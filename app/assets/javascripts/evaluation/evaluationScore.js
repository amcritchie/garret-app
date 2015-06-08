var EvaluationScore = {
    load: function (score) {
        score.split('|Θ').forEach(function (question) {
            if (question) {
                var id = question.split('Æχ')[0];
                if (question.split('Æχ')[1] === '1') {
                    $('.questionPass[data-question-id=' + id + ']').click();
                    $('.questionNil[data-question-id=' + id + ']').hide();
                } else if (question.split('Æχ')[1] === '0') {
                    $('.questionFail[data-question-id=' + id + ']').click();
                    $('.answerExplanation[data-question-id=' + id + ']').show().val(question.split('Æχ')[2]);
                    $('.questionNil[data-question-id=' + id + ']').hide();
                } else if (question.split('Æχ')[1] === '2') {
                    $('.questionNA[data-question-id=' + id + ']').click();
                    $('.answerExplanation[data-question-id=' + id + ']').show().val(question.split('Æχ')[2]);
                    $('.questionNil[data-question-id=' + id + ']').hide();
                }

                $('.answerExplanation[data-question-id=' + id + ']').on('keyup', function () {
                    $('.answerExplanation[data-question-id=' + id + ']').val($(this).val());
                });
            }
        });
    },
    save: function () {
        var array = [];
        $('.questionCheckboxAll[data-relevant=true]').each(function (index, question) {
            var id = $(question).data('question-id');
            if ($($(this).children()[1]).hasClass('active')) {
                array.push([id + 'Æχ' + 0 + 'Æχ' + $(this).parent().find('.answerExplanation').val()]);
            } else if ($($(this).children()[0]).hasClass('active')) {
                array.push([id + 'Æχ' + 2 + 'Æχ' + $(this).parent().find('.answerExplanation').val()]);
            } else if ($($(this).children()[3]).hasClass('active')) {
                array.push([id + 'Æχ' + 1]);
            }
        });
        return array.join('|Θ')
    }
};