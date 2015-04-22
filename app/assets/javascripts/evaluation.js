var Evaluation = {

    applicationId: null,
    evaluationId: null,
    score: '13:0|14:0|15:1|16:1',

    save: function () {
        var info = {
            id: Evaluation.applicationId,
            score: Evaluation.getScoreString()
        };
        $.ajax({
            type: "POST",
            url: "application/update_score",
            data: info
        });    },

    getScoreString: function(){
        var array = [];
        $('.questionCheckboxAll').each(function(index,question){

            var id = $(question).data('question-id');
            if ($($(this).children()[1]).hasClass('active')){
                array.push([id+':'+0+':'+$(this).parent().find('.answerExplanation').val()]);
            } else if ($($(this).children()[0]).hasClass('active')) {
                array.push([id+':'+2+':'+$(this).parent().find('.answerExplanation').val()]);
            } else if ($($(this).children()[3]).hasClass('active')) {
                array.push([id+':'+1]);
            }
        });
        return array.join('|')
    },

    refresh: function(){

        $('label').removeClass('active');
        $('.questionNil').show();

    },

    open: function() {
        var info = {id: Evaluation.applicationId};
        $.when(Evaluation.getScore(info)).done(function (response) {
            Evaluation.refresh();
            Evaluation.loadScores(response.score);
            Evaluation.registerClickAnswer();
        });
    },

    registerClickAnswer: function(){
        $('.questionLabel').on('click', function () {
            $('.questionCheckbox').off('click');
            var id = $(this).data('question-id');
            if ($(this).children().val() === '1'){
                $('.questionPass[data-question-id=' + id + ']').click();
                $('.answerExplanation[data-question-id=' + id + ']').hide();
                $('.questionNil[data-question-id=' + id + ']').hide();
            } else if ($(this).children().val() === '0') {
                $('.questionFail[data-question-id=' + id + ']').click();
                $('.answerExplanation[data-question-id=' + id + ']').show();
                $('.questionNil[data-question-id=' + id + ']').hide();
            } else if ($(this).children().val() === '2'){
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

            setTimeout(function(){
                Evaluation.save();
            }, 20);
        });
    },

    getScore: function(info){
        var deferred = $.Deferred();
        $.ajax({
            type: "POST",
            url: "application/get_score.json",
            data: info,
            success: function (response) {deferred.resolve(response)},
            error: function (response) {deferred.reject(response)}
        });
        return deferred;
    },

    loadScores: function (score) {
        score.split('|').forEach(function(question){
            var id = question.split(':')[0];
            if (question.split(':')[1] === '1'){
                $('.questionPass[data-question-id=' + id + ']').click();
                $('.questionNil[data-question-id=' + id + ']').hide();
            } else if(question.split(':')[1] === '0'){
                $('.questionFail[data-question-id=' + id + ']').click();
                $('.answerExplanation[data-question-id=' + id + ']').show().val(question.split(':')[2]);
                $('.questionNil[data-question-id=' + id + ']').hide();
            } else if(question.split(':')[1] === '2'){
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

    addSubmit: function() {
        if ($('.submitEvaluation').length === 0){
            var answeredQuestion = 0;
            var allQuestions = $('.questionCheckboxAll');
            allQuestions.each(function(question){
                if ($($(this).children()[0]).hasClass('active')){
                    answeredQuestion++;
                } else if ($($(this).children()[1]).hasClass('active')) {
                    answeredQuestion++;
                } else if ($($(this).children()[3]).hasClass('active')) {
                    answeredQuestion++;
                }
            });
            if (answeredQuestion === allQuestions.length ){
                $('.user-evaluation-center').append('<button class="btn btn-success submitEvaluation">Submit</button>');
                $('.submitEvaluation').on('click',function(){
                    var allExplanationsFilled = true;
                    $('.answerExplanation').each(function(a,e){
                        if (!$(e).val()) {
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
                        $('.user-evaluation-center').prepend('<div class="red-text evaluation-error">Please Fill in Explanations<hr><br></div>');
                        setTimeout(function() {
                            $('.evaluation-error').fadeOut()
                        }, 3000);
                    }
                });
            }
        }
    }
};