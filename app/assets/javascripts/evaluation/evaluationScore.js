var EvaluationScore = {
    load: function (score) {
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

                $('.answerExplanation[data-question-id=' + id + ']').on('keyup', function () {
                    $('.answerExplanation[data-question-id=' + id + ']').val($(this).val());
                });
            }
        });

//        $('.questionLabel').css("background-color", "white");
//        $('.active.questionPassed').css("background-color", "lightgreen");
//        $('.active.questionFailed').css("background-color", "tomato");
//        $('.active.questionNA').css("background-color", "orange");
//        Evaluation.addSubmit();
    },
    save: function () {
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
    }
};