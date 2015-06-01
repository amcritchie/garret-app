var Evaluations = {
    standards: null,
    evaluations: null,
    allScores: null,
    questions: null,
    departments: null,

    orderedByCompletedTime: [],

    score: null,
    collection: null,

    load: function () {
        var info = {id: $('#metaInfo').data('restaurant-id')};
        $.when(Evaluations.getData(info)).done(function (response) {
            Evaluations.parseDepartments(response.departments);
            Evaluations.parseQuestions(response.questions);
            Evaluations.parseStandards(response.standards);
            Evaluations.parseEvaluations(response.evaluations);
            Evaluations.parseApplications(response.applications);

            var departmentNameIndex = [];
            $('.department-name').each(function (i, e) {
                departmentNameIndex.push($(e).html());
            });

            // if not action plan page add departments to evaluations table
            if (window.location.pathname.indexOf('/action_plan') === -1) {
                $.each(Evaluations.allScores, function (index, score) {

                    var htmlString = '';
                    departmentNameIndex.forEach(function (j, k) {
                        if (score.departmentsInfo[j]) {
                            htmlString += '<th>' + score.departmentsInfo[j].totalWeightedScore + '</th>';
                        }
                    });
                    $('.tableBody').append('<tr class="tableKeys">' +
                            '<th>' + Evaluations.formatDate(score.completed_time) + '</th>' +
                            '<th><a href="/restaurant/'+info.id + '/action_plan/'+ score.id + '" target="_self">action plan</a></th>' +
                            '<th>' + score.id + '</th>' +
                            '<th>' + score.totals.totalWeightedScore + '</th>' +
                            htmlString +
                            '</tr>'
                    );
                });
            } else {
                ActionPlan.load();

//                // action plan page
//                var applicationEvalId = parseInt(window.location.pathname.split( '/' ).reverse()[0]);
//
//                var thisEvaluation = Evaluations.allScores[applicationEvalId];
//                var lastEvaluation = null;
//
//
//                // Create array of evaluationes sorted by completed time
//                $.each(Evaluations.allScores, function(index, eval) {
//                    if (Evaluations.orderedByCompletedTime.length === 0){
//                        Evaluations.orderedByCompletedTime.push(eval)
//                    } else {
//                        $.each(Evaluations.orderedByCompletedTime, function(indexx, sortedEval) {
//                            var orderedElementTime = Evaluations.orderedByCompletedTime[indexx].completed_time;
//                            if (orderedElementTime > eval.completed_time) {
//                                return Evaluations.orderedByCompletedTime.splice(indexx, 0, eval)
//                            } else if (Evaluations.orderedByCompletedTime.length === (indexx + 1)){
//                                return Evaluations.orderedByCompletedTime.push(eval)
//                            }
//                        });
//                    }
//                });
//
//                var orderedApplicationIndexId = 0;
//                $.each(Evaluations.orderedByCompletedTime, function(index, sortedEval) {
//                    if (applicationEvalId === sortedEval.id) {
//                        orderedApplicationIndexId = index;
//                    }
//                });
//
//                var orderedApplications = Evaluations.orderedByCompletedTime;
//                orderedApplications.splice(orderedApplicationIndexId);
//                if (orderedApplications.length > 6) {
//                    orderedApplications = array.slice(orderedApplicationIndexId)
//                }
//                var lastSixApps = orderedApplications;
//
//                var arrayOfApplications = $.map(Evaluations.allScores, function(value, index) {
//                    return [value];
//                });
//
//                function compare(a,b) {
//                    if (a.completed_time < b.completed_time)
//                        return -1;
//                    if (a.completed_time > b.completed_time)
//                        return 1;
//                    return 0;
//                }
//
//                var sortedArrayOfApplications = arrayOfApplications.sort(compare);
//                var thisArrayIndex = null;
//                sortedArrayOfApplications.forEach( function(e,i) {
//                    if (e.id === applicationEvalId) {
//                        thisArrayIndex = i
//                    }
//                });
//
//
//                sortedArrayOfApplications.length = thisArrayIndex + 1;
//
//                var lastSixEvaluations = [];
//
//
//                $.each(Evaluations.allScores, function (index, eval) {
//                    if (eval.completed_time < thisEvaluation.completed_time) {
//                        if ((lastEvaluation === null) || (eval.completed_time > lastEvaluation.completed_time)) {
//                            lastEvaluation = eval;
//                        }
//
////                        if ((lastSixEvaluations.length < 6) || )
//                    }
//                });
//                var missedQuestions = {};
//
//                thisEvaluation.scores.forEach(function(question) {
//                    if (question.score === 0) {
////                        debugger;
//                        var lastEvalScore = null;
//                        if (lastEvaluation) {
//                            lastEvalScore = $.grep(lastEvaluation.scores, function(e){ return e.questionId == question.questionId; })[0].score;
//                            if (lastEvalScore < 2){
//                                lastEvalScore = lastEvalScore + ' / 1'
//                            } else {
//                                lastEvalScore = null;
//                            }
//                        }
//
//                        var scoreOnLastSix = 0;
//                        var totalScoreOnLastSix = lastSixApps.length;
//                        $.each(lastSixApps, function (index, eval) {
////                            console.log(eval.scores);
//                            var evalQuestionScore = $.grep(eval.scores, function(e){
////                                console.log(e.score);
////                                debugger;
//                                console.log(e.questionId);
//                                console.log(question.questionId);
////                                debugger;
//                                return e.questionId == question.questionId;
//                            });
//
//                            if (evalQuestionScore[0]){
//                                evalQuestionScore = evalQuestionScore[0].score;
//
//                            }
////                            evalQuestionScore = evalQuestionScore[0].score;
////                            debugger;
//                            if (evalQuestionScore < 2){
//                                scoreOnLastSix += evalQuestionScore;
//                            } else {
//                                totalScoreOnLastSix -= 1;
//                            }
//                        });
//
//                        missedQuestions[question.questionId] = {
//                            id: question.questionId,
//                            department: question.dep,
//                            explanation: question.explanation,
//                            question: question.question,
//                            lastEvaluation: lastEvalScore,
//                            lastSix: scoreOnLastSix + ' / ' + totalScoreOnLastSix
//                        }
//                    }
//                });
//
//                $.each(missedQuestions, function (index, score) {
//                    $('.tableBody').append('<tr class="tableKeys">' +
//                            '<th>' + score.department + '</th>' +
//                            '<th>' + score.question + '</th>' +
//                            '<th>' + score.explanation + '</th>' +
//                            '<th>' + score.lastEvaluation + '</th>' +
//                            '<th>' + score.lastSix + '</th>' +
////                            htmlString +
//                            '</tr>'
//                    );
//                });

            }
        });
    },

    formatDate: function(dateObj) {
        var date = '';
        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        date += monthNames[dateObj.getMonth()] + ' ';
        date += dateObj.getDate() + ', ' + dateObj.getFullYear();
        return date;
    },

    getData: function (info) {
        var deferred = $.Deferred();
        $.ajax({
            type: "POST",
            url: "get_info.json",
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

    //All questions in obj with attributes: id, key, & department.
    parseQuestions: function (questions) {
        var questionsObj = {};
        questions.forEach(function (question) {
            questionsObj[question.id] = {
                id: question.id,
                key: question.key,
                department: question.department,
                question: question.body
            };
        });
        Evaluations.questions = questionsObj;
    },

    //All standards in obj with attributes: id, name & scores.
    parseStandards: function (standardsAll) {
        var arrayOfStandards = {};
        standardsAll.forEach(function (standards) {
            var array = {};
            standards.details.split('|').forEach(function (question) {
                array[question.split(':')[0]] = {
                    id: question.split(':')[0],
                    score: question.split(':')[1]
                };
            });
            arrayOfStandards[standards.id] = {
                id: standards.id,
                name: standards.name,
                scores: array
            };
        });
        Evaluations.standards = arrayOfStandards;
    },

    //All Evaluations made by restaurants in obj with attributes: id & standardsId -> standards used in evaluation.
    parseEvaluations: function (evaluationsAll) {
        var arrayOfScores = {};
        evaluationsAll.forEach(function (application) {
            arrayOfScores[application.id] = {
                id: parseInt(application.id),
                standardsId: parseInt(application.standard_id)
            };
        });
        Evaluations.evaluations = arrayOfScores;
    },

    parseDepartments: function (departments) {
        var arrayOfDepartments = {};
        departments.forEach(function (department) {
            arrayOfDepartments[department.id] = department.name;
            arrayOfDepartments[department.name] = department.id;
        });
        Evaluations.departments = arrayOfDepartments;
    },

    parseApplications: function (applicationsAll) {
        var arrayOfScores = {};
        applicationsAll.forEach(function (application) {
            var array = [];
            var standardsId = Evaluations.evaluations[application.evaluation_id].standardsId;

            var departments = {};
            var keys = {};
            var totals = {
                scores: [],
                weightedScores: [],
                totalPossibleScore: [],
                totalPossibleWeightedScore: []
            };

            var departmentDescriptions = {};
            var departmentDescriptionsString = application.department_descriptions.split('|Θ');
            departmentDescriptionsString.forEach(function(string) {
                var id = string.split('Æχ')[0];
                var value = string.split('Æχ')[1];
                departmentDescriptions[id] = value
            });
//            debugger;

            application.score.split('|').forEach(function (question) {

                var questionId = parseInt(question.split(':')[0]);
                var score = parseInt(question.split(':')[1]);
                var explanation = (question.split(':')[2]) || '';
                score = (score === 2) ? null : score;
                var standards = Evaluations.standards[standardsId].scores[question.split(':')[0]];
                console.log('standards score - ' + standards);
                var standardsScore = ((standards) ? parseInt(standards.score) : 0);

                var weightedScore = score * standardsScore;
                var potentialWeightedScore = standardsScore;

                if (Evaluations.questions[questionId]) {
                    var questionBody = Evaluations.questions[questionId].question;
                    var dep = Evaluations.questions[questionId].department;
                    var key = Evaluations.questions[questionId].key;
                } else {
                    var questionBody = '';
                    var dep = '';
                    var key = '';
                }
                if (!(dep in departments) && (dep !== '') && (score !== null)) {
                    departments[dep] = {
                        departmentDescription:departmentDescriptions[ Evaluations.departments[dep]],
                        departmentName: dep,
                        scores: [score],
                        weightedScores: [weightedScore],
                        potentialWeightedScore: [potentialWeightedScore],
                        totalPossibleScore: [1],
                        totalPossibleWeightedScore: [standardsScore]
                    }
                } else if ((dep !== '') && (score !== null)) {
                    departments[dep].scores.push(score);
                    departments[dep].weightedScores.push(weightedScore);
                    departments[dep].potentialWeightedScore.push(potentialWeightedScore);
                    departments[dep].totalPossibleScore.push(1);
                    departments[dep].totalPossibleWeightedScore.push(standardsScore);
                }
                if (!(key in keys) && (key !== '') && (score !== null)) {
                    keys[key] = {
                        keyName: key,
                        scores: [score],
                        weightedScores: [weightedScore],
                        totalPossibleScore: [1],
                        totalPossibleWeightedScore: [standardsScore]
                    };
                } else if ((key !== '') && (score !== null)) {
                    keys[key].scores.push(score);
                    keys[key].weightedScores.push(weightedScore);
                    keys[key].totalPossibleScore.push(1);
                    keys[key].totalPossibleWeightedScore.push(standardsScore);
                }


                if (score !== null) {
                    totals.scores.push(score);
                    totals.weightedScores.push(weightedScore);
                    totals.totalPossibleScore.push(1);
                    totals.totalPossibleWeightedScore.push(standardsScore);
                }

                array.push({
                    questionId: parseInt(question.split(':')[0]),
                    score: score,
                    weightedScore: score * standardsScore,
                    potentialWeightedScore: (score !== null) ? standardsScore : 0,
                    explanation: explanation,
                    dep: dep,
                    key: key,
                    question: questionBody
                });
            });

            $.each(departments, function (index, department) {
//                debugger;
                var userScore = 0;
                var weightedUserScore = 0;
                var totalWeightedUserScore = 0;
                $.each(department.scores, function () {
                    userScore += this
                });
                $.each(department.weightedScores, function () {
                    weightedUserScore += this
                });
                $.each(department.totalPossibleWeightedScore, function () {
                    totalWeightedUserScore += this
                });

                departments[department.departmentName].totalScore = userScore;
                departments[department.departmentName].totalWeightedScore = weightedUserScore + ' / ' + totalWeightedUserScore;
            });


            var userScore = 0;
            var weightedUserScore = 0;
            var totalWeightedUserScore = 0;
            $.each(totals.scores, function () {
                userScore += this
            });
            $.each(totals.weightedScores, function () {
                weightedUserScore += this
            });
            $.each(totals.totalPossibleWeightedScore, function () {
                totalWeightedUserScore += this
            });

            totals.totalScore = userScore;
            totals.totalWeightedScore = weightedUserScore + ' / ' + totalWeightedUserScore;


            arrayOfScores[application.id] = {
                id: application.id,
                completed_time: new Date(application.completed_at),
                standardsId: standardsId,
                scores: array,
                departmentsInfo: departments,
                keysInfo: keys,
                totals: totals

            };
        });
        Evaluations.allScores = arrayOfScores;
    }
};