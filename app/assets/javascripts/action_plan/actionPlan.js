var ActionPlan = {
    load: function () {
        // action plan page
        var applicationEvalId = parseInt(window.location.pathname.split('/').reverse()[0]);

        var thisEvaluation = Evaluations.allScores[applicationEvalId];
        var lastEvaluation = null;

        // Create and prepend department summaries
        $.each(thisEvaluation.departmentsInfo, function (index, department) {
            var html = DepartmentSummary.createHTML(department, thisEvaluation);
            $('#departmentSummary').prepend(html);
        });

        // Create array of evaluations sorted by completed time
        var orderedEvaluations = ActionPlan.orderEvaluations(Evaluations.allScores);
        var lastSixApps = ActionPlan.lastSixEvaluations(orderedEvaluations, applicationEvalId);

        lastEvaluation = lastSixApps[lastSixApps.length - 1] || {scores: {}};

        var missedQuestions = {};
        thisEvaluation.scores.forEach(function (question) {
            // If The Question has score 0 place it in the action plan
            if (question.score === 0) {
                var lastEvalScore = ActionPlan.lastEvalScore(question, lastEvaluation);
                var scoreOnLastSix = ActionPlan.lastSixEvaluationQuestionScore(question, lastSixApps);

                missedQuestions[question.questionId] = {
                    id: question.questionId,
                    department: question.dep,
                    explanation: question.explanation,
                    question: question.question,
                    lastEvaluation: lastEvalScore,
                    lastSix: scoreOnLastSix
                }
            }
        });

        $.each(missedQuestions, function (index, score) {
            $('.tableBody').append('<tr class="tableKeys">' +
                    '<th>' + score.department + '</th>' +
                    '<th>' + score.question + '</th>' +
                    '<th>' + score.explanation + '</th>' +
                    '<th>' + score.lastEvaluation + '</th>' +
                    '<th>' + score.lastSix + '</th>' +
//                            htmlString +
                    '</tr>'
            );
        });
    },

    orderEvaluations: function (evaluations) {
        var orderedEvaluations = [];
        $.each(evaluations, function (index, eval) {
            if (orderedEvaluations.length === 0) {
                orderedEvaluations.push(eval)
            } else {
                $.each(orderedEvaluations, function (indexx, sortedEval) {
                    var orderedElementTime = orderedEvaluations[indexx].completed_time;
                    if (orderedElementTime > eval.completed_time) {
                        return orderedEvaluations.splice(indexx, 0, eval)
                    } else if (orderedEvaluations.length === (indexx + 1)) {
                        return orderedEvaluations.push(eval)
                    }
                });
            }
        });
        return orderedEvaluations;
    },

    lastSixEvaluations: function (orderedEvaluations, applicationEvalId) {
        //Find index id of current evaluation
        var orderedApplicationIndexId;
        $.each(orderedEvaluations, function (index, sortedEval) {
            if (applicationEvalId === sortedEval.id) {
                orderedApplicationIndexId = index;
            }
        });

        var orderedApplications = orderedEvaluations;
        orderedApplications.splice(orderedApplicationIndexId);
        if (orderedApplications.length > 6) {
            orderedApplications = array.slice(orderedApplicationIndexId)
        }
        return orderedApplications;
    },

    lastEvalScore: function (question, lastEvaluation) {
        var responce = "Wasn't Used In Last Evaluation";debugger;
        var lastEvalQuestion = $.grep(lastEvaluation.scores, function (e) {
            return e.questionId == question.questionId;
        })[0];
        if (lastEvalQuestion) {
            if (lastEvalQuestion.score === null) {
                responce = 'N/A'
            } else {
                responce = lastEvalQuestion.score + ' / 1'
            }
        }
        return responce;
    },

    lastSixEvaluationQuestionScore: function(question, lastSixApps) {
        var scoreOnLastSix = 0;
        var totalScoreOnLastSix = lastSixApps.length;
        $.each(lastSixApps, function (index, eval) {
            var evaluationQuestion = $.grep(eval.scores, function (e) {
                return e.questionId == question.questionId;
            })[0];

            if (evaluationQuestion) {
                if (evaluationQuestion.score === null){
                    totalScoreOnLastSix = totalScoreOnLastSix - 1;
                } else {
                    scoreOnLastSix = scoreOnLastSix + evaluationQuestion.score
                }
            } else {
                totalScoreOnLastSix = totalScoreOnLastSix - 1;
            }
        });
        return scoreOnLastSix + ' / ' + totalScoreOnLastSix

    }
};