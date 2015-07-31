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
                        } else {
                            htmlString += '<th></th>'
                        }
                    });
                    $('.tableBody').prepend('<tr class="tableKeys">' +
                            '<th>' + Evaluations.formatDate(score.completed_time) + '</th>' +
                            '<th><a href="/restaurant/'+info.id + '/action_plan/'+ score.id + '" target="_self">action plan</a></th>' +
                            '<th>' + score.id + '</th>' +
                            '<th>' + score.totals.totalWeightedScorePercent + '</th>' +
                            htmlString +
                            '</tr>'
                    );
                });
            } else {
                ActionPlan.load();
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
            standards.details.split('|Θ').forEach(function (question) {
                array[question.split('Æχ')[0]] = {
                    id: question.split('Æχ')[0],
                    score: question.split('Æχ')[1]
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

            application.score.split('|Θ').forEach(function (question) {

                var questionId = parseInt(question.split('Æχ')[0]);
                var score = parseInt(question.split('Æχ')[1]);
                var explanation = (question.split('Æχ')[2]) || '';
                score = (score === 2) ? null : score;
                var standards = Evaluations.standards[standardsId].scores[question.split('Æχ')[0]];
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
            totals.totalWeightedScorePercent = ((Math.floor((weightedUserScore/totalWeightedUserScore) * 100)) || 0) + '%';

            arrayOfScores[application.id] = {
                id: application.id,
                courses: {
                    crs1: application.crs1,
                    crs2: application.crs2,
                    crs3: application.crs3
                },
                beverages: {
                    bev1: application.bev1,
                    bev2: application.bev2
                },
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