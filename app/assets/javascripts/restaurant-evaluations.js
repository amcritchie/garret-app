var Evaluations = {
    standards: null,
    evaluations: null,
    allScores: null,
    questions: null,

    score: null,
    collection: null,

    load: function() {
//        Evaluation.applicationId = parseInt($('#applicationId').html());
        var info = {id: $('#metaInfo').data('restaurant-id')};
//        console.log(info);
        $.when(Evaluations.getData(info)).done(function (response) {
//            debugger;
//            Evaluations.standards = response.standards;
//            Evaluations.questions = response.questions;
            Evaluations.parseQuestions(response.questions);
            Evaluations.parseStandards(response.standards);
            Evaluations.parseEvaluations(response.evaluations);
            Evaluations.parseApplications(response.applications);
            debugger;
            Evaluations.loadScores(response.score);
            Evaluations.scores();
        });
    },

    getData: function(info) {
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

    parseQuestions: function(questions) {

        var arrayOfStandards = {};
        questions.forEach(function(standards) {
            arrayOfStandards[standards.id] = {
                id: standards.id,
                key: standards.key,
                department: standards.department
            };
        });
        Evaluations.questions = arrayOfStandards;

    },

    parseStandards: function(standardsAll) {
        var arrayOfStandards = {};
        standardsAll.forEach(function(standards) {
            var array = [];
            standards.details.split('|').forEach(function(question){
                array.push({
                    id: question.split(':')[0],
                    score: question.split(':')[1]
                });
            });
            arrayOfStandards[standards.id] = {
                id: standards.id,
                name: standards.name,
                scores: array
            };
        });
        Evaluations.standards = arrayOfStandards;
    },

    parseEvaluations: function(evaluationsAll) {
        var arrayOfScores = {};
        evaluationsAll.forEach(function(application) {
            arrayOfScores[application.id] = {
                id: parseInt(application.id),
                standardsId: parseInt(application.standard_id)
            };
        });
        Evaluations.evaluations = arrayOfScores;
    },

    parseApplications: function(applicationsAll) {
        var arrayOfScores = {};
        applicationsAll.forEach(function(application) {
            var array = [];
            var standardsId = Evaluations.evaluations[application.evaluation_id].standardsId;
            application.score.split('|').forEach(function(question){
                array.push({
                    questionId: parseInt(question.split(':')[0]),
                    score: parseInt(question.split(':')[1])
                });
            });
            arrayOfScores[application.id] = {
                id: application.id,
                standardsId: standardsId,
                scores: array,
                scoresInfo: Evaluations.scoresInfo(standardsId, array)
            };
        });
        Evaluations.allScores = arrayOfScores;
    },

    scoresInfo: function(standardsId, array) {

        var standards = Evaluations.standards[standardsId];
        debugger;

        var totalUserPoints = 0;
        var totalPossPoints = 0;
        var scores = {
            departments: {},
            keys: {}
        };

        array.forEach(function(question,i) {
            var questionObj = Evaluations.questions[question.questionId];
            debugger;
//            if(question.key in scores.keys) {
//                scores.keys[question.key].scores.push({
//                    userScore: question.dryScore,
//                    standardScore: question.standard
//                })
//            } else {
//                scores.keys[question.key] = {
//                    keyName: question.key,
//                    scores: [{
//                        userScore: question.dryScore,
//                        standardScore: question.standard
//                    }]
//                }
//            }

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

    },

    loadScores: function(score) {
        var collection = [];
        score.split('|').forEach(function(question){
            var id = parseInt(question.split(':')[0]);
            var result;
            var why = '';
            var resultt = $.grep(Application.standards, function(e){ return e.id == id; });
            var questionObj = $.grep(Application.questions, function(e){ return e.id == id; })[0];
//            debugger;
            console.log(resultt);
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

//        debugger;
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
    }
};