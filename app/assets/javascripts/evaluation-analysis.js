var Application = {
    standards: null,
    score: null,
    questions: null,
    collection: null,
    load: function() {
        Evaluation.applicationId = parseInt($('#applicationId').html());
        var info = {id: parseInt($('#applicationId').html())};
        console.log(info);
        $.when(Application.getScore(info)).done(function (response) {
            Application.questions = response.questions;
            Application.loadStandards(response.standards);
            Application.loadScores(response.score);
            Application.scores();
        });
    },

    scores: function() {
        var totalUserPoints = 0;
        var totalPossPoints = 0;
        var scores = {
            departments: {},
            keys: {}
        };
        Application.collection.forEach(function(question,i) {
            if(question.key in scores.keys) {
                scores.keys[question.key].scores.push({
                    userScore: question.dryScore,
                    standardScore: question.standard
                })
            } else {
                scores.keys[question.key] = {
                    keyName: question.key,
                    scores: [{
                        userScore: question.dryScore,
                        standardScore: question.standard
                    }]
                }
            }

            if(question.department in scores.departments) {
                scores.departments[question.department].scores.push({
                        userScore: question.dryScore,
                        standardScore: question.standard
                    }
                )
            } else {
                scores.departments[question.department] = {
                    keyName: question.department,
                    scores: [{
                        userScore: question.dryScore,
                        standardScore: question.standard
                    }]
                }
            }

            if (question.dryScore !== 2) {
                totalPossPoints = totalPossPoints + question.standard;
                totalUserPoints = totalUserPoints + (question.dryScore * question.standard);
            }
        });

        var depColumns = [];
        var depColumnsString = '';
        $.each(scores.departments, function(index, department) {
            var userScore = 0;
            var possScore = 0;
            $('.tableKeys').append('<th>'+department.keyName+'</th>');
            department.scores.forEach(function(question) {
                if (question.userScore !== 2) {
                    possScore = possScore + question.standardScore;
                    userScore = userScore + (question.userScore * question.standardScore);
                }
            });
            department['scores'] = {
                possibleScore: possScore,
                realScore: userScore
            };
            depColumns.push((userScore + ' / ' + possScore));
            depColumnsString += '<th>'+(userScore + ' / ' + possScore)+'</th>'
        });

        $.each(scores.keys, function(index, key) {
            var userScore = 0;
            var possScore = 0;
            key.scores.forEach(function(question) {
                if (question.userScore !== 2) {
                    possScore = possScore + question.standardScore;
                    userScore = userScore + (question.userScore * question.standardScore);
                }
            });
            key['scores'] = {
                possibleScore: possScore,
                realScore: userScore
            }
        });

        $('.tableBody').append('<tr>' +
            '<th>dfd</th>' +
            '<th>'+totalUserPoints + ' / ' + totalPossPoints+'</th>' +
            depColumnsString +
//            '<th>dfd</th>' +
//            '<th>dfd</th>' +
//            '<th>dfd</th>' +
//            '<th>dfd</th>' +
            '</tr>');


        console.log(totalUserPoints + ' / ' + totalPossPoints);
        console.log(scores);
    },

    getScore: function(info) {
        var deferred = $.Deferred();
        $.ajax({
            type: "POST",
            url: "get_info.json",
            data: info,
            success: function (response) {deferred.resolve(response)},
            error: function (response) {deferred.reject(response)}
        });
        return deferred;
    },

    loadStandards: function(standards) {
        var array = [];
        standards.split('|').forEach(function(question){
            array.push({
                id: question.split(':')[0],
                score: question.split(':')[1]
            });
        });
        Application.standards = array;
    },

    loadScores: function(score) {
        var collection = [];
        score.split('|').forEach(function(question){
            var id = parseInt(question.split(':')[0]);
            var result;
            var why = '';
            var resultt = $.grep(Application.standards, function(e){ return e.id == id; });
            var questionObj = $.grep(Application.questions, function(e){ return e.id == id; })[0];
            if (question.split(':')[1] === '1'){
                result = ['Pass','Passed'];
            } else if(question.split(':')[1] === '0'){
                result = ['Fail','Failed'];
                why = question.split(':')[2]
            } else if(question.split(':')[1] === '2'){
                result = ['n/a','NA'];
                why = question.split(':')[2]
            }
            collection.push({
                key: questionObj.key,
                department: questionObj.department,
                standard: (resultt.length === 0) ? 1 : parseInt(resultt[0].score),
                dryScore: parseInt(question.split(':')[1]),
                why: why
            });
            $('.questionCheckboxAll[data-question-id=' + id + ']').prepend(
                    '<label class="btn btn-default questionLabel questionCheckbox question'+result[1]+'" data-question-id='+id+'>' +
                    '<input class="question'+result[1]+' questionAnswer" data-question-id='+id+' type="radio" name="inputWalls" id="inputWalls" value="2" checked>' +
                    result[0] + '</label>');
            $('.explanation[data-question-id=' + id + ']').prepend(
                    '<p>'+why+'</p>'
            );
        });

        Application.collection = collection;

        $('.questionPassed').css("background-color", "lightgreen");
        $('.questionFailed').css("background-color", "tomato").css("color", "white");
        $('.questionNA').css("background-color", "orange");
    }
};