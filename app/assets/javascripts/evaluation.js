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
            var checked = ($(question).prop('checked')) ? 1 : 0;
            array.push([id+':'+checked]);
        });
        return array.join('|')
    },

    open: function() {
        var info = {id: Evaluation.applicationId};
        $.when(Evaluation.getScore(info)).done(function (response) {
            Evaluation.loadScores(response.score);
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
            if (question.split(':')[1] === '1'){
                var id = question.split(':')[0];
                $('input[data-question-id=' + id + ']').prop('checked', true);
            }
        });
    }
};